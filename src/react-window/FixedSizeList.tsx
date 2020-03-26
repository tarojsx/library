import React from 'react'
import { View } from '@tarojs/components'
import { FixedSizeList as List, FixedSizeListProps } from 'react-window'

import { useOuterScrollView } from './useOuterScrollView'

export { FixedSizeListProps } from 'react-window'

export const FixedSizeList: React.FC<FixedSizeListProps> = props => {
    const OuterScrollView = useOuterScrollView({ width: props.width, height: props.height })

    return <List {...props} outerElementType={OuterScrollView} innerElementType={View} />
}
