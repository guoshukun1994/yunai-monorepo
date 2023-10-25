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

const HTML_ESCAPE_TEST_RE = /[&<>"]/
const HTML_ESCAPE_REPLACE_RE = /[&<>"]/g
type HTMLSTR = {
    '&': '&amp;'
    '<': '&lt;'
    '>': '&gt;'
    '"': '&quot;'
}
const HTML_REPLACEMENTS: HTMLSTR = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
}

function replaceUnsafeChar(ch: keyof HTMLSTR) {
    return HTML_REPLACEMENTS[ch]
}

export function escapeHtml(str: string) {
    if (HTML_ESCAPE_TEST_RE.test(str)) {
        return str.replace(HTML_ESCAPE_REPLACE_RE, (ch) =>
            replaceUnsafeChar(ch as keyof HTMLSTR)
        )
    }
    return str
}
