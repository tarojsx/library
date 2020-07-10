import React, { useRef } from 'react'
import Taro from '@tarojs/taro'
import _clamp from 'lodash/clamp'
import { View } from '@tarojs/components'
import { useSprings, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { useGestureConfig } from '../../../src/react-use-gesture'

const { windowWidth } = Taro.getSystemInfoSync()
const AnimatedView = animated(View)
const pages = [
    'https://img11.360buyimg.com/uba/jfs/t21205/91/853520716/145629/b03d7fa7/5b19f383N6a30536b.jpg',
    'https://img14.360buyimg.com/ling/jfs/t1/103557/3/12087/1051626/5e44b357E4cab8765/d8c821c4a3e1060d.png',
    'https://storage.360buyimg.com/taro-club-img/b42116392c909d0680788853011c70db',
    'https://storage.jd.com/taro-resource/review.jpg',
    'https://misc.aotu.io/jimczj/2018-08-27taro-ui.jpg',
    'https://img10.360buyimg.com/img/jfs/t1/21860/12/8740/42390/5c790470E1d0bbce9/9f9bb78d01f7564b.png',
]

export default () => {
    const [gestureConfig, containerProps] = useGestureConfig()

    const index = useRef(0)
    const [props, set] = useSprings(pages.length, (i) => ({ x: i * windowWidth, sc: 1, display: 'block' }))

    const drag = useDrag((e) => {
        const {
            down,
            direction: [xDir],
            distance,
            cancel,
        } = e
        if (down && distance > windowWidth / 2) {
            index.current = _clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1)
            cancel()
        }
        set((i) => {
            if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
            const x = (i - index.current) * windowWidth + (down ? xDir * distance : 0)
            const sc = down ? 1 - distance / windowWidth / 2 : 1
            return { x, sc, display: 'block' }
        })
    }, gestureConfig)

    return (
        <View {...containerProps}>
            {props.map(({ x, display, sc }, i) => (
                <AnimatedView
                    {...(drag() as any)}
                    key={i}
                    style={{
                        position: 'absolute',
                        display,
                        width: '100vw',
                        height: '50vh',
                        transform: x.interpolate((x) => `translate3d(${x}px,0,0)`),
                    }}
                >
                    <AnimatedView
                        style={{
                            height: '100%',
                            transform: sc.interpolate((s) => `scale(${s})`),
                            background: `center / contain no-repeat url(${pages[i]})`,
                        }}
                    />
                </AnimatedView>
            ))}
        </View>
    )

    // return <View {...containerProps}>{<View {...bind()} />}</View>
}
