import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import { DesktopOutlined, EditOutlined, FileAddOutlined, MessageOutlined, BookOutlined } from '@ant-design/icons';
import AddArticle from './AddArticle';
import ArticleList from './ArticleList';
import UpadteArticle from './UpdateArticle';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const Index = (props) => {
    const [collapsed,setCollapsed]=useState(false)
    const jumpKey = e => {
        if(e.key==='add'){
            props.history.push('/index/add')
        }else if(e.key==='update'){
            props.history.push('/index/update')
        }else{
            props.history.push('/index/list')
        }
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(e)=>{setCollapsed(e)}}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" onClick={()=>{ props.history.push('/index')}}>
                        <DesktopOutlined />
                        <span>工作台</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={<span><BookOutlined /><span>文章管理</span></span>}
                        onClick={jumpKey}>
                        <Menu.Item key="add">
                            <FileAddOutlined />添加
                        </Menu.Item>
                        <Menu.Item key="list">
                            <EditOutlined />修改
                            </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={<span>
                            <MessageOutlined />
                            <span>留言管理</span>
                        </span>}>
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {/* <Breadcrumb.Item>工作台</Breadcrumb.Item> */}
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Route path='/index' exact component={AddArticle} />
                        <Route path='/index/add' exact component={AddArticle} />
                        <Route path='/index/update/:id' component={UpadteArticle} />
                        <Route path='/index/list' component={ArticleList} />
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}
export default Index