import React from 'react'
import { View } from '@tarojs/components'
import { FixedSizeList as List, FixedSizeListProps as ListProps } from 'react-window'

import { OuterScrollView } from './OuterScrollView'
// import { useOuterScrollView, OuterScrollViewProps } from './useOuterScrollView'

export interface FixedSizeListProps extends ListProps {
    // outerElementProps?: OuterScrollViewProps
}

export const FixedSizeList = React.forwardRef<List, FixedSizeListProps>((props, ref) => {
    // const { outerElementProps, ...listProps } = props
    // const OuterScrollView = useOuterScrollView({ width: props.width, height: props.height, ...outerElementProps })

    return <List ref={ref} outerElementType={OuterScrollView} innerElementType={View} {...props} />
})
