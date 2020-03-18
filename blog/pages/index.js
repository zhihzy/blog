import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import '../styles/pages/index.css'
import marked from 'marked'
import axios from 'axios'
import Head from 'next/head'
import { Row, Col, List } from 'antd'
const Header = dynamic(import('../components/header'))
const Author=dynamic(import('../components/author'))
const Advert=dynamic(import('../components/advert'))
const Footer=dynamic(import('../components/footer'))
import api from '../config/apiUrl'
const Home = (list) => {
  let [data, setData] = useState(list.data)
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
              <List
                itemLayout="vertical"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <div className="index_list_item">
                      <Link href={{ pathname: '/details', query: { id: item.id } }}>
                        <div className="list_title"><a>{item.title}</a></div>
                      </Link>
                      <div className="list_content" dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}></div>
                      <div className="list_info">
                        <span className="list_info_years">时间:{item.addTime}</span>
                      </div>
                    </div>
                  </List.Item>
                )} />
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
