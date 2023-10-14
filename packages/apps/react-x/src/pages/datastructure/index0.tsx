import React, { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import RenderMarkdown from '@/components/render-markdown'

const DataStructure = () => {
	const [sourceData, setSourceData] = useState('')

	useEffect(() => {
		fetch('http://localhost:3001/md/linkedList')
			.then((value) => value.text())
			.then((res) => {
				setSourceData(res)
			})
	}, [])

	return (
		<PageContainer title="数据结构">
			<RenderMarkdown mdText={sourceData} />
		</PageContainer>
	)
}

export default DataStructure
