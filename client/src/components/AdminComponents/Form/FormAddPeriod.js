import { Button, Divider, Form, Modal, Select, Table, Input, Space, Tag, Popconfirm } from "antd";
import { PlusOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import { useEffect } from "react";
import { useState } from "react";
import { matterService, periodService, stepService } from "~/services";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
const statusText = ['Đang thực hiện', 'Hoàn thành'];
function FormAddPeriod({ props }) {
    const [form] = Form.useForm();
    const [open, setOpen] = useState();
    const [period, setPeriod] = useState([]);
    const [step, setStep] = useState([]);
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [dataSource, setDataSource] = useState([])
    let data = []
    let arr = []
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
        const getStep = async () => {
            const step = (await stepService.getByIdService(props.dich_vu._id)).data
            setStep(step)
        }
        const getPeriod = async () => {
            const period = (await periodService.findByMatter(props._id )).data
            setPeriod(period)
        }
        getPeriod()
        getStep()
    }, [])
    useEffect(() => {
        if (period.length > 0) {
            data = period.map((value, index) => {
                return {
                    key: index,
                    _id: value._id,
                    name: value.ten_qt,
                    mo_ta: value.mo_ta,
                    status: value.status,
                    vu_viec: value.vu_viec
                }
            })
        }
        setDataSource(data);
    }, [period])
    console.log(period);
    useEffect(() => {
        step.map((item) => {
            return arr.push({
                value: item.ten_qt,
                label: item.ten_qt
            })
        })
        setItems(arr)
    }, [step])

    const columns = [
        {
            title: 'Tên quy trình',
            dataIndex: 'name',
            width: 300
        },
        {
            title: 'Mô tả',
            dataIndex: 'mo_ta',
            width: 200,
            ellipsis: {
                showTitle: false,
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 200,
            render: (status) => (
                <Tag
                    color={status === 0 ? 'volcano' : 'success'}
                >
                    {statusText[status]}
                </Tag>
            ),
        },
        {
            title: 'Cập nhật',
            dataIndex: 'update',
            width: 200,
            render: (_, record) => (
                record.status == 0 ?
                    <Popconfirm title="Quy trình này đã hoàn thành?"
                        onConfirm={() => handleUpdate(record._id, 1, record.key, record.vu_viec)}>
                        <Button
                            className="btn btn-status"
                        ><FontAwesomeIcon
                                style={{
                                    color: '#389e0d',
                                    marginRight: 10
                                }} icon={faCircleCheck} />Hoàn thành</Button>
                    </Popconfirm>
                    :
                    <Popconfirm title="Hủy hoàn thành quy trình này?"
                        onConfirm={() => handleUpdate(record._id, 0, record.key, record.vu_viec)}>
                        <Button
                            className="btn btn-status"
                        ><FontAwesomeIcon
                                style={{
                                    color: '#f5222d',
                                    marginRight: 10
                                }} icon={faCancel} />Thực hiện lại</Button>
                    </Popconfirm>
            )
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            width: 200,
            render: (_, record) => (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id, record.key)}>
                    <Button><DeleteOutlined/></Button>
                </Popconfirm>
            )
        }

    ];
    const handleDelete = async (id, key) => {
        const rs = (await periodService.delete(id)).data
        const newData = period.filter((item) => item._id !== id);
        setPeriod(newData)
    }
    const handleUpdate = async (id, value, key, vu_viec) => {
        const rs = (await periodService.update(id, { status: value, vu_viec: vu_viec })).data
        const index = dataSource.findIndex((item) => key === item.key);
        dataSource.splice(index, 1, {
            ...rs,
            key: key,
            _id: rs._id,
            name: rs.ten_qt,
            mo_ta: rs.mo_ta,
            status: rs.status
        });
        setDataSource([...dataSource]);
    }
    const handleSubmit = async (values) => {
        form.resetFields()
        const rs = (await periodService.create({
            vu_viec: props._id,
            ten_qt: values.name,
            mo_ta: values.mo_ta
        })).data
        const periodNew = (await periodService.getById(rs.insertedId)).data
        setPeriod([...period, periodNew])
        setOpen(false)
    }
    return (
        <>
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
                width={500}
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
                    onFinish={handleSubmit}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên quy trình"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn quy trình',
                            },
                        ]}>
                        <Select
                            style={{
                                width: 300,
                            }}

                            placeholder="Chọn tên quy trình"
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
                                        <Button type="text" style={{ marginTop: 15 }} icon={<PlusOutlined />} onClick={addItem}>
                                            Add item
                                        </Button>
                                    </Space>
                                </>
                            )}
                            options={items}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="mo_ta">
                        <Input placeholder="VD: Xin giấy chứng nhận VSATTP cấp 2 từ ban quản lý thị trường" />
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
            <Table columns={columns} dataSource={dataSource} />
        </>
    );
}

export default FormAddPeriod;