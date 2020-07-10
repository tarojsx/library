/// <reference types="@minapp/wx" />

import path from 'path'
import automator from 'miniprogram-automator'
import _MiniProgram from 'miniprogram-automator/out/MiniProgram'
import Page from 'miniprogram-automator/out/Page'

declare global {
    class MiniProgram extends _MiniProgram {
        evaluate<T = any>(appFunction: string | (() => T | Promise<T>)): Promise<T>
    }
}

const cwd = path.resolve(__dirname, '..')

jest.setTimeout(10000)

describe('weapp', () => {
    let miniProgram: MiniProgram
    let page: Page

    beforeAll(async () => {
        miniProgram = await automator.launch({
            projectPath: cwd,
        })
        page = await miniProgram.reLaunch('/pages/index')
        page.waitFor(500)
    }, 30000)

    afterAll(async () => {
        miniProgram && (await miniProgram.close())
    })

    describe('antv', () => {
        describe('f2', () => {
            let page: Page

            beforeAll(async () => {
                page = await miniProgram.navigateTo('/pages/antv/f2')
            })

            it('canvas', async () => {
                let canvas = await page.$('canvas')

                expect(canvas).toBeDefined()
            })
        })
    })

    describe('react-spring', () => {
        describe('animated', () => {
            let page: Page

            beforeAll(async () => {
                page = await miniProgram.navigateTo('/pages/react-spring/animated')
            })

            it('#number', async () => {
                let el = await page.$('#number')

                await expect(el.text()).resolves.toBe('1')
            })
        })
    })
})
