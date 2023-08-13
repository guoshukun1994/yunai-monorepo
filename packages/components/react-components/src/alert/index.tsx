import React, { FC, ReactNode } from 'react'
import './style/index.less'

type KindType = 'info' | 'positive' | 'nagative' | 'warning'

interface AlertProps {
	children?: ReactNode
	kind: KindType
}

const prefixCls = 'yunai-alert'
const kinds: Record<KindType, string> = {
	info: '#5352ED',
	positive: '#2ED573',
	nagative: '#FF4757',
	warning: '#FFA502'
}

const Alert: FC<AlertProps> = ({ children, kind = 'info', ...rest }) => (
	<div className={prefixCls} style={{ background: kinds[kind] }} {...rest}>
		{children}
	</div>
)

export default Alert
