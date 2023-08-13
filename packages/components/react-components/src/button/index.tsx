import React, { CSSProperties, FC, ReactNode } from 'react'
import './style/index.less'

export interface ButtonProps {
	onClick?: () => void
	children?: ReactNode
	style?: CSSProperties;
}

const Button: FC<ButtonProps> = (props) => {
	return (
		<button onClick={props.onClick} className="btn">
			{props?.children}
		</button>
	)
}

export default Button
