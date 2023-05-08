import { Avatar, Card, List } from "antd";
import { Link } from "react-router-dom";
import { service } from "~/assets/images";
function Sidebar() {
    const headStyle = {
        backgroundColor: `var(--dark-blue)`,
        textAlign: 'center',
        color: 'white',
        letterSpacing: '1px',
        fontWeight: '500',
        textTransform: 'uppercase'
    }
    return (
        <>
            <div className="sidebar-info">
                <button className="btn-card">Xem chi tiết</button>
            </div>
            <Card className="card-list-service" title="Dịch vụ luật sư" headStyle={headStyle}>
                <List
                    itemLayout="horizontal"
                    dataSource={service}
                    renderItem={(item, index) => (
                        <List.Item className="">
                            <List.Item.Meta
                            className="list-item-card"
                                avatar={<Avatar src={item.img} />}
                                title={<Link to='/'>{item.title}</Link>}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </>
    );
}

export default Sidebar;