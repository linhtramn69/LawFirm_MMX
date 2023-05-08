import { Col, Divider, Row, Form, Input, Modal, Select, Tabs, DatePicker, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useState } from "react";
import { boPhanService, timeAppointmentService, userService } from "~/services";
import typeAppointment from "~/services/typeAppointment.service";
import { useToken } from "~/store";
const { RangePicker } = DatePicker;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 8,
        },
        md: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 16
        },
        md: {
            span: 16
        },
    }
};
function ModalAdd(props) {
    const {token} = useToken()
    const [type, setType] = useState([]);
    const [boPhan, setBoPhan] = useState([]);
    const [staff, setStaff] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const getBoPhan = async () => {
            token.bo_phan.id === 'LS' ?
                setBoPhan((await boPhanService.getById('LS')).data)
            : setBoPhan((await boPhanService.get()).data)
        }
        const getType = async () => {
            setType((await typeAppointment.get()).data)
        }
        getBoPhan()
        getType()
    }, [])
    const handleChangeBoPhan = async(value) => {
        setStaff((await userService.getByBoPhan(value)).data)
    }
    const arrType = type.map((value) => {
        return ({ value: value._id, label: value.ten})
    })
    const arrBP = boPhan.map((value) => {
        return ({ value: value._id, label: value.ten_bo_phan })
    })
    const arrStaff = staff.map((value) => {
        return ({ value: value._id, label: value.ho_ten })
    })
    const onFinish = async(values) => {
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
            khach_hang: {
                ho_ten: values.name,
                sdt: values.sdt,
                email: values.email
            },
        }
        try {
            await timeAppointmentService.create(data);
            messageApi.open({
                type: 'success',
                content: 'Thêm lịch thành công!',
            });
            setTimeout(()=> props.onCancel(false), 1000);
        }
        catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Nhân viên này đã có lịch vào thời gian này!',
            });
            console.log(error);
        }
    }
    return (
        <>
        <Modal title="Thêm công việc" width={1000} {...props}
            footer={null}>
            <Form
                {...formItemLayout}
                onFinish={onFinish}>
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
                        <Select options={arrType}/>
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
                                            <Form.Item
                                                label="Vấn đề"
                                                name='van_de'>
                                                <TextArea />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                        },
                        {
                            key: '2',
                            label: `Thông tin chi tiết`,
                            children:
                                <>
                                    <Row>
                                        <Col span={10}>
                                            <Form.Item
                                                label="Thời gian"
                                                name='thoi_gian'>
                                                <RangePicker showTime={{ format: 'HH:mm' }}
                                                    format="YYYY-MM-DD HH:mm" />
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
                                                    options={arrBP}
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
                                                    options={arrStaff}
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
                        offset: 16,
                        span: 6,
                    }}
                >
                    <Button htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Modal >
        {contextHolder}
        </>
    );

}

export default ModalAdd;