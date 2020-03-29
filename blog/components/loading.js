import React, { } from 'react'
import { Spin,Skeleton } from 'antd';

const Loading = () => {
    return (
        <div className="loading comm_div">
            <Spin tip="Loading...">
                <Skeleton active />
            </Spin>
        </div>
    )
}
export default Loading