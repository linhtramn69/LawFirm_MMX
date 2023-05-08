import { Button, Card, Col, Descriptions, Divider, Form, Input, InputNumber, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import Title from "antd/es/typography/Title";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { billService, matterService } from "~/services";
import { useToken } from "~/store";

function BillCreate() {
    const [form] = Form.useForm();
    const [bank, setBank] = useState([]);
    const [matter, setMatter] = useState()
    const { token } = useToken()
    let { id } = useParams()
    let navigate = useNavigate()
    useEffect(() => {
        const getMatter = async () => {
            setMatter((await matterService.getById(id)).data)
        }
        getMatter()
        axios('https://api.vietqr.io/v2/banks')
            .then(rs => {
                setBank(rs.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    const handleAdd = async (value) => {
        const result = (await billService.create(value)).data
        navigate(`/ke-toan/bill/${result.insertedId}`)
    }
    const onFinish = (values) => {
        const newVal = {
            nhan_vien_lap_hoa_don: token._id,
            vu_viec: matter._id,
            loai_hoa_don: 'KH',
            ngay_lap: new Date(),
            tai_khoan_khach: {
                ngan_hang: values.name_bank_khach,
                chu_tai_khoan: values.name_card_khach,
                so_tai_khoan: values.number_khach
            },
            tai_khoan_cong_ty: {
                ngan_hang: values.name_bank_cty,
                chu_tai_khoan: values.name_card_cty,
                so_tai_khoan: values.number_cty
            },
            tong_gia_tri: values.total
        }
        handleAdd(newVal)
    }
    return (
        <>
            <Card title="Tạo bút toán">
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    onFinish={onFinish}

                    autoComplete="off"
                >
                    
                    <Row>
                        <Col span={12}>
                            <Descriptions style={{ paddingLeft: 40 }}
                                title="Nhân viên thực hiện"
                                column={{
                                    md: 2,
                                }}>

                                <Descriptions.Item label="Họ tên">{token.ho_ten}</Descriptions.Item>
                                <Descriptions.Item label="Email">{token.email}</Descriptions.Item>
                                <Descriptions.Item label="Bộ phận">{token.bo_phan.ten_bo_phan}</Descriptions.Item>
                                <Descriptions.Item label="Chức vụ">{token.chuc_vu.ten_chuc_vu}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={12}>
                            {matter ? <Descriptions style={{ paddingLeft: 40 }}
                                title="Khách hàng"
                                column={{
                                    md: 2,
                                }}>

                                <Descriptions.Item label="Họ tên">{matter.khach_hang.ho_ten}</Descriptions.Item>
                                <Descriptions.Item label="Email">{matter.khach_hang.email}</Descriptions.Item>
                                <Descriptions.Item label="Số điện thoại">{matter.khach_hang.account.sdt}</Descriptions.Item>
                                <Descriptions.Item label="Nghề nghiệp">{matter.khach_hang.nghe_nghiep}</Descriptions.Item>
                            </Descriptions> : <></>}
                            
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={10} push={2}>
                            <Form.Item>
                                <Title level={5}>Tài khoản kết toán</Title>
                            </Form.Item>
                            <Form.Item
                                label="Ngân hàng"
                                name="name_bank_cty"
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
                                name="name_card_cty"
                            >
                                <Input
                                    style={{
                                        width: 250,
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Số tài khoản"
                                name="number_cty"
                            >
                                <Input
                                    style={{
                                        width: 250,
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Số tiền"
                                name="total">
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
                            <Form.Item>
                                <Title level={5}>Tài khoản bút toán</Title>
                            </Form.Item>
                            <Form.Item
                                label="Ngân hàng"
                                name="name_bank_khach"
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
                                name="name_card_khach"
                            >
                                <Input
                                    style={{
                                        width: 250,
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Số tài khoản"
                                name="number_khach"
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
                            offset: 20,
                            span: 6,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Tạo mới
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

        </>
    );
}

export default BillCreate;