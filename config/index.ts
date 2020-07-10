import WebpackChain from 'webpack-chain'
import { IProjectConfig } from '@tarojs/taro/types/compile'
import { TaroProvidePlugin } from '@tarojsx/polyfill/dist/plugins'

const config: IProjectConfig = {
    projectName: 'test',
    date: '2020-2-22',
    designWidth: 750,
    deviceRatio: { 750: 1 },
    sourceRoot: 'test/src',
    outputRoot: 'test/dist',
    framework: 'react',
    mini: {
        webpackChain(chain: WebpackChain) {
            chain.plugin('taroProvidePlugin').use(TaroProvidePlugin)
        },
    },
}

export default function (merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, { env: { NODE_ENV: '"development"' } })
    }
    return merge({}, config, { env: { NODE_ENV: '"production"' } })
}
