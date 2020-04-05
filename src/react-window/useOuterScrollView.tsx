import React, { forwardRef, useMemo, useCallback } from 'react'
import { ScrollView } from '@tarojs/components'
import { ScrollViewProps } from '@tarojs/components/types/ScrollView'

// import { useOuterScrollViewProps } from './useOuterScrollViewProps'

export interface OuterScrollViewProps extends Omit<ScrollViewProps, 'onScroll'> {
    onScroll?(event: React.UIEvent): void
}

export interface UseOuterScrollViewProps extends OuterScrollViewProps {
    width?: number | string
    height?: number | string
}

/**
 * Container scroll view hook
 *
 * Use provided width/height synthesize standard onScroll event
 */
export function useOuterScrollView({ width, height, ...outerScrollViewProps }: UseOuterScrollViewProps) {
    // const outerScrollViewProps = useOuterScrollViewProps(rest)

    return useMemo(
        () =>
            forwardRef<typeof ScrollView, OuterScrollViewProps>((props, ref: any) => {
                const { onScroll, ...rest } = { ...outerScrollViewProps, ...props }

                const handleScroll = useCallback(
                    event => {
                        onScroll({
                            ...event,
                            currentTarget: { ...event.currentTarget, clientWidth: width, clientHeight: height },
                        })
                    },
                    [width, height, onScroll]
                )

                return (
                    <ScrollView
                        ref={ref}
                        style={{ overflowAnchor: 'auto' }}
                        scrollX
                        scrollY
                        scroll-anchoring
                        onScroll={handleScroll}
                        {...rest}
                    />
                )
            }),
        [width, height]
    )
}
