import React, { useRef, useEffect } from 'react'
import { message } from 'antd'
import ClipboardJS from 'clipboard'
import Markdownit from 'markdown-it'
import MarkdownitAnchor from 'markdown-it-anchor'
import MarkdownitToc from 'markdown-it-toc-done-right'
import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/rainbow.css'
import './index.css'

import bash from 'highlight.js/lib/languages/bash'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import json from 'highlight.js/lib/languages/json'
import yaml from 'highlight.js/lib/languages/yaml'
import xml from 'highlight.js/lib/languages/xml'
import shell from 'highlight.js/lib/languages/shell'

import _ from 'lodash-es'
import { escapeHtml, getKey } from '@/utils'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('json', json)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('shell', shell)

type Props = {
    mdText: string
}
const RenderMarkDown = ({ mdText }: Props) => {
    const mdRef = useRef<HTMLDivElement>(null)

    const md = new Markdownit({
        html: true,
        linkify: true,
        breaks: true,
        xhtmlOut: true,
        typographer: true,
        highlight: function (str: string, lang: string) {
            const key = getKey()

            setTimeout(() => {
                const clipboard = new ClipboardJS('.copy' + key)

                clipboard.on(
                    'success',
                    _.debounce(function (e) {
                        message.success('复制成功')
                        e.clearSelection()
                    }, 300)
                )

                clipboard.on('error', function () {
                    message.error('复制失败')
                })
            }, 0)

            const clipboardHtmlStr =
                '<button class="copy-btn copy' +
                key +
                '" data-clipboard-action="copy" data-clipboard-target="#copy' +
                key +
                '">复制</button>'
            try {
                return (
                    '<pre class="hljs" style="padding: 24px;position:relative"><code id="copy' +
                    key +
                    '">' +
                    hljs.highlight(lang, str, true).value +
                    '</code>' +
                    clipboardHtmlStr +
                    '</pre>'
                )
            } catch (error) {
                console.error(error)
            }
        },
    })
        .use(MarkdownitAnchor, {
            level: 3,
            permalink: true,
            permalinkSymbol: '#',
            permalinkBefore: true,
        })
        .use(MarkdownitToc, { containerClass: 'custom-right-toc' })

    // 给 md 代码行加颜色
    md.renderer.rules.code_inline = function (tokens, idx, options, env, slf) {
        const token = tokens[idx]
        const contentArr = token.content.split(' ')
        const color = contentArr.length > 1 ? contentArr[0] : 'red'
        const content = contentArr[contentArr.length - 1]
        return (
            '<code style=' +
            `"color: ${color}"` +
            slf.renderAttrs(token) +
            '>' +
            escapeHtml(content) +
            '</code>'
        )
    }

    const html = md.render(mdText)

    useEffect(() => {
        if (mdRef.current) {
            mdRef.current.innerHTML = html
        }
    }, [mdText])
    return <div className="overflow-hidden pr-40" ref={mdRef} />
}

export default RenderMarkDown
