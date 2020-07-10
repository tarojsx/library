import React, { useRef, useMemo, useCallback, useEffect } from 'react'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import retry from 'async-retry'
import equal from 'fast-deep-equal'
import { Chart, ChartParams, Global, Data, DataRecord } from '@antv/f2'
import { Canvas, ITouchEvent } from '@tarojs/components'

import { uuid } from '../utils'

interface F2Props<TRecord extends DataRecord = DataRecord> {
    className?: string
    style?: React.CSSProperties
    config?: ChartParams
    data?: Data<TRecord>
    fontFamily?: string
    children(renderProps: { chart: Chart<TRecord>; data: Data<TRecord> }): any
}

export declare namespace F2 {
    type Props<TRecord> = F2Props<TRecord>
}

export const F2 = function <TRecord extends DataRecord = DataRecord>(props: F2Props<TRecord>) {
    const { className, style = {}, config, data, fontFamily, children } = props

    const id = useMemo(() => `f2-canvas-${uuid()}`, [])
    const pixelRatio = useMemo(() => Taro.getSystemInfoSync().pixelRatio, [])

    const chartRef = useRef<Chart<TRecord>>()
    const canvasElRef = useRef<any>()

    const handleTouch = (eventName: string) =>
        useCallback((e: ITouchEvent) => canvasElRef.current?.dispatchEvent(eventName, wrapEvent(e)), [eventName])

    // setup f2 并传递给 children
    useEffect(() => {
        !(async () => {
            const { node, width, height } = await getCanvasNodeFields(`#${id}`)

            if (!chartRef.current) {
                const context = node.getContext('2d')

                // 高清设置
                node.width = width * pixelRatio
                node.height = height * pixelRatio

                /**
                 * 如果是多字体的话, ios会不显示, android下会闪退
                 * @see https://github.com/antvis/wx-f2/issues/260
                 */
                if (fontFamily || Global.fontFamily.includes(',')) {
                    Global.fontFamily = fontFamily || 'system-ui' || 'sans-serif'
                }
                chartRef.current = new Chart(Object.assign(config || {}, { context, width, height, pixelRatio }))
                canvasElRef.current = chartRef.current.get('el')
            }

            children({ chart: chartRef.current, data })
        })()

        return () => chartRef.current?.destroy()
    }, [])

    const prevDataRef = useRef(data)
    // // 数据变化时清空画布, 重新设置, 重新渲染. 首次 mount 时因为 chartRef 还未准备好, 此处的逻辑不会运行.
    useEffect(() => {
        if (!chartRef.current || equal(prevDataRef.current, data)) return

        children({ chart: chartRef.current.clear(), data })
    }, [data])

    return (
        <Canvas
            id={id}
            className={classNames('f2-canvas', className)}
            style={{ width: '100%', height: '100%', ...style }}
            type="2d"
            onTouchStart={handleTouch('touchstart')}
            onTouchMove={handleTouch('touchmove')}
            onTouchEnd={handleTouch('touchend')}
        />
    )
}

function wrapEvent(e: any) {
    if (!e) return
    if (!e.preventDefault) {
        e.preventDefault = () => {}
    }
    return e
}

/**
 * 获取 canvas node 和 size.
 *
 * @param selector 选择器
 */
async function getCanvasNodeFields(selector: string) {
    return await retry(
        async () => {
            if (process.env.TARO_ENV === 'h5') {
                const node = document.querySelector(selector).getElementsByTagName('canvas')[0]
                return { node, width: node.clientWidth, height: node.clientHeight }
            }

            return await new Promise<{ node: Taro.General.IAnyObject; width: number; height: number }>(
                (resolve, reject) => {
                    Taro.createSelectorQuery()
                        .select(selector)
                        .fields({
                            node: true,
                            size: true,
                        })
                        .exec(([res]) => {
                            // console.log(`${selector} fields`, res)
                            if (res) {
                                resolve(res)
                            } else {
                                reject(new Error(`获取 canvas fields 失败 ${selector}`))
                            }
                        })
                }
            )
        },
        // 重试 10 次, 间隔 100ms.
        { retries: 10, minTimeout: 100, factor: 1 }
    )
}
