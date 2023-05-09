import { faHouse, faReceipt, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, Tabs, Descriptions, Space, Row, Col, Typography, Divider, Image, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { avatar } from "~/assets/images";
import { degreeService, userService } from '../../../services/index';
import { useStore } from "~/store";
import moment from "moment";

const columnsDegree = [
    {
        title: 'Mã BC/CC',
        dataIndex: 'id',
        width: 200
    },
    {
        title: 'Loại BC/CC',
        dataIndex: 'type',
        width: 400
    },
    {
        title: 'Ngày cấp',
        dataIndex: 'date',
        width: 200
    },
    {
        title: 'Thời hạn',
        dataIndex: 'dateEnd',
        width: 200
    },
    {
        title: '',
        dataIndex: '',
        width: 130,
        render: (_, record) => (
            <p 
            onClick={() => detail(record)}
            style={{
                color: "#1677ff",
                cursor: 'pointer'
            }}
            >
                Xem chi tiết</p>
        )
    },
];
const detail = (data) => Modal.info({
    title: 'Thông tin chi tiết Bằng cấp / Chứng chỉ',
    content: (
        <>
            <Descriptions
                column={{
                    lg: 4,
                    md: 4,
                    sm: 2,
                }}
            >
                <Descriptions.Item span={4} label="Mã BC/CC">{data.id}</Descriptions.Item>
                <Descriptions.Item span={4} label="Loại BC/CC">{data.type}</Descriptions.Item>
                <Descriptions.Item span={4} label="Ngày cấp">{data.date}</Descriptions.Item>
                <Descriptions.Item span={4} label="Thời hạn">{data.dateEnd}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Image width={100} src={data.img}/>
        </>
    ),
    onOk() { },
})

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
    const [degrees, setDegrees] = useState([]);
    const [dataDegree, setDegree] = useState([])

    useEffect(() => {
        const getUser = async () => {
            setUser((await userService.getById(id)).data)
        };
        const getDegree = async () => {
            const rs = (await degreeService.findByStaff(id)).data
            const data = rs.map((value) => {
                return {
                    id: value._id,
                    type: value.loai,
                    date: moment(value.ngay_cap).format('DD-MM-YYYY'),
                    dateEnd: value.thoi_han
                }
            })
            setDegree(data)
        }
        getUser();
        getDegree();
    }, [id]);

    const items = [
        {
            key: '1',
            label: `Bằng cấp / Chứng chỉ`,
            children: <Table columns={columnsDegree} dataSource={dataDegree} />,
        },
    ];
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
                    <Image width={150} src={user.avatar ? user.avatar : avatar.company}/>
                    </Col>
                </Row>
                <Tabs defaultActiveKey="1" items={items} />
            </Card>
        </>
    );
}

export default CustomerDetail;