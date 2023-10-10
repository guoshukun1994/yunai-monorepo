import * as React from 'react'
import { useRoutes, Outlet, redirect } from 'react-router-dom'
import BasicLayout from '@/layouts/basic-layout'
import Home from '@/pages/home'
import Basics from '@/pages/basics'
import Algorithm from '@/pages/algorithm'
import Browser from '@/pages/browser'
import Communication from '@/pages/communication'
import Engineering from '@/pages/engineering'
import Frame from '@/pages/frame'
import Node from '@/pages/node'
import type { RouteObjectWithTitle } from '@proj/react-components'

// routes 配置方法：https://reactrouter.com/en/v6.3.0/api#useroutes
export const routes = [
	{
		path: 'home',
		title: '首页',
		element: <Home />,
		children: []
	},
	{
		path: '/',
		element: (
			<BasicLayout/>
		),
		children: [
			{
				path: 'basics',
				title: '基础',
				element: <Basics />,
				children: []
			},
			{
				path: 'algorithm',
				title: '算法',
				element: <Algorithm />,
				children: []
			},
			{
				path: 'frame',
				title: '框架',
				element: <Frame />,
				children: []
			},
			{
				path: 'communication',
				title: '通信',
				element: <Communication />,
				children: []
			},
			{
				path: 'browser',
				title: '浏览器',
				element: <Browser />,
				children: []
			},
			{
				path: 'engineering',
				title: '工程化',
				element: <Engineering />,
				children: []
			},
			{
				path: 'node',
				title: 'Node',
				element: <Node />,
				children: []
			}
		]
	}
] as RouteObjectWithTitle[]

export const Routes = () => {
	const element = useRoutes(routes)
	return element
}
