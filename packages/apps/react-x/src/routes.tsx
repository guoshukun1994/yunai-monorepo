import * as React from 'react'
import { useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import Home from '@/pages/home'

type RouteObjectWithTitle = RouteObject & {
	title?: string
	children?: RouteObjectWithTitle[]
}

// routes 配置方法：https://reactrouter.com/en/v6.3.0/api#useroutes
export const routes: RouteObjectWithTitle[] = [
	{
		path: '/',
		title: '首页',
		element: <Home />,
		children: []
	}
]

export const Routes = () => {
	const element = useRoutes(routes)
	return element
}
