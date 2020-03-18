import { useState } from 'react';
import dynamic from 'next/dynamic'
import { Row, Col, Breadcrumb, Affix } from 'antd'
import { CalendarOutlined, ReadOutlined, BookOutlined } from '@ant-design/icons'
import marked from 'marked'
import hljs from 'highlight.js'
import Tocify from '../components/tocif.tsx'
import 'highlight.js/styles/monokai-sublime.css'
const Header = dynamic(import('../components/header'))
const Author=dynamic(import('../components/author'))
const Advert=dynamic(import('../components/advert'))
import '../styles/pages/details.css'
import axios from 'axios';
import api from '../config/apiUrl'
const Details = (props) => {
    const [data, setData] = useState(props.data[0])
    const tocify = new Tocify()
    const renderer = new marked.Renderer()
    renderer.heading = (text, level) => {
        const anchor = tocify.add(text, level)
        return `<a id=${anchor} href="#${anchor}"><h${level} class="toc-h">${text}</h${level}></a>\n`
    }
    marked.setOptions({
        renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        highlight: code => {
            return hljs.highlightAuto(code).value
        }
    })
    let html = marked(props.data[0].content)
    let diHtml = marked(props.data[0].introduce)
    return (
        <div>
            <Header />
            <div className="index_main">
                <Row justify="center">
                    <Col className="details_div" xs={24} sm={24} md={18} lg={18} xl={13}>
                        <div className="bread_div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item><a href="/">{data.type_name}</a></Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="details_title">
                            {data.title}
                        </div>
                        <div className="details_icon">
                            <span><CalendarOutlined />{data.addTime}</span>
                            <span><BookOutlined />{data.type_name}</span>
                            <span><ReadOutlined />{data.count}</span>
                        </div>
                        <div className="details_content" dangerouslySetInnerHTML={{ __html: diHtml }}></div>
                        <div className="details_content" dangerouslySetInnerHTML={{ __html: html }}></div>
                    </Col>
                    <Col xs={0} sm={0} md={6} lg={5} xl={4}>
                        <Author />
                        <Advert />
                        <Affix offsetTop={-8}>
                            <div className="datailed-nav comm_div">
                                <div className="nav-title">文章目录</div>
                                {tocify && tocify.render()}
                            </div>
                        </Affix>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
Details.getInitialProps = async (context) => {
    let id = context.query.id
    const result = new Promise((resolve) => {
        axios(api.detailsUrl + id).then(res => {
            resolve(res.data)
        })
    })
    return await result
}
export default Details