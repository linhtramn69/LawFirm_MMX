import { Card, Col, Descriptions, message, Divider, Row, Space, Popconfirm, Badge, Button, Modal, Form, Input, Select, InputNumber } from "antd";
import { faCircleCheck, faMoneyBillTransfer, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import axios from "axios";
import { billService, feeService, matterService } from "~/services";
import { useState, useEffect} from "react";
import { actions, useStore, useToken } from "~/store";
import moment from "moment";
import Title from "antd/es/typography/Title";
import { Option } from "antd/es/mentions";
import TextArea from "antd/es/input/TextArea";
const arrTypeBill = [
    {
        value: 'NB',
        label: 'Nội bộ'
    },
    {
        value: 'KH',
        label: 'Khách hàng'
    },
]

function FeeDetail() {

    let { id } = useParams();
    const [state, dispatch] = useStore();
    const [fee, setFee] = useState({})
    const { token } = useToken()
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [bank, setBank] = useState([]);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOpen = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Cập nhật hoá đơn thành công',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Cập nhật hoá đơn có lỗi',
        });
    };

    useEffect(() => {
        const getFee = async () => {
            setFee((await feeService.getById(id)).data)
        }
        getFee()
        axios('https://api.vietqr.io/v2/banks')
            .then(rs => {
                setBank(rs.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    useEffect(() => {
        const getMatter = async () => {
            const result = (await matterService.getById(fee.vu_viec)).data
            dispatch(actions.setMatter(result))
        }
        getMatter()
    }, [fee])

    const handleOk = async (value) => {
        try {
            const rs = (await feeService.update(id, { status: value })).data
            success()
            setFee(rs)
        }
        catch (err) {
            error()
        }
    }
    const handleAddBill = async (values) => {
        try {
            let result = (await billService.create(values)).data;
            const rs = (await feeService.update(id, { status: 2 })).data;
            setFee(rs);
            setIsModalOpen(false);
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleSubmit = async (value) => {
        const data = {
            ngay_lap: new Date(),
            nhan_vien_lap_hoa_don: token._id,
            loai_hoa_don: value.type_bill,
            vu_viec: state.matter._id,
            chi_phi_phat_sinh: fee._id,
            tong_gia_tri: value.total,
            ghi_chu: value.note,
            tai_khoan_cong_ty: {
                ngan_hang: value.name_bank_kt,
                chu_tai_khoan: value.name_card_kt,
                so_tai_khoan: value.number_kt
            },
            tai_khoan_khach: {
                ngan_hang: value.name_bank_bh,
                chu_tai_khoan: value.name_card_bh,
                so_tai_khoan: value.number_bh
            },
            status: 2
        } 
        handleAddBill(data);
    }
    
    return (
        <>
            {contextHolder}
            {fee.nhan_vien && state.matter._id ?
                <Card
                    title={
                        fee.status === 0 ? <Badge status="processing" text="Đang chờ xử lý" />
                            : fee.status === 1 ? <Badge status="warning" text="Đã duyệt" />
                                : fee.status === 2 ? <Badge status="success" text="Đã kết toán" />
                                    : <Badge status="error" text="Đã từ chối" />
                    }
                    extra={
                        <Space>
                            {
                                fee.status === 0 ?
                                    <>
                                        <Popconfirm
                                            placement="topRight"
                                            title="Bạn có chắc duyệt hoá đơn ?"
                                            okText="Xác nhận"
                                            cancelText="Hủy"
                                            onConfirm={() => handleOk(1)}
                                        >
                                            <Button
                                                className="btn btn-status"
                                                icon={<FontAwesomeIcon
                                                    style={{
                                                        color: '#389e0d',
                                                        marginRight: 10
                                                    }} icon={faCircleCheck} />}>Duyệt chi phí</Button>
                                        </Popconfirm>
                                        <Popconfirm
                                            placement="topRight"
                                            title="Bạn có chắc từ chối duyệt hoá đơn này ?"
                                            okText="Xác nhận"
                                            cancelText="Hủy"
                                            onConfirm={() => handleOk(3)}
                                        >
                                            <Button
                                                className="btn btn-status"
                                                icon={<FontAwesomeIcon
                                                    style={{
                                                        color: '#e31616',
                                                        marginRight: 10
                                                    }} icon={faXmark} />}>Huỷ chi phí</Button>
                                        </Popconfirm>
                                    </>

                                    : fee.status === 1 ?
                                        <>
                                            <Button
                                                className="btn btn-status"
                                                onClick={showModal}
                                                icon={<FontAwesomeIcon
                                                    style={{
                                                        color: '#e31616',
                                                        marginRight: 10
                                                    }} icon={faMoneyBillTransfer} />}>Tạo hoá đơn</Button>
                                            <Popconfirm
                                                placement="topRight"
                                                title="Bạn có chắc từ chối duyệt hoá đơn này ?"
                                                okText="Xác nhận"
                                                cancelText="Hủy"
                                                onConfirm={() => handleOk(3)}
                                            >
                                                <Button
                                                    className="btn btn-status"
                                                    icon={<FontAwesomeIcon
                                                        style={{
                                                            color: '#e31616',
                                                            marginRight: 10
                                                        }} icon={faXmark} />}>Huỷ hoá đơn</Button>
                                            </Popconfirm>
                                        </>
                                        : null
                            }
                        </Space>
                    }
                >
                    <Descriptions style={{ paddingLeft: 40 }} column={{
                        md: 3,
                    }}>

                        <Descriptions.Item label="Tên vụ việc">{state.matter.ten_vu_viec}</Descriptions.Item>
                        <Descriptions.Item label="Lĩnh vực">{state.matter.linh_vuc.ten_linh_vuc}</Descriptions.Item>
                        <Descriptions.Item label="Dịch vụ">{state.matter.dich_vu.ten_dv}</Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    <Row>
                        <Col md={{ span: 10, push: 1 }}>
                            <Descriptions
                                title="Chi tiết chi phí phát sinh"
                                column={{
                                    md: 4
                                }}>
                                <Descriptions.Item span={4} label="Nhân viên">{fee.nhan_vien.ho_ten}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Mô tả">{fee.mo_ta}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Đơn giá">{fee.don_gia}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Ngày lập">{moment(fee.ngay_lap).format('DD-MM-YYYY LT')}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Mã số hoá đơn">{fee.so_hoa_don}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col md={{ span: 10, push: 3 }}>
                            <Descriptions
                                title="Thông tin tài khoản bồi hoàn"
                                column={{
                                    md: 4
                                }}>

                                <Descriptions.Item span={4} label="Ngân hàng">{fee.tai_khoan.ngan_hang}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Tên chủ tài khoản">{fee.tai_khoan.chu_tai_khoan}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Số tài khoản">{fee.tai_khoan.so_tai_khoan}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                    <Divider />
                </Card>
                : null}
            <Modal width={1000} title="Hoá đơn mới" open={isModalOpen} onOk={handleOpen} onCancel={handleCancel} footer={null}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 1000,
                        marginTop: 30
                    }}
                    fields={   
                        fee && fee.tai_khoan ? [
                        {
                            name: 'staff',
                            value: token.ho_ten
                        },
                        {
                            name: 'total',
                            value: fee.don_gia
                        },
                        {
                            name: 'name_bank_bh',
                            value: fee.tai_khoan.ngan_hang
                        },
                        {
                            name: 'name_card_bh',
                            value: fee.tai_khoan.chu_tai_khoan
                        },
                        {
                            name: 'number_bh',
                            value: fee.tai_khoan.so_tai_khoan
                        },
                    ]
                : null}
                    autoComplete="off"
                    onFinish={handleSubmit}
                >
                    <Row>
                        <Col span={10} push={2}>
                            <Form.Item
                                label="Nhân viên"
                                name="staff"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='total'
                                label="Tổng tiền">
                                <InputNumber
                                    style={{
                                        width: 250
                                    }}
                                    min={1}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    addonAfter="đ"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={10} push={2}>
                            <Form.Item
                                name='type_bill'
                                label="Loại hoá đơn">
                                <Select options={arrTypeBill} />
                            </Form.Item>
                            <Form.Item
                                name='note'
                                label="Ghi chú">
                                <TextArea />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={10} push={2}>
                            <Form.Item>
                                <Title level={5}>Tài khoản kết toán</Title>
                            </Form.Item>
                            <Form.Item
                                label="Ngân hàng"
                                name="name_bank_kt"
                            >
                                <Select>
                                    {bank.map((value, index) => {
                                        return (
                                            <Option
                                                value={value.code + ' - ' + value.name}
                                                key={index}>
                                                {value.code + ' - ' + value.name}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Tên tài khoản"
                                name="name_card_kt"
                            >
                                <Input
                                    style={{
                                        width: 250,
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Số tài khoản"
                                name="number_kt"
                            >
                                <Input
                                    style={{
                                        width: 250,
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={10} push={2}>
                            <Form.Item>
                                <Title level={5}>Tài khoản bồi hoàn</Title>
                            </Form.Item>
                            <Form.Item
                                label="Ngân hàng"
                                name="name_bank_bh"
                            >
                                <Select>
                                    {bank.map((value, index) => {
                                        return (
                                            <Option
                                                value={value.code + ' - ' + value.name}
                                                key={index}>
                                                {value.code + ' - ' + value.name}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Tên tài khoản"
                                name="name_card_bh"
                            >
                                <Input
                                    style={{
                                        width: 250,
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Số tài khoản"
                                name="number_bh"
                            >
                                <Input
                                    style={{
                                        width: 250,
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        wrapperCol={{
                            offset: 18,
                            span: 6,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Tạo mới
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default FeeDetail;