import React from 'react'
import { Routes } from './routes'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-fallback'

const App = () => {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<Routes />
		</ErrorBoundary>
	)
}

export default App
