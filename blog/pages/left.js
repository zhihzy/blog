import React, { useEffect } from 'react'
import { Row, Col, List } from 'antd'
import Head from 'next/head'
import dynamic from 'next/dynamic'
const Header = dynamic(import('../components/header'))
const Author = dynamic(import('../components/author'))
const Loading = dynamic(import('../components/loading'))
const Advert = dynamic(import('../components/advert'))
const Footer = dynamic(import('../components/footer'))

const Left = () => {
    useEffect(()=>{},[])
    return (
        <div>
            <Head>
                <title>zhihzy</title>
            </Head>
            <Header />
            <div className="index_main">
                <Row justify="center">
                    <Col xs={24} sm={24} md={18} lg={18} xl={13}>
                        <List header="日常生活" bordered />
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
export default Left