import React, { useEffect } from 'react'

import { ConfigProvider, Layout } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { HelmetTitle } from '@proj/react-components'
import { routes } from '@/routes'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { SiderLayout } from '../sider-layout'
import { HeaderLayout } from '../header-layout'

const BasicLayout = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (pathname === '/') {
			navigate('basics')
		}
	}, [pathname])

	return (
		<ConfigProvider
			locale={zhCN}
			theme={{
				token: {
					colorPrimary: '#1CB2D2',
					colorSuccess: '#50C319',
					colorWarning: '#F9AE13',
					colorError: '#F3222F'
				}
			}}
		>
			<HelmetTitle
				routes={routes}
				appName="前端万事屋"
				pathname={pathname}
			/>
			<Layout>
				<HeaderLayout />
				{!pathname.includes('basics') && <SiderLayout />}
				<Layout.Content className='mt-[52px] min-h-screen'>
					<Outlet />
				</Layout.Content>
			</Layout>
		</ConfigProvider>
	)
}

export default BasicLayout
