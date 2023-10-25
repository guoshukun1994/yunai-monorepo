let keyCounter = 0
export const getKey = () => {
    keyCounter += 1
    return keyCounter
}

export function jsonParseSafely(data: string) {
    let obj
    try {
        obj = JSON.parse(data)
    } catch (error) {
        console.log('error', error)
    }
    return obj
}
