import { Button, Col, Divider, Form, Input, InputNumber, Modal, Row, Select } from "antd";
import { Option } from "antd/es/mentions";
import Title from "antd/es/typography/Title";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { feeService } from "~/services";
import { actions, useStore, useToken } from "~/store";

function ModalAddFee(props) {

    const { token } = useToken();
    const [state, dispatch] = useStore();
    const [form] = Form.useForm();
    const [bank, setBank] = useState([]);

    useEffect(() => {
        axios('https://api.vietqr.io/v2/banks')
            .then(rs => {
                setBank(rs.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const arrMatter = state.matters.map((item) => {
        return {
            value: item._id,
            label: item.ten_vu_viec
        }
    })

    const handleAdd = async (values) => {
        try {
            let result = (await feeService.create(values)).data;
            setTimeout(()=> props.onCancel(false), 50);
        }
        catch (err) {
            console.log(err);
        }
    }
    const onSubmit = (values) => {
        const newVal = {
            ngay_lap: new Date(),
            mo_ta: values.mo_ta,
            don_gia: values.don_gia,
            so_hoa_don: values.idHD,
            vu_viec: values.matter,
            nhan_vien: token._id,
            status: 0,
            tai_khoan: {
                ngan_hang: values.nameBank,
                chu_tai_khoan: values.nameCreditCard,
                so_tai_khoan: values.numberCreditCard
            }
        }
        form.resetFields();
        handleAdd(newVal);
    }

    return (
        <>
            <Modal title="Chi phí mới" width={1000} {...props} footer={null}>
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
                    autoComplete="off"
                    onFinish={onSubmit}
                >
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Mô tả"
                                name="mo_ta"
                            >
                                <Input placeholder="VD: Ăn trưa với khách hàng A" />
                            </Form.Item>
                            <Form.Item
                                label="Vụ việc"
                                name="matter"
                            >
                                <Select options={arrMatter}/>
                            </Form.Item>
                        </Col>
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
                    </Row>
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

export default ModalAddFee;