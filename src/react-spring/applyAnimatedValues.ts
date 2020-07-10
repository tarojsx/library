import { Globals } from '@react-spring/web'

import { toDashed } from '../utils'

type Instance = HTMLDivElement & { style: any; [key: string]: any }

// const applyAnimatedValuesWeb = Globals.applyAnimatedValues
/**
 * TaroElement 设置 style 属性比设置字符串 cssText 理论上性能更高, 这种方式可以跳过 react setState, 但是逃不过小程序 setData.
 *
 * 在碰到兼容问题前, 暂时交由 spring web 处理 style.
 *
 * 1. TaroElement.style[name] = value
 * 2. TaroElement.setAttribute('style', styleString)
 */
export const applyAnimatedValues = (
    instance: Instance,
    props: {
        style: React.CSSProperties
        [attr: string]: any
    }
) => {
    if (!instance.nodeType || !instance.setAttribute) {
        return false
    }

    const { style = {}, ...attributes } = props!

    const styleString = Object.keys(style).reduce((str, key) => {
        const val = style[key]
        return val ? `${str}${toDashed(key)}: ${val};` : str
    }, '')

    if (styleString) {
        instance.setAttribute('style', styleString)
    }

    // applyAnimatedValuesWeb(instance, attributes)
}
