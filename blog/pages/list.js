import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import marked from 'marked'
import axios from 'axios'
import api from '../config/apiUrl'
import Head from 'next/head'
import { Row, Col, List, Spin, Breadcrumb } from 'antd'
import { CalendarOutlined, FileOutlined, FireOutlined } from '@ant-design/icons'
import '../styles/pages/index.css'
const Header = dynamic(import('../components/header'))
const Author = dynamic(import('../components/author'))
const Loading = dynamic(import('../components/loading'))
const Advert = dynamic(import('../components/advert'))
const Footer = dynamic(import('../components/footer'))
const BlogList = (list) => {
    let [data, setData] = useState(list.data)
    const [isload, setIsLoad] = useState(false)
    useEffect(() => {
        setData(list.data)
    })
    const renderer = new marked.Renderer()
    marked.setOptions({
        renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
    })
    const jumpDetalis = id => {
        setIsLoad(true)
        Router.push({
            pathname: '/details',
            query: { id },
        })
    }
    return (
        <div>
            <Head>
                <title>zhihzy</title>
            </Head>
            <Header />
            <div className="index_main">
                <Row justify="center">
                    <Col xs={24} sm={24} md={18} lg={18} xl={13}>
                        <div>
                            <Spin spinning={isload}>
                                <List
                                    header={list.data[0] ? list.data[0].type_name : <Spin tip="数据还未写入..." />}
                                    bordered
                                    itemLayout="vertical"
                                    dataSource={data}
                                    pagination={{
                                        pageSize: 5
                                    }}
                                    renderItem={item => (
                                        <div className="cursor-hand" onClick={() => { jumpDetalis(item.id) }}>
                                            <List.Item>
                                                <div className="index_list_item">
                                                    <div className="list_title"><a>{item.title}</a></div>
                                                    <div className="list_info">
                                                        <Breadcrumb separator="|">
                                                            <Breadcrumb.Item>
                                                                <CalendarOutlined style={{ color: '#ccc' }} /><span className="b-span">{item.addTime.slice(0, 10)}</span>
                                                            </Breadcrumb.Item>
                                                            <Breadcrumb.Item>
                                                                <FileOutlined style={{ color: '#ccc' }} /><span className="b-span">{item.type_name}</span>
                                                            </Breadcrumb.Item>
                                                            <Breadcrumb.Item>
                                                                <FireOutlined style={{ color: '#ccc' }} /><span className="b-span">{item.count}</span>
                                                            </Breadcrumb.Item>
                                                        </Breadcrumb>
                                                    </div>
                                                    <div className="list_content b-span">{item.introduce}</div>
                                                </div>
                                            </List.Item>
                                        </div>
                                    )} />
                            </Spin>
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={6} lg={5} xl={4}>
                        <Author />
                        <Loading />
                        <Advert />
                    </Col>
                </Row>
                <Footer />
            </div>
        </div>
    )
}
BlogList.getInitialProps = async (context) => {
    let id = context.query.id
    if (id) {
        const result = new Promise((resolve) => {
            axios(api.getTypeInfoUrl + id).then(res => {
                resolve(res.data)
            })
        })
        return await result
    } else {
        const result = new Promise((resolve) => {
            axios(api.indexUrl).then(res => {
                resolve(res.data)
            })
        })
        return await result
    }
}
export default BlogList
