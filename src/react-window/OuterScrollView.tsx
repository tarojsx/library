import React, { useCallback } from 'react'
import { ScrollView } from '@tarojs/components'
import { ScrollViewProps } from '@tarojs/components/types/ScrollView'

export interface OuterScrollViewProps extends ScrollViewProps {}

/**
 * Container scroll view
 *
 * Use provided width/height synthesize standard onScroll event
 */
export const OuterScrollView = React.forwardRef<any, OuterScrollViewProps>((props, ref) => {
    const { style, onScroll, ...rest } = props
    const { width, height, ...otherStyle } = style as React.CSSProperties

    const handleScroll = useCallback(
        (event) => {
            onScroll({
                ...event,
                currentTarget: { ...event.detail, clientWidth: width, clientHeight: height },
            })
        },
        [width, height, onScroll]
    )

    return (
        <ScrollView
            ref={ref as any}
            style={{ width, height, overflowAnchor: 'auto', ...otherStyle }}
            scrollX
            scrollY
            scrollAnchoring
            onScroll={handleScroll}
            {...rest}
        />
    )
})
