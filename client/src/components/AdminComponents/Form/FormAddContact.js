import { Button, Divider, Form, Modal, Select, Table, Input, Space, Tag, Popconfirm, DatePicker, Radio } from "antd";
import { PlusOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
const relationship = ['Nhân chứng', 'Người thân',  'Bạn bè', 'Đồng nghiệp', 'Họ hàng']
function FormAddContact({ props }) {
    const [form] = Form.useForm();
    const [open, setOpen] = useState();
    const [items, setItems] = useState(
        relationship.map((value) => {
           return {
                value: value,
                label: value
            }
        })
    );
    const [name, setName] = useState('');
    const inputRef = useRef(null);
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, {
            value: name,
            label: name
        }]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
    const handleSubmit = (values) => {
        console.log(values);
    }
    return (
        <>
            <Modal
                title={
                    <>
                        <Title level={4}>Liên hệ mới</Title>
                        <Divider />
                    </>
                }
                centered
                open={open}
                footer={null}
                width={700}
                onCancel={() => setOpen(false)}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 1000,
                    }}
                    form={form}
                    autoComplete="off"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Họ tên"
                        name="fullname"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ tên người liên hệ',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Năm sinh"
                        name="year">
                        <DatePicker picker="year" placeholder="Chọn năm sinh" />
                    </Form.Item>
                    <Form.Item
                        label="Giới tính"
                        name="sex"
                        >
                        <Radio.Group name="radiogroup" defaultValue="Nam">
                            <Radio value="Nam">Nam</Radio>
                            <Radio value="Nữ">Nữ</Radio>
                            <Radio value="Khác">Khác</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="sdt"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại người liên hệ',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Quan hệ"
                        name="relationship"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn mối quan hệ',
                            },
                        ]}>
                        <Select
                            style={{
                                width: 300,
                            }}
                            placeholder="VD: Nhân chứng"
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <Divider
                                        style={{
                                            margin: '8px 0',
                                        }}
                                    />
                                    <Space
                                        style={{
                                            padding: '0 8px 4px',
                                        }}
                                    >
                                        <Input
                                            placeholder="Nhập tên quy trình"
                                            ref={inputRef}
                                            value={name}
                                            onChange={onNameChange}
                                        />
                                        <Button type="text" style={{ marginTop: 0 }} icon={<PlusOutlined />} onClick={addItem}>
                                            Add item
                                        </Button>
                                    </Space>
                                </>
                            )}
                            options={items}
                            
                        />
                    </Form.Item>
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
            <Button onClick={() => setOpen(true)} type="primary">Thêm mới</Button>
        </>
    );
}

export default FormAddContact;