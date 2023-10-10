import React from 'react'
import { Layout, Menu } from 'antd'
import { filterMenuList } from '@/utils/filterMenuList'

const { Sider } = Layout
export const SiderLayout: React.FC = () => {
	return (
		<Sider
			className="!bg-transparent mt-[52px]"
			style={{
				height: 'calc(100vh - 52px)'
			}}
			trigger={null}
			collapsible
			reverseArrow
			width={208}
		>
			<Menu
				className="bg-transparent !border-none"
				mode="inline"
				items={filterMenuList()}
			/>
		</Sider>
	)
}
