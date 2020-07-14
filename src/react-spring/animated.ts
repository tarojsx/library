import { View, Text, Image } from '@tarojs/components'
import { Globals, animated as animatedWeb, AnimatedComponent } from '@react-spring/web'
import { ElementType } from '@react-spring/shared'

type CreateAnimated = <T extends ElementType>(wrappedComponent: T) => AnimatedComponent<T>

declare type TaroElements = typeof elements
declare type TaroComponents = {
    [P in keyof TaroElements]: AnimatedComponent<TaroElements[P]>
}

const elements = {
    View,
    Text,
    Image,
}

const animated = (animatedWeb as unknown) as CreateAnimated & TaroComponents

// 其他平台采用的 extendAnimated 方式在小程序里无效. 我们采用直接赋值.
for (const key of Object.keys(elements)) {
    const element = elements[key]
    animated[key] = animated(element)
}

Globals.assign({
    // BUG 只有产品环境编译后才会调用 willAdvance, 开发环境发现不了这个 BUG.
    willAdvance: () => {},
})

export { animated as a, animated }
