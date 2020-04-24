export function uuid(len = 8, radix = 16): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    const value: string[] = []
    let i = 0
    radix = radix || chars.length

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) value[i] = chars[0 | (Math.random() * radix)]
    } else {
        // rfc4122, version 4 form
        let r

        // rfc4122 requires these characters
        /* eslint-disable-next-line */
        value[8] = value[13] = value[18] = value[23] = '-'
        value[14] = '4'

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!value[i]) {
                r = 0 | (Math.random() * 16)
                value[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
            }
        }
    }

    return value.join('')
}

/**
 * 替换 camelCase 为 dashedCase.
 *
 * @see https://github.com/NervJS/taro/blob/next/packages/shared/src/utils.ts
 */
export function toDashed(s: string) {
    return s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}
