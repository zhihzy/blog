import React, { useState, useEffect } from 'react'
import { Divider } from 'antd'
import '../styles/components/advert.css'
import axios from 'axios'
import apiUrl from '../config/apiUrl'
import Router from 'next/router'
const Advert = () => {
    const [type, setType] = useState([])
    useEffect(() => {
        const getType = async () => {
            const result = await (axios(apiUrl.getTypeUrl)).then(res => {
                return res.data.data
            })
            setType(result)
        }
        getType()
    }, [])
    const doClick = id => {
        Router.push({
            pathname: '/list',
            query: { id },
        })
    }
    return (
        <div className="label comm_div">
            <div className="label-title">热门标签</div>
            <Divider />
            <ul className="label-ul">
                {
                    type.map((item, index) => {
                        return (
                            <li
                                onClick={() => { doClick(item.type_id) }}
                                key={index}><a><span className="label-item">{item.type_name}</span></a></li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default Advert