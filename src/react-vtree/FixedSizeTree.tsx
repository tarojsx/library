import React from 'react'
import { View } from '@tarojs/components'
import { FixedSizeTree as Tree, FixedSizeTreeProps as TreeProps } from 'react-vtree'

import { useOuterScrollView, OuterScrollViewProps } from '../react-window/useOuterScrollView'

export interface FixedSizeTreeProps<T> extends TreeProps<T> {
    outerElementProps?: OuterScrollViewProps
}

export function FixedSizeTree<T>(props: FixedSizeTreeProps<T>) {
    const { outerElementProps, ...treeProps } = props
    const OuterScrollView = useOuterScrollView({ width: props.width, height: props.height, ...outerElementProps })

    return <Tree<T> outerElementType={OuterScrollView} innerElementType={View} {...treeProps} />
}
