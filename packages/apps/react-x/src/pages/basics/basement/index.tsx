import React, { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import RenderMarkdown from '@/components/render-markdown'

const Basement = () => {
    const [sourceData, setSourceData] = useState('')

    useEffect(() => {
        fetch('http://localhost:3001/md/basement')
            .then((value) => value.text())
            .then((res) => {
                setSourceData(res)
            })
    }, [])

    return (
        <PageContainer title="基础内功">
            <RenderMarkdown mdText={sourceData} />
        </PageContainer>
    )
}

export default Basement
