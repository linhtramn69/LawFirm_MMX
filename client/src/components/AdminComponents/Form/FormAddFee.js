import { Button, Form, Modal, Popconfirm, Select, Table, Divider, InputNumber, Input, Row, Col, Tag, Descriptions } from "antd";
import { useEffect, useState } from "react";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import Title from "antd/es/typography/Title";
import { useStore, useToken } from "~/store";
import axios from "axios";
import { Option } from "antd/es/mentions";
import { feeService } from "~/services";
import { DeleteOutlined } from '@ant-design/icons';
import {UploadImg, fileSelected} from "../UploadImg";
import moment from "moment";
dayjs.extend(customParseFormat);
const statusText = ['Đã trình', 'Đã duyệt', 'Đã kết toán', 'Đã huỷ'];

function FormAddFee() {
    const [form] = Form.useForm();
    const { token } = useToken();
    const [state, dispatch] = useStore();
    const [dataSource, setDataSource] = useState([]);
    const [fee, setFee] = useState([]);
    const [bank, setBank] = useState([]);
    const [open, setOpen] = useState(false);
    let data = [];

    useEffect(() => {
        axios('https://api.vietqr.io/v2/banks')
            .then(rs => {
                setBank(rs.data.data);
            })
            .catch(err => {
                console.log(err);
            })
        const getChiPhiPhatSinh = async () => {
            setFee((await feeService.findByMatter({ id: state.matter._id })).data)
        }
        getChiPhiPhatSinh()
    }, [])
    useEffect(() => {
        if (fee.length > 0) {
            data = fee.map((value, index) => {
                return {
                    key: index,
                    _id: value._id,
                    ngay_lap: moment(value.ngay_lap).format('DD-MM-YYYY LTS'),
                    mo_ta: value.mo_ta,
                    idHD: value.so_hoa_don,
                    staff: value.nhan_vien.ho_ten,
                    status: value.status,
                    don_gia: `${value.don_gia}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ',
                    nameBank: value.tai_khoan.ngan_hang,
                    nameCreditCard: value.tai_khoan.chu_tai_khoan,
                    numberCreditCard: value.tai_khoan.so_tai_khoan,
                }
            })
        }
        setDataSource(data);
    }, [fee])

    const handleDelete = async (value) => {
        try {
            (await feeService.delete(value));
            const newData = dataSource.filter((item) => item._id !== value);
            setDataSource(newData);
        } catch (err) {
            console.log(err);
        }
    }
    const handleAdd = async (values) => {
        try {
            let result = (await feeService.create(values)).data;
            const feeNew = (await feeService.getById(result.insertedId)).data;
            setFee([...fee, feeNew]);
            setOpen(false);
        }
        catch (err) {
            console.log(err);
        }
    }
    const onFinish = (values) => {
        const newVal = {
            ngay_lap: new Date(),
            mo_ta: values.mo_ta,
            don_gia: values.don_gia,
            so_hoa_don: values.idHD,
            vu_viec: state.matter._id,
            nhan_vien: token._id,
            status: 0,
            tai_khoan: {
                ngan_hang: values.nameBank,
                chu_tai_khoan: values.nameCreditCard,
                so_tai_khoan: values.numberCreditCard
            },
            hinh_anh: fileSelected

        }
        form.resetFields();
        handleAdd(newVal);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const columns = [
        {
            title: 'Ngày lập',
            dataIndex: 'ngay_lap',
            width: 200
        },
        {
            title: 'Mô tả',
            dataIndex: 'mo_ta',
            width: 400
        },
        {
            title: 'Nhân viên',
            dataIndex: 'staff',
            width: 300
        },
        {
            title: 'Tổng',
            dataIndex: 'don_gia',
            width: 200
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status) => (
                <Tag
                    color={status === 0 ? 'volcano' : status === 1 ? 'geekblue' : status === 2 ? 'success' : 'error'}
                >
                    {statusText[status]}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            dataIndex: 'operation',
            width: 100,
            render: (_, record) => (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
                        <Button><DeleteOutlined /></Button>
                    </Popconfirm>
            )
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
        title: 'Chi tiết hoá đơn',
        content: (
            <>
                <Descriptions
                    column={{
                        lg: 4,
                        md: 4,
                        sm: 2,
                    }}
                    title={detail.loai_lich}
                >
                    <Descriptions.Item span={4} label="Mô tả">{data.mo_ta}</Descriptions.Item>
                    <Descriptions.Item span={4} label="Đơn giá">{data.don_gia}</Descriptions.Item>
                    <Descriptions.Item span={4} label="Mã số hoá đơn">{data.idHD}</Descriptions.Item>
                    <Descriptions.Item span={4} label="Ngày lập hoá đơn">{data.ngay_lap}</Descriptions.Item>
                    <Descriptions.Item span={4} label="Trạng thái">{statusText[data.status]}</Descriptions.Item>
                    <Descriptions.Item span={4} label="Ngân hàng">{data.nameBank}</Descriptions.Item>
                    <Descriptions.Item span={4} label="Tên tài khoản">{data.nameCreditCard}</Descriptions.Item>
                    <Descriptions.Item span={4} label="Số tài khoản">{data.numberCreditCard}</Descriptions.Item>
                </Descriptions>
                <Divider />
            </>
        ),
        onOk() { },
    })

    return (
        <>
            <Button type="primary" onClick={() => { setOpen(true) }}
            >
                Thêm mới
            </Button>
            <Modal
                title={
                    <>
                        <Title level={4}>Thêm công việc</Title>
                        <Divider />
                    </>
                }
                centered
                open={open}
                footer={null}
                width={1000}
                onCancel={() => setOpen(false)}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 1000,
                    }}
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    fields={
                        state.matter._id ? [
                        {
                            name: ['matter'],
                            value: state.matter.ten_vu_viec
                        },
                        {
                            name: ['staff'],
                            value: state.matter.luat_su.ho_ten
                        },
                        {
                            name: ['customer'],
                            value: state.matter.khach_hang.ho_ten
                        }
                    ] : null}
                >
                    <Row>
                        <Col span={24} pull={4}>
                            <Form.Item
                                label="Mô tả"
                                name="mo_ta"
                            >
                                <Input placeholder="VD: Ăn trưa với khách hàng A" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10} push={1}>
                            <Form.Item
                                label="Tổng tiền"
                                name="don_gia"
                            >
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
                            <Form.Item
                                label="Mã / Số hóa đơn"
                                name="idHD"
                            >
                                <Input
                                    style={{
                                        width: 250,
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={10} push={2}>
                            <Form.Item
                                label="Vụ việc"
                                name="matter"
                            >
                                <Input
                                    style={{
                                        width: 250,
                                    }}
                                    disabled='true'
                                />
                            </Form.Item>
                            <Form.Item
                                label="Nhân viên"
                                name="staff"
                            >
                                <Input
                                    style={{
                                        width: 250,
                                    }}
                                    disabled='true'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={10} push={2}>
                            <Form.Item>
                                <Title level={5}>Tài khoản bồi hoàn</Title>
                            </Form.Item>
                            <Form.Item
                                label="Ngân hàng"
                                name="nameBank"
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
                                name="nameCreditCard"
                            >
                                <Input
                                    style={{
                                        width: 250,
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Số tài khoản"
                                name="numberCreditCard"
                            >
                                <Input
                                    style={{
                                        width: 250,
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={10} push={4}>
                        <Form.Item>
                                <Title level={5}>Hình ảnh minh chứng</Title>
                            </Form.Item>
                            <UploadImg/>
                        </Col>
                    </Row>
                    <Divider />
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
            <Table dataSource={dataSource} columns={columns} />
        </>
    );
}

export default FormAddFee;