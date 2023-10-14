import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons'
import { Layout, Space } from 'antd'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { images } from '@/constants/images'
import { TOP_NAV_LIST } from '@/constants'

const { Header } = Layout
const MyIcon = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/c/font_4282801_iaypfsm309.js' // 在 iconfont.cn 上生成
})
export const HeaderLayout = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	return (
		<Header className="!bg-[#EADBCB] flex items-center fixed z-10 left-0 top-0 w-screen h-[52px] pt-0 pb-0 rounded-bl-md">
			<Space>
				<img width={24} src={images.logo} />
				<span
					className="text-[#FF9B50] hover:text-[#E9B824] font-semibold text-lg cursor-pointer"
					onClick={() => navigate('home')}
				>
					前端万事屋
				</span>
			</Space>

			<div className="mx-auto my-0">
				<Space size="large">
					{TOP_NAV_LIST.map(({ key, path, label }) => {
						const color = pathname.includes(path)
							? '#1CB2D2'
							: undefined
						return (
							<NavLink key={key} to={path} style={{ color }}>
								{label}
							</NavLink>
						)
					})}
				</Space>
			</div>
			<MyIcon
				className="cursor-pointer"
				onClick={() =>
					window.open(
						'https://github.com/guoshukun1994/yunai-monorepo',
						'_blank'
					)
				}
				style={{ fontSize: 24 }}
				type="icon-github"
			/>
		</Header>
	)
}
