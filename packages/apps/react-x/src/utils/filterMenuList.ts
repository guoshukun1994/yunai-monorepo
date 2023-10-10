import { routes } from '../routes'
import type { MenuProps } from 'antd'
import type { RouteObjectWithTitle } from '@proj/react-components'

type MenuItem = {
	key?: string
	label?: string
	children?: RouteObjectWithTitle[]
}
export const filterMenuList = () => {
	return (routes[1].children as RouteObjectWithTitle[])?.map(
		({ path, title, children }) => {
			const item: MenuItem = {
				key: path,
				label: title
			}
			if (children && children.length > 0) {
				item.children = children
			}
			return item
		}
	) as MenuProps['items']
}
