import React from 'react'
import { View } from '@tarojs/components'
import { FixedSizeList as List, FixedSizeListProps as ListProps } from 'react-window'

import { useOuterScrollView, OuterScrollViewProps } from './useOuterScrollView'

export interface FixedSizeListProps extends ListProps {
    outerElementProps?: OuterScrollViewProps
}

export const FixedSizeList: React.FC<FixedSizeListProps> = props => {
    const { outerElementProps, ...listProps } = props
    const OuterScrollView = useOuterScrollView({ width: props.width, height: props.height, ...outerElementProps })

    return <List outerElementType={OuterScrollView} innerElementType={View} {...listProps} />
}
