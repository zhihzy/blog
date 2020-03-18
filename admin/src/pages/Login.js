import React, { useState, useEffect } from 'react'
import { Card, Input, Button, Spin, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import apiUrl from '../config/apiUrl'
import axios from 'axios'
import 'antd/dist/antd.css'
import '../styles/login.css'

function Login(props) {
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {

    }, [])
    const checkLogin = () => {
        if (userName === '') {
            message.warning('User name cannot be empty')
            return false
        } else if (userPassword === '') {
            message.warning('Password cannot be empty')
            return false
        }
        setIsLoading(true)
        axios({
            method: 'post',
            url: apiUrl.loginUrl,
            data: { userName, userPassword },
            withCredentials: true
        }).then(res => {
            if (res.data.msg === 1) {
                localStorage.setItem('openId', res.data.openId)
                props.history.push('/index')
            } else {
                message.error('账号或密码错误')
            }
        })
        setIsLoading(false)
    }
    return (
        <div className="login-div">
            <div className="login-input">
                <Spin tip="Loading..." spinning={isLoading}>
                    <Card title="zhihzy blog System" bordered={true} style={{ width: 350 }}>
                        <Input
                            placeholder="User name"
                            size="large"
                            prefix={<UserOutlined />}
                            onChange={(e) => { setUserName(e.target.value) }} />
                        <Input.Password
                            placeholder="User password"
                            size="large"
                            prefix={<LockOutlined />}
                            onChange={(e) => { setUserPassword(e.target.value) }} />
                        <Button
                            type="primary"
                            block
                            size="large"
                            onClick={checkLogin}>login in</Button>
                    </Card>
                </Spin>
            </div>
        </div>
    )
}
export default Login