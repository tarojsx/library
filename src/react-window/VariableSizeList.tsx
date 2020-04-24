import React, { useEffect } from 'react'
import { View } from '@tarojs/components'
import { VariableSizeList as List, VariableSizeListProps as ListProps } from 'react-window'

// import { useOuterScrollView, OuterScrollViewProps } from './useOuterScrollView'
import { OuterScrollView } from './OuterScrollView'

export interface VariableSizeListProps extends ListProps {
    /** 传给 outer element 的属性 */
    // outerElementProps?: OuterScrollViewProps
}

export const VariableSizeList = React.forwardRef<List, VariableSizeListProps>((props, ref) => {
    // const { outerElementProps, ...listProps } = props
    // const OuterScrollView = useOuterScrollView({
    //     width: props.width,
    //     height: props.height,
    //     ...outerElementProps,
    // })

    // useEffect(() => {}, [])

    return <List ref={ref} outerElementType={OuterScrollView} innerElementType={View} {...props} />
})
// export const VariableSizeList: React.FC<VariableSizeListProps> = props => {
//     const { outerElementProps, ...listProps } = props
//     const OuterScrollView = useOuterScrollView({
//         width: props.width,
//         height: props.height,
//         ...outerElementProps,
//     })

//     useEffect(() => {}, [])

//     return <List outerElementType={OuterScrollView} innerElementType={View} {...listProps} />
// }
