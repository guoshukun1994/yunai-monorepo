import React, { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import RenderMarkdown from '@/components/render-markdown'

const Algorithm = () => {
	const [sourceData, setSourceData] = useState('')

	useEffect(() => {
		fetch('http://localhost:3001/md/linkedList')
			.then((value) => value.text())
			.then((res) => {
				setSourceData(res)
			})
	}, [])

	return (
		<PageContainer title="算法">
			<RenderMarkdown mdText={sourceData} />
		</PageContainer>
	)
}

export default Algorithm
