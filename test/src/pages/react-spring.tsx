import React from 'react'
import { View } from '@tarojs/components'
import { useSpring, animated } from 'react-spring'
import { a } from '../../../src/react-spring'

const AnimatedView = animated(View)

export default () => {
    const numberSpring = useSpring({ number: 1, from: { number: 0 } })

    const opacitySpring = useSpring({ opacity: 1, from: { opacity: 0 } })

    const scriptSpring = useSpring({
        from: {
            position: 'relative',
            willChange: 'width, height, left, top',
            left: '0%',
            top: '0%',
            width: '0%',
            height: '0%',
            background: 'lightgreen',
        },
        to: async (next) => {
            while (1) {
                await next({ left: '0%', top: '0%', width: '100%', height: '100%', background: 'lightblue' })
                await next({ height: '50%', background: 'lightgreen' })
                await next({ width: '50%', left: '50%', background: 'lightgoldenrodyellow' })
                await next({ top: '0%', height: '100%', background: 'lightpink' })
                await next({ top: '50%', height: '50%', background: 'lightsalmon' })
                await next({ width: '100%', left: '0%', background: 'lightcoral' })
                await next({ width: '50%', background: 'lightseagreen' })
                await next({ top: '0%', height: '100%', background: 'lightskyblue' })
                await next({ width: '100%', background: 'lightslategrey' })
            }
        },
    })

    return (
        <View>
            <AnimatedView id="number">{numberSpring.number}</AnimatedView>

            <AnimatedView style={opacitySpring}>我闪现至此</AnimatedView>

            <View
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100vw',
                    height: '100vw',
                    backgroundColor: '#f0f0f0',
                }}
            >
                <a.View style={scriptSpring as any} />
            </View>
        </View>
    )
}
