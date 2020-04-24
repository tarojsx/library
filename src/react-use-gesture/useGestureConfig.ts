import { useState } from 'react'
import { uuid } from '../utils'

export interface GestureConfigOptions {
    /** 容器元素 ID, 默认为随机生成的 uuid. */
    id?: string
    ref?: any
}

/**
 * useGestureConfig hook. 获取 `react-use-gesture` 配置, 需要把返回的第二个参数赋值给包裹元素.
 *
 * @example
 * ```jsx
 *  const [gestureConfig, containerProps] = useGestureConfig()
 *  const bind = useDrag(() => {}, gestureConfig)
 *  return (
 *      <View {...containerProps}>{
 *          <View {...bind()} />
 *      }</View>
 *  )
 * ```
 */
export function useGestureConfig(options = {} as GestureConfigOptions) {
    const { id = uuid(), ref = () => {} } = options

    const [container, setContainer] = useState<HTMLElement>()

    const gestureConfig = {
        window: container,
    }

    const containerProps = {
        id,
        ref: (container: HTMLElement) => {
            if (!container) return
            setContainer(container)
            ref(container)
        },
    }

    return [gestureConfig, containerProps] as [typeof gestureConfig, typeof containerProps]
}
