import { Button, Divider, Form, Modal, Select, Table, Input, Space, Popconfirm, DatePicker, Radio, Descriptions } from "antd";
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import dayjs from 'dayjs';
import { useEffect } from "react";
import { useState, useRef} from "react";
import { useParams } from "react-router-dom";
import { contactService } from "~/services";
import moment from "moment";
const relationship = ['Nhân chứng', 'Người thân', 'Bạn bè', 'Đồng nghiệp', 'Họ hàng']

function FormAddContact({ props }) {

    let { id } = useParams();
    const [form] = Form.useForm();
    const [open, setOpen] = useState();
    const [edit, setEdit] = useState();
    const [dataSource, setDataSource] = useState([]);
    const [contacts, setContacts] = useState([]);
    let data = [];
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

    useEffect(() => {
        const getContact = async () => {
            setContacts((await contactService.findByMatter({ vu_viec: id })).data)
        }
        getContact()
    }, [])
    useEffect(() => {
        if (contacts.length > 0) {
            data = contacts.map((value, index) => {
                return {
                    key: index,
                    _id: value._id,
                    fullname: value.ho_ten,
                    sex: value.gioi_tinh,
                    year: moment(value.nam_sinh).format('YYYY'),
                    sdt: value.sdt,
                    address: value.dia_chi,
                    relationship: value.quan_he
                }
            })
        }
        setDataSource(data);
    }, [contacts])

    const handleAdd = async (value) => {
        try {
            let result = (await contactService.create(value)).data;
            const contactNew = (await contactService.getById(result.insertedId)).data;
            setContacts([...contacts, contactNew]);
            setOpen(false);
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleEdit = async (id, data, key) => {
        try {
            let result = (await contactService.update(id, data)).data;
            const index = dataSource.findIndex((item) => key === item.key);
            dataSource.splice(index, 1, {
                ...result,
                key: key,
                fullname: data.ho_ten,
                sex: data.gioi_tinh,
                year: moment(data.nam_sinh).format('YYYY'),
                sdt: data.sdt,
                address: data.dia_chi,
                relationship: data.quan_he
            });
            setDataSource([...dataSource]);
            setEdit(null);
            setOpen(false);
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleDelete = async (value) => {
        try {
            (await contactService.delete(value));
            const newData = contacts.filter((item) => item._id !== value);
            setContacts(newData);
        } catch (err) {
            console.log(err);
        }
    }
    const handleSubmit = (values) => {
        const data = {
            ho_ten: values.fullname,
            nam_sinh: values.year,
            gioi_tinh: values.sex,
            sdt: values.sdt,
            dia_chi: values.address,
            quan_he: values.relationship,
            vu_viec: id
        }
        form.resetFields();
        edit ? handleEdit(edit._id, data, edit.key) : handleAdd(data)
    }
    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'fullname',
            width: 300
        },
        {
            title: 'Giới tính',
            dataIndex: 'sex',
            width: 150
        },
        {
            title: 'Năm sinh',
            dataIndex: 'year',
            width: 200
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'sdt',
            width: 250
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: 300
        },
        {
            title: 'Mối quan hệ',
            dataIndex: 'relationship',
            width: 200
        },
        {
            title: 'Thao tác',
            dataIndex: 'operation',
            width: 100,
            render: (_, record) => (
                
                <Space split={<Divider type="vertical" />}>
                <Button onClick={() => {
                    setEdit({...contacts[record.key], key: record.key})
                    setOpen(true)
                }}><FormOutlined /></Button>
                <Popconfirm title="Xác nhận xoá thông tin liên hệ này?" onConfirm={() => handleDelete(record._id)}>
                    <Button><DeleteOutlined /></Button>
                </Popconfirm>
            </Space> 
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
        title: 'Thông tin chi tiết liên hệ',
        content: (
            <>
                <Descriptions
                    column={{
                        lg: 4,
                        md: 4,
                        sm: 2,
                    }}
                >
                    <Descriptions.Item span={4} label="Họ tên">{data.fullname}</Descriptions.Item>
                    <Descriptions.Item span={4} label="Giới tính">{data.sex}</Descriptions.Item>
                    <Descriptions.Item span={4} label="Năm sinh">{data.year}</Descriptions.Item>
                    <Descriptions.Item span={4} label="Số điện thoại">{data.sdt}</Descriptions.Item>
                    <Descriptions.Item span={4} label="Địa chỉ">{data.address}</Descriptions.Item>
                    <Descriptions.Item span={4} label="Mối quan hệ">{data.relationship}</Descriptions.Item>
                </Descriptions>
            </>
        ),
        onOk() { },
    })
    return (
        <>
            <Button onClick={() => setOpen(true)} type="primary">Thêm mới</Button>
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
                    fields={
                        edit ? [
                            {
                                name: ["fullname"],
                                value: edit.ho_ten,
                            },
                            {
                                name: ["year"],
                                value: dayjs(edit.nam_sinh),
                            },
                            {
                                name: ["sex"],
                                value: edit.gioi_tinh,
                            },
                            {
                                name: ["sdt"],
                                value: edit.sdt,
                            },
                            {
                                name: ["address"],
                                value: edit.dia_chi,
                            },
                            {
                                name: ["relationship"],
                                value: edit.quan_he,
                            }
                        ] : null
                    }
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
                                            placeholder="Nhập tên mối quan hệ"
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
            <Table dataSource={dataSource} columns={columns} />
        </>
    );
}

export default FormAddContact;