import React from 'react'
import '../styles/components/header.css'
import { Row, Col, Menu } from 'antd'
import { HomeOutlined, CameraOutlined, ReadOutlined } from '@ant-design/icons';

function Header() {
    return (
        <div className="header">
            <Row justify="center">
                <Col xs={24} sm={24} md={16} lg={17} xl={12}>
                    <span className="header_name">zhihzy</span>
                    <span className="header_text">分享学习经验，记录生活！</span>
                </Col>
                <Col xs={0} sm={0} md={8} lg={6} xl={5}>
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="home">
                            <a href="/"><HomeOutlined />首页</a>
                        </Menu.Item>
                        <Menu.Item key="article">
                            <a href="/list"><ReadOutlined />文章</a>
                        </Menu.Item>
                        <Menu.Item key="life">
                            <a href="/left"> <CameraOutlined />生活</a>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}
export default Header