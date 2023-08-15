import React from 'react'
import TextEllipsis from '..'

export default function MyTextEllipsis() {
	return (
		<TextEllipsis style={{ width: 200 }}>
			这是一个单行省略文本，鼠标悬停后通过起泡浮层展示全部内容
		</TextEllipsis>
	)
}
