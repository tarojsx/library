import React from 'react'
import { View } from '@tarojs/components'
import { VariableSizeList as List, VariableSizeListProps } from 'react-window'

import { useOuterScrollView } from './useOuterScrollView'

export { VariableSizeListProps } from 'react-window'

export const VariableSizeList: React.FC<VariableSizeListProps> = props => {
    const OuterScrollView = useOuterScrollView({ width: props.width, height: props.height })

    return <List {...props} outerElementType={OuterScrollView} innerElementType={View} />
}
