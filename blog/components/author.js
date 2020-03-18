import { Avatar, Tooltip } from 'antd'
import { GithubOutlined } from '@ant-design/icons';
import '../styles/components/author.css'
function Author() {
    return (
        <div className="author">
            <div className="author_avatar">
                <Avatar src="../../avatar.png" size={70} />
                <div>zhihzy</div>
            </div>
            <div className="author_text">路漫漫其修远兮 吾将上下而求索</div>
            <div className="author_gethub">
                <Tooltip title="Github">
                    <a><Avatar icon={<GithubOutlined />} size={20} /></a>
                </Tooltip>
            </div>
        </div>
    )
}
export default Author