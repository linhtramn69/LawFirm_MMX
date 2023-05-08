import { useStore, actions, useToken } from "~/store";
import { quoteService, serviceService, timePayService, typeServiceService, } from "~/services";
import { useState, useEffect } from "react";
import { Button, Col, Row, Divider, Form, InputNumber, Select, Space, Typography, Descriptions, Input } from "antd";
import Title from "antd/es/typography/Title";
import TextArea from "antd/es/input/TextArea"
import Message from "~/components/Message";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        md: {
            span: 10,
        },
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        md: {
            span: 14
        }
    }
};
const mess = [
    '',
    'Gửi báo giá thành công!',
    'Gửi báo giá thất bại!'
]
const url = ['', 'admin', 'tu-van-vien']
function FormQuotes({ quote }) {
    let navigate = useNavigate();
    const { token } = useToken();
    const [form] = Form.useForm();
    const [state, dispatch] = useStore();
    const arrTimePay = []
    const [timePay, setTimePay] = useState([])
    const [typeService, setTypeService] = useState(null);
    const [serviceSelected, setServiceSelected] = useState(null);
    const [typeServiceSelected, setTypeServiceSelected] = useState(null);
    const [service, setService] = useState(null);
    const [donGia, setDonGia] = useState(0);
    const [isSubmit, setisSubmit] = useState(null);

    useEffect(() => {
        const getTypeServices = async () => {
            dispatch(actions.setTypeServices((await typeServiceService.get()).data))
        };
        const getServices = async () => {
            dispatch(actions.setServices((await serviceService.get()).data))
        };
        getServices()
        getTypeServices()
    }, [dispatch]);
    useEffect(() => {
        const getService = async () => {
            const dv = (await serviceService.getById(service)).data
            setServiceSelected(dv)
            setDonGia(dv.don_gia_dv)
        }
        const getTypeService = async () => {
            setTypeServiceSelected((await typeServiceService.getById(typeService)).data)
        };
        getTypeService()
        getService()
    }, [service, typeService])
    useEffect(() => {
        const getTimePay = async () => {
            setTimePay((await timePayService.get()).data)
        }
        getTimePay();
    }, [])
    timePay.map((value) => {
        return (
            arrTimePay.push({
                value: value.ten,
                label: value.ten
            })
        )
    })

    const arrTypeServices = state.type_services.map((value) => {
        return (
            {
                value: value._id,
                label: value.ten_linh_vuc
            }
        )
    })
    const handleChangeTypeService = async (value) => {
        setTypeService(value)
        dispatch(actions.setServices((await serviceService.getByType(value)).data));
    }
    const arrServices = state.services.map((value) => {
        return ({
            value: value._id,
            label: value.ten_dv
        })
    })
    const handleAdd = async (data) => {
        try {
            const result = await quoteService.create(data);
            setisSubmit(1);
            navigate(`/${url[token.account.quyen]}/quote/${result.data.insertedId}`);
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleEdit = async (data) => {
        try {
            await quoteService.update(quote._id, data);
            setisSubmit(1);
            navigate(`/${url[token.account.quyen]}/quote/${quote._id}`);
        }
        catch (error) {
            console.log(error);
        }
    }
    const onFinish = (values) => {
        const data = {
            khach_hang: {
                ho_ten: values.ho_ten,
                sdt: values.sdt,
                email: values.email
            },
            nguoi_lap_phieu: token,
            linh_vuc: values.typeService,
            dich_vu: values.service,
            ngay_lap_phieu: new Date(),
            tong_gia_du_kien: values.price,
            dieu_khoan_thanh_toan: values.payTime,
            ghi_chu: values.note,
            status: 1
        }
        quote ? handleEdit(data) : handleAdd(data)
    }

    return (
        <>
            <Form
                {...formItemLayout}
                fields={
                    quote && quote.status == 0 ?
                        [
                            {
                                name: ['ho_ten'],
                                value: quote.khach_hang.ho_ten
                            },
                            {
                                name: ['sdt'],
                                value: quote.khach_hang.sdt
                            },
                            {
                                name: ['email'],
                                value: quote.khach_hang.email
                            },
                            {
                                name: ['price'],
                                value: donGia ? donGia : quote.tong_gia_du_kien,
                            },
                        ] :
                        quote && quote.status > 0 ? [
                            {
                                name: ['ho_ten'],
                                value: quote.khach_hang.ho_ten
                            },
                            {
                                name: ['sdt'],
                                value: quote.khach_hang.sdt
                            },
                            {
                                name: ['email'],
                                value: quote.khach_hang.email
                            },
                            {
                                name: ['price'],
                                value: donGia ? donGia : quote.tong_gia_du_kien,
                            },
                            {
                                name: ['typeService'],
                                label: typeServiceSelected ? typeServiceSelected.ten_linh_vuc
                                    : quote.linh_vuc.ten_linh_vuc,
                                value: typeServiceSelected ? typeServiceSelected._id : quote.linh_vuc._id,
                            },
                            {
                                name: ['service'],
                                value: serviceSelected ? serviceSelected._id : quote.dich_vu._id,
                                label: serviceSelected ? serviceSelected.ten_dv : quote.dich_vu.ten_dv,
                            },
                            {
                                name: ['payTime'],
                                value: quote.dieu_khoan_thanh_toan,
                            }
                        ] :
                            [
                                {
                                    name: ['price'],
                                    value: donGia
                                }
                            ]}

                form={form}
                onFinish={onFinish}
            >
                <Space>
                    <Button type="primary" htmlType="submit" className="btn-primary">LƯU</Button>
                </Space>
                <Divider />
                <Row>
                    <Col md={{ span: 14 }} >
                        <Title level={5} style={{ marginLeft: 50, marginTop: -3, marginBottom: 20 }}>KHÁCH HÀNG</Title>
                        <Form.Item
                            label="Họ tên"
                            name="ho_ten"
                            labelCol={{
                                md: { span: 5 }
                            }}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            labelCol={{
                                md: { span: 5 }
                            }}>
                            <Input type="email" />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="sdt"
                            labelCol={{
                                md: { span: 5 }
                            }}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 10 }}>
                        <Descriptions title="NHÂN VIÊN"
                            column={{
                                lg: 4,
                                md: 4,
                                sm: 2,
                            }}>
                            <Descriptions.Item span={4} label="Họ tên">{token.ho_ten}</Descriptions.Item>
                            <Descriptions.Item span={2} label="Số điện thoại">{token.account.sdt}</Descriptions.Item>
                            <Descriptions.Item span={2} label="Email">{token.email}</Descriptions.Item>
                            <Descriptions.Item span={4} label="Chức vụ">{token.chuc_vu.ten_chuc_vu}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
                <Divider />
                <Title level={5} style={{ marginLeft: 50, marginBottom: 20 }}>THÔNG TIN CHI TIẾT</Title>
                <Row>
                    <Col md={{ span: 12, pull: 2 }}>
                        <Form.Item
                            label="Lĩnh vực"
                            name="typeService">
                            <Select
                                showSearch
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={arrTypeServices}
                                onSelect={handleChangeTypeService}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Dịch vụ"
                            name="service">
                            <Select
                                showSearch
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={arrServices}
                                onSelect={(value) => setService(value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Tổng giá"
                            name="price">
                            <InputNumber
                                style={{
                                    width: 310,
                                }}
                                bordered={false}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                addonAfter='VNĐ'
                            />
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 12, pull: 1 }}>
                        <Form.Item
                            label="Điều khoản thanh toán"
                            name="payTime">
                            <Select
                                options={arrTimePay}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Ghi chú"
                            name="note">
                            <TextArea />
                        </Form.Item>
                        <br />

                    </Col>

                </Row>
                <Divider />
                <Text style={{ marginLeft: 30 }} keyboard italic>
                    Lưu ý: Giá thành dịch vụ có thể sẽ có sự thay đổi tuỳ theo tính chất vụ việc.
                    Để có giá thành chính xác nhất,
                </Text> <br />
                <Text style={{ marginLeft: 30 }} keyboard italic>
                    hãy trực tiếp cho chúng tôi biết cụ thể vấn đề của bạn.
                </Text>
            </Form>
            <Message props={isSubmit} mess={mess[isSubmit]} />
        </>
    );
}

export default FormQuotes;