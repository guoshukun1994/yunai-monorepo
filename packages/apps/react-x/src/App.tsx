import React from 'react'
import { css } from '@emotion/css'
import styles from './app.module.less'
import { Alert, Button } from '@proj/react-components';

const color: string = 'white'

const App = () => {
	return (
		<div>
			<Alert kind='warning'>alert</Alert>
			<Button onClick={()=> console.log('我的自定义按钮')}>我的按钮</Button>
			<div className="title">App, hello</div>
			<div
				className={css`
					padding: 32px;
					background-color: pink;
          color: ${process.env.PRIMARY};
					&: hover {
						color: ${color};
					}
				`}
			>
				hello - emotion
			</div>
			<div className={styles.hello}>hello - css module</div>
			<div className="text-blue-600 text-lg">hello - tailwind</div>
		</div>
	)
}

export default App
