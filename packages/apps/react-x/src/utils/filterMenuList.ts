import { routes } from '../routes'
import type { MenuProps } from 'antd'
import type { RouteObjectWithTitle } from '@proj/react-components'

type MenuItem = {
	key?: string
	label?: string
	children?: RouteObjectWithTitle[]
}
export const filterMenuList = (
	currentRoutes?: RouteObjectWithTitle[],
	prefix?: string
) => {
	const routeList =
		currentRoutes || (routes[1].children as RouteObjectWithTitle[])
	return routeList?.map(({ path, title, children }) => {
		const item: MenuItem = {
			key: (prefix ? `${prefix}/` : '') + path,
			label: title
		}
		if (children && children.length > 0) {
			item.children = filterMenuList(
				children,
				item.key
			) as RouteObjectWithTitle[]
		}
		console.log('ti', item)

		return item
	}) as MenuProps['items']
}
