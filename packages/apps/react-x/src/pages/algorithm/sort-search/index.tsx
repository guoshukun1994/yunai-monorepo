import React, { useEffect, useState, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import RenderMarkdown from '@/components/render-markdown'
import { Row, Col, Space, Anchor } from 'antd'
import { SORT_SEARCH_KEYS, SORT_SEARCH_KEYS_TYPE } from '@/constants'

const SortSearch = () => {
	const [sourceData, setSourceData] = useState<Record<string, string>>({})
	const anchorRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		fetch('http://localhost:3001/md/sort-search')
			.then((value) => value.json())
			.then((res) => {
				setSourceData(res)
			})
	}, [])

	const keys = Object.keys(sourceData)

	return (
		<PageContainer title="排序&算法" className="fixed">
			<Row>
				<Col
					ref={anchorRef}
					span={22}
					className="overflow-y-scroll h-screen"
				>
					{Object.entries(sourceData).map(([key, value]) => (
						<div
							key={key}
							id={key}
							className="px-4 h-screen bg-[rgba(255,0,0,.02)]"
						>
							<RenderMarkdown mdText={value} />
						</div>
					))}
				</Col>
				<Col span={2} className="fixed inset-y-1/2 right-10 h-screen">
					<Space size="middle" direction="vertical">
						<span className="text-[#213547] font-bold">
							排序算法
						</span>
						<Anchor
							affix
							getContainer={() => anchorRef.current!}
							items={keys.map((key) => ({
								key,
								href: '#' + key,
								title: (
									<span className="text-xs text-[#3C3C3CB3]">
										{
											SORT_SEARCH_KEYS[
												key as keyof SORT_SEARCH_KEYS_TYPE
											]
										}
									</span>
								)
							}))}
						/>
					</Space>
				</Col>
			</Row>
		</PageContainer>
	)
}

export default SortSearch
