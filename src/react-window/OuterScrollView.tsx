import React, { useCallback } from 'react'
import { ScrollView } from '@tarojs/components'
import { ScrollViewProps } from '@tarojs/components/types/ScrollView'

export interface OuterScrollViewProps extends Omit<ScrollViewProps, 'onScroll'> {
    width?: number | string
    height?: number | string
    onScroll(event: React.UIEvent): void
}

/**
 * Container scroll view
 *
 * Use provided width/height synthesize standard onScroll event
 */
export const OuterScrollView = React.forwardRef<typeof ScrollView, OuterScrollViewProps>((
    props,
    /* Taro legacy ref type */ ref: any
) => {
    const { width, height, onScroll, ...rest } = props

    const handleScroll = useCallback(
        event => {
            onScroll({
                ...event,
                currentTarget: { ...event.detail, clientWidth: width, clientHeight: height },
            })
        },
        [width, height]
    )

    return <ScrollView ref={ref} scrollX scrollY onScroll={handleScroll} {...rest} />
})