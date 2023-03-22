import React from 'react'
import { Layout, Divider } from 'antd'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'

const TestIndex = () => (
    <Layout>
        <div>
            <CustomBreadcrumb></CustomBreadcrumb>
        </div>
        <div className='base-style'>第一次写</div>
    </Layout>
)

export default TestIndex
