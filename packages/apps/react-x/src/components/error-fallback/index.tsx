import React, { useCallback } from 'react'
import { Button, Result } from 'antd'
import type { FallbackProps } from 'react-error-boundary'

export const ErrorFallback = (props: FallbackProps) => {
	const { error } = props

	const onBackHome = useCallback(() => {
		window.location.href = '/home'
	}, [])

	return (
		<Result
			status="500"
			title={error.message}
			subTitle="请添加QQ: 1173039846 联系gsk获取帮助"
			extra={
				<Button type="primary" onClick={onBackHome}>
					返回首页
				</Button>
			}
		/>
	)
}
