import React, { useState, useEffect, useRef } from 'react'
import * as monaco from 'monaco-editor'

const reactTemplate = `
function App() {  // 这是react组件的示例
  const [count, setCount] = React.useState(0);

  return (
    <button 
      onClick={()=> {
        console.log(count+1);
        setCount(count+1);
      }}>
      {count}
    </button>
  )
}`

const jsTemplate = "console.log('这是一个javascript代码的示例')"

type Props = {
	visualWidth?: number
}

function VisualEditor({ visualWidth = 475 }: Props) {
	const editorWrapperRef = useRef(null)
	const editorRef = useRef<any>()
	const iframeRef = useRef<HTMLIFrameElement>(null)
	const consoleRef = useRef<HTMLPreElement>(null)

	const [codeType, setCodeType] = useState<string>('')
	const [code, setCode] = useState<string>('')

	const isReact = codeType === 'React'

	const onChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCodeType(e.target.value)
	}

	const formatEditor = () => {
		if (editorRef.current) {
			editorRef.current.getAction('editor.action.formatDocument').run()
		}
	}

	const handleChangeCode = (code: string) => {
		const iframeContentWindow = iframeRef.current?.contentWindow as any
		const consoleNode = consoleRef.current
		iframeContentWindow.logArr = []
		iframeContentWindow.console.log = function (...args: unknown[]) {
			if (typeof args[0] === 'string') {
				iframeContentWindow.logArr.push(args[0])
			} else if (args.length > 1) {
				iframeContentWindow.logArr.push(args.join(','))
			} else {
				iframeContentWindow.logArr.push(
					JSON.stringify(args[0], null, 2)
				)
			}
			consoleNode!.textContent = iframeContentWindow.logArr.join('\n')
			consoleNode!.style.whiteSpace = 'pre-wrap'
		}

		try {
			// 在实时预览窗口中渲染react组件
			const previewCode = `
      <html>
        <head>
          <title>Preview</title>
          ${
				isReact
					? `
              <script src="https://cdn.bootcdn.net/ajax/libs/react/18.2.0/cjs/react-jsx-dev-runtime.development.min.js"></script>
              <script src="https://cdn.bootcdn.net/ajax/libs/react-dom/18.2.0/cjs/react-dom-server-legacy.browser.development.min.js"></script>
            `
					: ''
			}
          <script src="https://cdn.bootcdn.net/ajax/libs/babel-standalone/7.21.4/babel.min.js"></script>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            const rootElement = document.getElementById("root");
            ${
				isReact
					? `
              ${reactTemplate}
              const Component = ${code ? `eval(${code})` : 'App'};
              ReactDOM.creatRoot(rootElement).render(<Component/>);
            `
					: `eval(function(){${code}}())`
			};
            
          </script>
        </body>
      </html>
      `

			// 更新实时预览窗口的内容
			const previewDoc = iframeRef.current?.contentDocument
			previewDoc?.open()
			previewDoc?.write(previewCode)
			previewDoc?.close()

			// 控制台输出
			consoleNode!.textContent = iframeContentWindow.logArr.join('\n')
			consoleNode!.style.whiteSpace = 'pre-wrap'
		} catch (error: any) {
			// 输出错误到控制台窗口
			consoleNode!.textContent = error.message
		}
	}

	const renderSelect = () => (
		<select
			className="text-base h-[18px] mx-0 my-2"
			value={codeType}
			onChange={onChangeLanguage}
		>
			<option>React</option>
			<option>JavaScript</option>
		</select>
	)

	useEffect(() => {
		// 创建Monaco Editor 实例
		editorRef.current = monaco.editor.create(editorWrapperRef.current!, {
			value: reactTemplate,
			language: 'javascript',
			theme: 'vs-dark'
		})

		// 监听编辑器内容变化事件
		editorRef.current.onDidChangeModelContent(() => {
			const code = editorRef.current.getValue()
			setCode(code)
		})

		setTimeout(() => {
			formatEditor()
		}, 1000)
	}, [])

	useEffect(() => {
		formatEditor()
	}, [editorRef.current])

	useEffect(() => {
		handleChangeCode(code)
	}, [code])

	useEffect(() => {
		const codeTemplate = codeType === 'React' ? reactTemplate : jsTemplate
		editorRef.current.setValue(codeTemplate)
		handleChangeCode(codeTemplate)
		setCode(codeTemplate)
	}, [codeType])

	return (
		<div
			className="flex justify-between p-4 overflow-hidden"
			style={{ width: visualWidth * 2 + 48 }}
		>
			<div>
				{renderSelect()}
				<div
					ref={editorWrapperRef}
					style={{ height: 660, width: visualWidth }}
				></div>
			</div>
			<div>
				<div style={{ display: isReact ? 'block' : 'none' }}>
					<h3 className="p-0 my-1 mx-0">Preview</h3>
					<iframe
						className="border-2 border-solid border-l-[rgb(154,154,154)] border-t-[rgb(154,154,154)] border-b-[rgb(238,238,238)] border-r-[rgb(238,238,238)]"
						style={{ height: 300, width: visualWidth }}
						ref={iframeRef}
					></iframe>
				</div>
				<div>
					<h3 className="p-0 my-1 mx-0">Console</h3>
					<div
						style={{ width: visualWidth }}
						className="border-2 border-solid border-l-[rgb(154,154,154)] border-t-[rgb(154,154,154)] border-b-[rgb(238,238,238)] border-r-[rgb(238,238,238)]"
					>
						<pre
							className="overflow-y-scroll m-[6px]"
							style={{
								height: isReact ? 300 : 644,
								width: visualWidth
							}}
							ref={consoleRef}
						></pre>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VisualEditor
