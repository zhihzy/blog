import React, { useState } from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
// import Link from 'next/link'
import '../styles/pages/index.css'
import marked from 'marked'
import axios from 'axios'
import Head from 'next/head'
import { Row, Col, List, Spin, Breadcrumb } from 'antd'
import { CalendarOutlined, FileOutlined, FireOutlined } from '@ant-design/icons'
const Header = dynamic(import('../components/header'))
const Author = dynamic(import('../components/author'))
const Advert = dynamic(import('../components/advert'))
const Footer = dynamic(import('../components/footer'))
import api from '../config/apiUrl'
const Home = (list) => {
  let [data, setData] = useState(list.data)
  const [isload, setIsLoad] = useState(false)
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
                  header="推荐文章"
                  bordered
                  itemLayout="vertical"
                  dataSource={data}
                  renderItem={item => (
                    <div className="cursor-hand" onClick={() => { jumpDetalis(item.id) }}>
                      {/* <Link href={{ pathname: '/details', query: { id: item.id } }}> */}
                      <List.Item>
                        <div className="index_list_item">
                          <div className="list_title"><a>{item.title}</a></div>
                          <div className="list_info">
                            <Breadcrumb separator="|">
                              <Breadcrumb.Item>
                                <CalendarOutlined style={{ color: '#ccc' }} /><span className="b-span">{item.addTime.slice(0, 10)}</span>
                              </Breadcrumb.Item>
                              <Breadcrumb.Item>
                                <FileOutlined style={{ color: '#ccc' }} /><span className="b-span">文章</span>
                              </Breadcrumb.Item>
                              <Breadcrumb.Item>
                                <FireOutlined style={{ color: '#ccc' }} /><span className="b-span">{item.count}</span>
                              </Breadcrumb.Item>
                            </Breadcrumb>
                          </div>
                          <div className="list_content b-span">{item.introduce}</div>
                        </div>
                      </List.Item>
                      {/* </Link> */}
                    </div>
                  )} />
              </Spin>
            </div>
          </Col>
          <Col xs={0} sm={0} md={6} lg={5} xl={4}>
            <Author />
            <Advert />
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  )
}
Home.getInitialProps = async () => {
  const result = new Promise((resolve) => {
    axios(api.indexUrl).then(res => {
      resolve(res.data)
    })
  })
  return await result
}
export default Home
