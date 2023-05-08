import { Col, Divider, Row, Form, Input, Modal, Select, Tabs, DatePicker, InputNumber, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { boPhanService, quoteService, timeAppointmentService, typeAppointmentService, userService } from "~/services";
import { useToken } from "~/store";
const { RangePicker } = DatePicker;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        md: {
            span: 8,
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
const url = ['', 'admin', 'tu-van-vien']
function ModalCalendar(props) {

    let navigate = useNavigate();
    const { token } = useToken();
    const [form] = Form.useForm();
    const [typeAppoint, setTypeAppoint] = useState([]);
    const [boPhan, setBoPhan] = useState([]);
    const [users, setUsers] = useState([]);
    // const [arrUser, setArrUser] = useState([]);
    const quote = { ...props.quote };
    const khach_hang = { ...props.quote.khach_hang };
    const dich_vu = { ...props.quote.dich_vu };
    const linh_vuc = { ...props.quote.linh_vuc };
    let arrUser = []

    useEffect(() => {
        const getTypeAppoints = async () => {
            setTypeAppoint((await typeAppointmentService.get()).data)
        }
        getTypeAppoints();
    }, []);
    useEffect(() => {
        const getBoPhan = async () => {
            setBoPhan((await boPhanService.get()).data)
        }
        getBoPhan();
    }, []);

    const arrTypeAppoint = typeAppoint.map((value) => {
        return ({ value: value.ten, label: value.ten })
    })
    const arrBoPhan = boPhan.map((value) => {
        return ({ value: value._id, label: value.ten_bo_phan })
    })
    users.map((value) => {
        if (value.chuc_vu._id === 'LS02' && value.chuyen_mon.includes(linh_vuc._id))
            arrUser.push({
                value: value._id,
                label: value.ho_ten
            })
        else if (value.bo_phan._id !== 'LS')
            arrUser.push({
                value: value._id,
                label: value.ho_ten
            })
    })
    const handleChangeBoPhan = async (value) => {
        setUsers((await userService.getByBoPhan(value)).data);
    }
    
    const onFinish = async (values) => {
        const data = {
            tieu_de: values.tieu_de,
            bo_phan: values.bo_phan,
            ghi_chu: values.ghi_chu,
            mo_ta: values.mo_ta,
            loai_lich: values.loai_lich,
            thoi_gian: {
                start: values.thoi_gian[0],
                end: values.thoi_gian[1]
            },
            nhan_vien: values.nhan_vien,
            phieu_bao_gia: quote._id,
            khach_hang: {
                ho_ten: values.name,
                sdt: values.sdt,
                email: values.email
            },
        }
        try {
            await timeAppointmentService.create(data);
            await quoteService.update(quote._id, {
                linh_vuc: quote.linh_vuc._id,
                dich_vu: quote.dich_vu._id,
                status: 2
            })
            navigate(`/${url[token.account.quyen]}/calendar`);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal
            title="Thêm công việc"
            width={1000}
            {...props}
            footer={null}
        >
            <Form
                {...formItemLayout}
                form={form}
                onFinish={onFinish}
                fields={[
                    {
                        name: ['name'],
                        value: khach_hang.ho_ten
                    },
                    {
                        name: ['email'],
                        value: khach_hang.email
                    },
                    {
                        name: ['sdt'],
                        value: khach_hang.sdt
                    },
                    {
                        name: ['dich_vu'],
                        value: dich_vu.ten_dv
                    },
                    {
                        name: ['linh_vuc'],
                        value: linh_vuc.ten_linh_vuc
                    },
                    {
                        name: ['price'],
                        value: quote.tong_gia_du_kien
                    },
                    {
                        name: ['pay_time'],
                        value: quote.dieu_khoan_thanh_toan
                    },
                    {
                        name: ['van_de'],
                        value: quote.van_de
                    },
                    {
                        name: ['ghi_chu_bao_gia'],
                        value: quote.ghi_chu
                    },
                ]}
            >
                <Row>
                    <Col span={24} pull={4}>
                        <Form.Item
                            label="Tiêu đề"
                            name='tieu_de'>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Col span={24} pull={4}>
                    <Form.Item
                        label="Tính chất"
                        name='loai_lich'>
                        <Select options={arrTypeAppoint} />
                    </Form.Item>
                </Col>
                <Divider />
                <Tabs
                    type="card"
                    items={[
                        {
                            key: '1',
                            label: `Thông tin khách hàng`,
                            children:
                                <>
                                    <br />
                                    <Row>
                                        <Col span={12} pull={1}>
                                            <Form.Item
                                                label="Họ tên"
                                                name='name'>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label="Email"
                                                name='email'>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={11} pull={1}>
                                            <Form.Item
                                                label="Số điện thoại"
                                                name='sdt'>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                        },
                        {
                            key: '2',
                            label: `Hồ sơ liên quan`,
                            children:
                                <>
                                    <br />
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Dịch vụ"
                                                name='dich_vu'>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label="Lĩnh vực"
                                                name='linh_vuc'>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label="Giá dự kiến"
                                                name='price'>
                                                <InputNumber
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                                    addonAfter='VNĐ' />
                                            </Form.Item>
                                            <Form.Item
                                                label="Điều khoản thanh toán"
                                                name='pay_time'>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Vấn đề của khách hàng"
                                                name='van_de'>
                                                <TextArea />
                                            </Form.Item>
                                            <Form.Item
                                                label="Ghi chú"
                                                name='ghi_chu_bao_gia'>
                                                <TextArea />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                        },
                        {
                            key: '3',
                            label: `Thông tin chi tiết`,
                            children:
                                <>
                                    <Row>
                                        <Col span={10}>
                                            <Form.Item
                                                label="Thời gian"
                                                name='thoi_gian'>
                                                <RangePicker
                                                    showTime={{ format: 'HH:mm' }}
                                                    format="YYYY-MM-DD HH:mm"
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="Mô tả"
                                                name='mo_ta'>
                                                <TextArea />
                                            </Form.Item>
                                            <Form.Item
                                                label="Ghi chú"
                                                name='ghi_chu'>
                                                <TextArea />
                                            </Form.Item>
                                        </Col>
                                        <Col span={10} push={1}>
                                            <h4>Phân công cho</h4>
                                            <Divider />
                                            <Form.Item
                                                label="Phòng ban"
                                                name='bo_phan'>
                                                <Select
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    placeholder="Please select"
                                                    options={arrBoPhan}
                                                    onChange={handleChangeBoPhan}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="Nhân viên"
                                                name='nhan_vien'>
                                                <Select
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    placeholder="Please select"
                                                    options={arrUser}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                        },
                    ]}
                />
                <Form.Item
                    wrapperCol={{
                        offset: 20,
                        span: 6
                    }}>
                    <Button htmlType="submit">Lưu</Button>
                </Form.Item>
            </Form>
        </Modal>
    );

}

export default ModalCalendar;