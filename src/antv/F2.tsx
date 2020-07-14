import React from 'react'
import { Chart, Global, ChartParams, DataRecord } from '@antv/f2'

import { F2Core } from './F2Core'

interface F2Props<TRecord extends DataRecord = DataRecord> extends Omit<F2Core.Props<TRecord>, 'config'> {
    config?: ChartParams
}

export declare namespace F2 {
    type Props<TRecord> = F2Props<TRecord>
}

export const F2 = function <TRecord extends DataRecord = DataRecord>(props: F2Props<TRecord>) {
    const { config = {}, ...rest } = props

    return <F2Core config={{ Chart, Global, ...config }} {...rest} />
}
