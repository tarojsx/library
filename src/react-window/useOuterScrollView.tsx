import React, { forwardRef, useMemo, useCallback } from 'react'
import { ScrollView } from '@tarojs/components'
import { ScrollViewProps } from '@tarojs/components/types/ScrollView'

export interface OuterScrollViewProps extends Omit<ScrollViewProps, 'onScroll'> {
    onScroll(event: React.UIEvent): void
}

/**
 * Container scroll view hook
 *
 * Use provided width/height synthesize standard onScroll event
 */
export const useOuterScrollView = ({ width, height }: { width: number | string; height: number | string }) => {
    return useMemo(
        () =>
            forwardRef<typeof ScrollView, OuterScrollViewProps>((props, /* Taro legacy ref type */ ref: any) => {
                const { onScroll, ...rest } = props

                const handleScroll = useCallback(
                    event => {
                        onScroll({
                            ...event,
                            currentTarget: { ...event.detail, clientWidth: width, clientHeight: height },
                        })
                    },
                    [width, height, onScroll]
                )

                return <ScrollView ref={ref} scrollX scrollY onScroll={handleScroll} {...rest} />
            }),
        [width, height]
    )
}
