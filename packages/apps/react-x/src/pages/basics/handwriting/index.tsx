import React, { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import RenderMarkdown from '@/components/render-markdown'

const Handwriting = () => {
    const [sourceData, setSourceData] = useState('')

    useEffect(() => {
        fetch('http://localhost:3001/md/handwriting')
            .then((value) => value.text())
            .then((res) => {
                setSourceData(res)
            })
    }, [])

    return (
        <PageContainer title="手写题">
            <RenderMarkdown mdText={sourceData} />
        </PageContainer>
    )
}

export default Handwriting
