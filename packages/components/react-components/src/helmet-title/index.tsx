import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import type { RouteObject } from 'react-router-dom'
import { matchPath } from 'react-router-dom'

export type RouteObjectWithTitle = RouteObject & {
	title?: string
	children?: RouteObjectWithTitle[]
}

const getPathTitleMapFromRoutes = (
	routes: RouteObjectWithTitle[],
	prefix?: string,
) => {
	const path = prefix && prefix !== '/' ? `${prefix}/` : ''
	let map: Record<string, string> = {}
	routes.forEach((i) => {
		if (i.children && i.children.length > 0) {
			const childMap = getPathTitleMapFromRoutes(
				i.children,
				`${path}${i.path}`,
			)
			map = Object.assign(map, childMap)
		} else {
			if (i.path) {
				map[`${path}${i.path}`] = i.title || ''
			} else if (i.index && prefix && prefix !== '/') {
				map[prefix] = i.title || ''
			}
		}
	})
	return map
}

type Props = {
	routes: RouteObjectWithTitle[]
	appName: string
	hrefForSE?: string
	pathname: string
}

export const HelmetTitle = ({
	routes,
	appName,
	hrefForSE,
	pathname,
}: Props) => {
	const [title, setTitle] = useState<string>('')
	const titleMap = useMemo(() => getPathTitleMapFromRoutes(routes), [routes])

	useEffect(() => {
		const pattern = Object.keys(titleMap || {}).find((i) => {
			const result = matchPath(i, pathname)
			return Object.keys(result || {}).length > 0
		})

		setTitle(titleMap?.[pattern || ''] || '')
	}, [pathname])

	return (
		<Helmet>
			<meta charSet="utf-8" />
			<title>
				{title} - {appName}
			</title>
			{hrefForSE && <link rel="canonical" href={hrefForSE} />}
		</Helmet>
	)
}
