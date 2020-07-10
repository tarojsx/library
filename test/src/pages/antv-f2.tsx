import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { F2 } from '../../../src/antv'

const f2style: React.CSSProperties = { width: '100vw', height: '50vh' }

export default () => {
    const [data1, setData1] = useState([
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
    ])
    const [data2, setData2] = useState([
        { year: '2001', population: 41.8 },
        { year: '2002', population: 25.8 },
        { year: '2003', population: 31.7 },
        { year: '2004', population: 46 },
        { year: '2005', population: 28 },
    ])

    useEffect(() => {
        const timer = setInterval(() => {
            setData1((prev) => prev.map(({ genre }) => ({ genre, sold: Math.round(Math.random() * 100) })))
            setData2((prev) => prev.map(({ year }) => ({ year, population: Math.round(Math.random() * 10) })))
        }, 2000)

        return () => clearInterval(timer)
    }, [])

    return (
        <View style={{ display: 'flex', flexWrap: 'wrap' }}>
            <F2
                style={f2style}
                // F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
                data={data1}
            >
                {
                    // Step 1: 接收 Chart 对象
                    ({ chart, data }) => {
                        // Step 2: 载入数据源
                        chart.source(data)

                        // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
                        chart.interval().position('genre*sold').color('genre')

                        // Step 4: 渲染图表
                        chart.render()
                    }
                }
            </F2>

            <F2
                style={f2style}
                data={data2}
            >
                {({ chart, data }) => {
                    chart.source(data)
                    chart.coord('polar')
                    chart.legend({
                        position: 'right',
                    })
                    chart.axis(false)
                    chart.interval().position('year*population').color('year').style({
                        lineWidth: 1,
                        stroke: '#fff',
                    })
                    chart.render()
                }}
            </F2>
        </View>
    )
}
