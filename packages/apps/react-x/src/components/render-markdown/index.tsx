import React, { useRef, useEffect } from 'react'
import markdownit from 'markdown-it'

type Props = {
	mdText: string
}
const RenderMarkDown = ({ mdText }: Props) => {
	const mdRef = useRef<HTMLDivElement>(null)
	const md = markdownit()
	const html = md.render(mdText)

  useEffect(() => {
    if(mdRef.current) {
      mdRef.current.innerHTML = html
    }
  }, [mdText])
	return <div ref={mdRef}/>
}

export default RenderMarkDown
