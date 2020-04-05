import { useMemo, useEffect } from 'react'
import { eventCenter } from '@tarojs/taro'

import { uuid } from '../utils'
import { OuterScrollViewProps } from './useOuterScrollView'

const trigger = (eventName: string) => (...args: any[]) => eventCenter.trigger(eventName, ...args)
const eventKeys = [
    'onScrollToUpper',
    'onScrollToLower',
    'onRefresherPulling',
    'onRefresherRefresh',
    'onRefresherRestore',
    'onRefresherAbort',
]

/**
 * Wrap ScrollView props to static object.
 *
 * WHY? `react-window outerElementType is a "tag". If you update this "tag". ScrollView will recreate and lose scroll position.
 */
export function useOuterScrollViewProps(props: OuterScrollViewProps): OuterScrollViewProps {
    /** memo id for each component */
    const id = useMemo(uuid, [])

    const result = { ...props }

    for (const eventKey of eventKeys) {
        const eventName = `atReactWindow:${id}:${eventKey}`
        const eventHandler = props[eventKey] || (() => {})

        useEffect(() => {
            eventCenter.on(eventName, eventHandler)
            return () => eventCenter.off(eventName)
        }, [eventHandler])

        result[eventKey] = trigger(eventName)
    }

    return result
}
