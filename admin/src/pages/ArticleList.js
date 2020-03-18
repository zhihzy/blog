import React, { useState, useEffect } from 'react'
import { Row, Col, List, Button, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import '../styles/deleteList.css'
import axios from 'axios'
import apiUrl from '../config/apiUrl'

const { confirm } = Modal
function ArticleList(props) {
    const [list, setList] = useState([])
    useEffect(() => {
        getList()
    }, [])
    const getList = () => {
        axios({
            method: 'get',
            url: apiUrl.getListUrl,
            withCredentials: true
        }).then(res => {
            let dataList = res.data.data
            setList(dataList)
        })
    }
    const deleteItem = id => {
        confirm({
            title: 'Are you sure to delete',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                axios({
                    method: 'delete',
                    url: apiUrl.deleteItemUrl + id,
                    withCredentials: true
                }).then(res => {
                    if (res.data.msg === 1) {
                        message.success('删除成功')
                        getList()
                    } else {
                        message.success('删除失败')
                    }
                })
            },
            onCancel() { }
        })
    }
    const updateById = id => {
        props.history.push('/index/update/'+id)
    }
    return (
        <div>
            <List header={<Row>
                <Col span="7"><b>标题</b></Col>
                <Col span="4"><b>类别</b></Col>
                <Col span="4"><b>浏览量</b></Col>
                <Col span="5"><b>发布时间</b></Col>
                <Col span="4"><b>操作</b></Col>
            </Row>}
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-item">
                            <Col span="7" className="item-title">{item.title}</Col>
                            <Col span="4">{item.type_name}</Col>
                            <Col span="4">{item.count}</Col>
                            <Col span="5">{item.addTime}</Col>
                            <Col span="4">
                                <Button onClick={()=>{ updateById(item.id) }}>修改</Button>&nbsp;
                                <Button onClick={() => { deleteItem(item.id) }} type="danger">删除</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )} />
        </div>
    )
}
export default ArticleList