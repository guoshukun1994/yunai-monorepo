import React, { useRef, useEffect } from 'react'
import { message } from 'antd'
import ClipboardJS from 'clipboard'
import Markdownit from 'markdown-it'
import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/ir-black.css'
import './index.css'

import bash from 'highlight.js/lib/languages/bash'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import json from 'highlight.js/lib/languages/json'
import yaml from 'highlight.js/lib/languages/yaml'
import xml from 'highlight.js/lib/languages/xml'
import shell from 'highlight.js/lib/languages/shell'

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
		highlight: function (str, lang) {
			const clipboardHtmlStr = `<button class="copy-btn" data-clipboard-action="copy" data-clipboard-target="#copy">复制</button>`
			try {
				return (
					'<pre class="hljs" style="padding: 24px;position:relative"><code id="copy">' +
					hljs.highlight(lang, str, true).value +
					'</code>' +
					clipboardHtmlStr +
					'</pre>'
				)
			} catch (error) {
				console.error(error)
			}
		}
	})

	const html = md.render(mdText)

	useEffect(() => {
		const clipboard = new ClipboardJS('.copy-btn')

		clipboard.on('success', function (e) {
			message.success('复制成功')
			e.clearSelection()
		})

		clipboard.on('error', function () {
			message.error('复制失败')
		})
	}, [])

	useEffect(() => {
		if (mdRef.current) {
			mdRef.current.innerHTML = html
		}
	}, [mdText])
	return <div ref={mdRef} />
}

export default RenderMarkDown
