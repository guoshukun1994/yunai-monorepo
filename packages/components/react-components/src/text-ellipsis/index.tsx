import React, {
	useState,
	useEffect,
	useRef,
	FC,
	ReactNode,
	CSSProperties
} from 'react'
import { Tooltip } from 'antd'
import { TooltipPlacement } from 'antd/lib/tooltip'
import './style/index.less'

interface TextEllipsisProps {
	title?: string
	style?: CSSProperties
	placement?: TooltipPlacement
	overlayInnerStyle?: CSSProperties
	children?: ReactNode
}

const TextEllipsis: FC<TextEllipsisProps> = ({
	title,
	style,
	placement = 'topRight',
	overlayInnerStyle,
	children
}) => {
	const [overflow, setOverflow] = useState<boolean>(false)
	const textNodeRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const textNode = textNodeRef.current
		if (textNode) {
			const { clientWidth, scrollWidth } = textNode
			if (clientWidth < scrollWidth) {
				setOverflow(true)
			}
		}
	}, [children])

	const text = (
		<div className="text-wrapper" ref={textNodeRef} style={style}>
			{children}
		</div>
	)

	return overflow ? (
		<Tooltip
			title={title || children}
			placement={placement}
			overlayInnerStyle={overlayInnerStyle}
		>
			{text}
		</Tooltip>
	) : (
		text
	)
}

export default TextEllipsis
