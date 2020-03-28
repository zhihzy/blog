import React, { useState } from 'react'
import { Divider } from 'antd'
import '../styles/components/advert.css'
const Advert = () => {
    const [data, setDate] = useState([
        '前端', '后端', 'css', 'html', 'vue', 'react', 'node', 'mysql', 'webpack'
    ])
    return (
        <div className="label comm_div">
            <div className="label-title">热门标签</div>
            <Divider />
            <ul className="label-ul">
                {
                    data.map((item, index) => {
                        return (
                            <li key={index}><a><span className="label-item">{item}</span></a></li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default Advert