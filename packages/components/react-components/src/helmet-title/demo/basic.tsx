import React from 'react'
import { HelmetTitle, RouteObjectWithTitle } from '..'
import { ConfigProvider, Layout } from 'antd'
import { useLocation } from 'react-router-dom'

// 测试文档标题是否有效
const routes = [
	{
		path: '/components',
		children: [
			{
				path: 'helmet-title',
				title: '文档标题组件',
				element: <div>这里是文档标题组件</div>,
			},
		],
	},
] as RouteObjectWithTitle[]

export default function MyButton() {
	const { pathname } = useLocation()
	return (
		<ConfigProvider>
			<HelmetTitle
				routes={routes}
				appName="前端万事屋"
				pathname={pathname}
			/>
			<Layout>请查看文档标题内容</Layout>
		</ConfigProvider>
	)
}
