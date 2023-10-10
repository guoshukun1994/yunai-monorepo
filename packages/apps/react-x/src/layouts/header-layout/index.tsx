import React from 'react'
import { Layout, Space } from 'antd'
import { images } from '@/constants/images'

type Props = {}

const { Header } = Layout
export const HeaderLayout = (props: Props) => {
	return (
		<Header className="!bg-transparent flex justify-between items-center fixed left-0 top-0 w-screen h-[52px] pt-0 pr-6 pb-0 pl-[15px] bg-white">
			<Space>
				<img width={24} src={images.logo} />
				<span>前端万事屋</span>
			</Space>
		</Header>
	)
}
