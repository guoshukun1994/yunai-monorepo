import React from 'react'
import { css } from '@emotion/css'
import styles from './app.module.less'

const color: string = 'white'

const App = () => {
	return (
		<div>
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
