import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { filterMenuList } from '@/utils/filterMenuList'

const { Sider } = Layout
export const SiderLayout: React.FC = () => {
	const navigate = useNavigate()
	return (
		<Sider
			className="!bg-[#F8F0E5] fixed z-0 top-[84px] opacity-80 rounded-md"
			style={{
				height: 'calc(100vh - 84px)'
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
				onClick={({ key }) => {
					navigate(key)
				}}
			/>
		</Sider>
	)
}
