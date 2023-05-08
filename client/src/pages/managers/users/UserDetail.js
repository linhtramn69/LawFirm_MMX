import { faHouse, faReceipt, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, Tabs, Descriptions, Space, Row, Col, Typography, Divider } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { avatar } from "~/assets/images";
import { userService } from '../../../services/index';

const items = [
    {
        key: '1',
        label: `Contacts`,
        children: `Content of Tab Pane 1`,
    },
    {
        key: '2',
        label: `Internal Notes`,
        children: `Internal Notes`,
    },
    {
        key: '3',
        label: `Sales and Purchases`,
        children: `Content of Tab Pane 3`,
    },
    {
        key: '4',
        label: `Account`,
        children: `Content of Tab Pane 4`,
    },
];
const defaultValue = ['customer', 'admin', 'staff']

function CustomerDetail() {

    let { id } = useParams();
    const [user, setUser] = useState({
        account: {
            sdt: '',
            mat_khau: ''
        },
        chuc_vu: {
            ten_chuc_vu: ''
        },
        bo_phan: {
            ten_bo_phan: ''
        }
    });

    useEffect(() => {
        const getUser = async () => {
            setUser((await userService.getById(id)).data)
        };
        getUser();
    }, [id]);

    return (
        <>
            <Card
                className="card-detail"
                title={
                    <Space split={<Divider type="vertical" />}>
                        <Typography.Link><FontAwesomeIcon icon={faHouse} /> Vụ việc</Typography.Link>
                        <Typography.Link><FontAwesomeIcon icon={faTasks} /> Hợp đồng</Typography.Link>
                        <Typography.Link><FontAwesomeIcon icon={faTasks} /> Báo giá</Typography.Link>
                        <Typography.Link><FontAwesomeIcon icon={faReceipt} /> Hóa đơn</Typography.Link>

                    </Space>
                }
                extra={
                    <Link to={`/admin/${defaultValue[user.account.quyen]}/edit/${id}`}>
                        <Button type="primary" className="btn-primary">EDIT</Button>
                    </Link>
                }
            >
                <Row>
                    <Col md={{ span: 20 }}>
                        <Descriptions title={user.ho_ten}
                            column={{
                                md: 4
                            }}>
                            <Descriptions.Item span={2} label="Ngày sinh">{user.ngay_sinh}</Descriptions.Item>
                            <Descriptions.Item span={2} label="Số điện thoại (di động)">{user.account.sdt}</Descriptions.Item>
                            <Descriptions.Item span={2} label="Email">{user.email}</Descriptions.Item>
                            <Descriptions.Item span={2} label="Địa chỉ">{user.dia_chi}</Descriptions.Item>
                            {user.account.quyen === 0 ?
                                <>
                                    <Descriptions.Item span={2} label="Nghề nghiệp">{user.nghe_nghiep}</Descriptions.Item>
                                    <Descriptions.Item span={2} label="Số điện thoại (doanh nghiệp)"></Descriptions.Item>
                                    <Descriptions.Item span={2} label="Website">{user.website_cong_ty} </Descriptions.Item>
                                </>
                                : user.account.quyen === 2 ?
                                    <>
                                        <Descriptions.Item span={2} label="Chức vụ">{user.chuc_vu.ten_chuc_vu}</Descriptions.Item>
                                        <Descriptions.Item span={2} label="Bộ phận">{user.bo_phan.ten_bo_phan}</Descriptions.Item>
                                    </>
                                    : null
                            }

                        </Descriptions>
                    </Col>
                    <Col>
                        <Avatar shape='square' size={150} src={user.loai_cong_ty === 'Doanh nghiệp' ? avatar.company : avatar.user} />
                    </Col>
                </Row>
                <Tabs defaultActiveKey="1" items={items} />
            </Card>
        </>
    );
}

export default CustomerDetail;