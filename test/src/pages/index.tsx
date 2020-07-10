import React from 'react'
import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

const btnStyle: React.CSSProperties = { margin: 30 }

export default () => (
    <View>
        <Button style={btnStyle} onClick={() => Taro.navigateTo({ url: '/pages/antv-f2' })}>
            AntV F2
        </Button>
        <Button style={btnStyle} onClick={() => Taro.navigateTo({ url: '/pages/react-spring' })}>
            React Spring
        </Button>
        <Button style={btnStyle} onClick={() => Taro.navigateTo({ url: '/pages/react-use-gesture' })}>
            React Use Gesture
        </Button>
    </View>
)
