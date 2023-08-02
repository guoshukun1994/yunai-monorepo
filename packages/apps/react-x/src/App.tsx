import React from 'react'
import { css } from '@emotion/css'
import styles from './app.module.less'

const color: string = 'red'

const App = () => {
	return (
		<div>
			<div className="title">App, hello</div>
			<div
				className={css`
					padding: 32px;
					background-color: pink;
					&: hover {
						color: ${color};
					}
				`}
			>
				hello - emotion
			</div>
			<div className={styles.hello}>hello - css module</div>
		</div>
	)
}

export default App
