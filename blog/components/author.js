import { Avatar, Tooltip, Divider } from 'antd'
import { GithubOutlined, WechatOutlined, QqOutlined } from '@ant-design/icons';
import '../styles/components/author.css'
function Author() {
    return (
        <div className="author">
            <div className="author_avatar">
                <Avatar src="../../avatar.png" size={70} />
                <div className="author_name">zhihzy</div>
            </div>
            <div className="author_text">路漫漫其修远兮 吾将上下而求索</div>
            <div className="author_gethub">
                <Divider>社交账号</Divider>
                <Tooltip className="account" title="Github">
                    <a><Avatar icon={<GithubOutlined />} size={29} /></a>
                </Tooltip>
                <Tooltip className="account" title="zhihzy1221">
                    <a><Avatar icon={<WechatOutlined />} size={29} /></a>
                </Tooltip>
                <Tooltip className="account" title="981203272">
                    <a><Avatar icon={<QqOutlined />} size={29} /></a>
                </Tooltip>
            </div>
        </div>
    )
}
export default Author