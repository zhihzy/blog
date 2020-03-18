import React, { useState, useEffect, useRef, useCallback } from 'react'
import marked from 'marked'
import '../styles/addArticle.css'
import { Button, Row, Col, Input, DatePicker, TimePicker, Select, message } from 'antd'
import moment from 'moment';
import axios from 'axios'
import apiUrl from '../config/apiUrl'
const { Option } = Select
const { TextArea } = Input
function UpadteArticle(props) {
    const
        [articleId, setarticleId] = useState(0), //文章id，0说明新增，不是说明修改
        [articleTitle, setarticleTitle] = useState(''), //文章标题
        [articleContent, setarticleContent] = useState(''),//编辑内容
        [markdownContent, setMarkdownContent] = useState('预览内容'),//markdown内容
        [introducemd, setIntroducemd] = useState(),//简介内容
        [introducehtml, setIntroducehtml] = useState(),//简介markdown内容
        [insertDate, setInsertDate] = useState(''),
        [showDate, setShowDate] = useState(),//发布日期
        [showTime, setShowTime] = useState(),//发布时间
        [typeInfo, setTypeInfo] = useState([]),//文章类别
        [selectdeType, setSelectdeType] = useState('文章类别')//选择文章类别
    useEffect(() => {
        let id = props.match.params.id
        getTypeInfo()
        setarticleId(id)
        getUpdateArticleData(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const _scroll=useCallback(e=>{
        let top=e.target.scrollTop
        right.current.scrollTop = top
    },[])
    const right = useRef(null)
    const left = useRef(null)
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });
    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: apiUrl.typeUrl,
            withCredentials: true
        }).then(res => {
            if (res.data.msg === -1) {
                localStorage.removeItem('openId')
                props.history.push('/')
            } else {
                setTypeInfo(res.data.data)
            }
        })
    }
    //marked
    const changeContent = (e) => {
        setarticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }
    const changeIntroducemd = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }
    //提交文章
    const saveArticle = () => {
        let data = {}
        data.title = articleTitle
        data.type_id = selectdeType
        data.content = articleContent
        data.introduce = introducemd
        let dateText = insertDate.replace('-', '/')
        // let dateTime = dateText + ' ' + showTime
        data.addTime = (new Date(dateText).getTime()) / 1000
        data.id = articleId
        axios({
            method: 'put',
            url: apiUrl.updateArticleUrl,
            data,
            withCredentials: true
        }).then(res => {
            if (res.data.updateSuccess) {
                message.success('修改成功')
                props.history.push('/index/list')
            } else {
                message.success('修改失败')
            }
        })
    }
    //根据id跳转过来修改数据
    const getUpdateArticleData = id => {
        axios(apiUrl.updateByIdUrl + id, { withCredentials: true }).then(res => {
            let data = res.data.data[0]
            setarticleTitle(data.title)
            setarticleContent(data.content)
            let html = marked(data.content)
            setMarkdownContent(html)
            setIntroducemd(data.introduce)
            let biHtml = marked(data.introduce)
            setIntroducehtml(biHtml)
            setInsertDate(data.addTime)
            setSelectdeType(data.type_id)
            let parseDate = data.addTime.trim().split(" ")
            setShowDate(parseDate[0])
            setShowTime(parseDate[1])
        })
    }
    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row className="article-title" gutter={5}>
                        <Col span={18}>
                            <Input
                                value={articleTitle}
                                className="border-radius"
                                placeholder="文章标题"
                                onChange={(e) => { setarticleTitle(e.target.value) }} />
                        </Col>
                        <Col span={4}>
                            <Select
                                defaultValue={selectdeType}
                                onChange={(value) => { setSelectdeType(value) }}>
                                {
                                    typeInfo.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.type_id}>
                                                {item.type_name}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={5}>
                        <Col span={12}>
                            <TextArea
                                onScroll={_scroll}
                                ref={left}
                                value={articleContent}
                                className="border-radius    "
                                rows={24}
                                placeholder="文章内容"
                                onChange={changeContent} />
                        </Col>
                        <Col span={12}>
                            <div
                                ref={right}
                                className="border-radius show-markdown"
                                dangerouslySetInnerHTML={{ __html: markdownContent }}>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <div className="article-btn">
                        <Button>暂存文章</Button>&nbsp;
                        <Button onClick={saveArticle} type="primary">修改文章</Button>
                    </div>
                    <TextArea
                        value={introducemd}
                        className="border-radius"
                        rows={3}
                        placeholder="文章简介"
                        onChange={changeIntroducemd} />
                    <div
                        className="introduce-html border-radius"
                        dangerouslySetInnerHTML={{ __html: introducehtml }}></div>
                    <DatePicker
                        placeholder="发布日期"
                        defaultValue={moment(showDate, 'YYYY-MM-DD')}
                        disabled />&nbsp;
                        <TimePicker
                        placeholder="发布时间"
                        defaultValue={moment(showTime, 'HH:mm:ss')}
                        disabled />
                </Col>
            </Row>
        </div>
    )
}
export default UpadteArticle