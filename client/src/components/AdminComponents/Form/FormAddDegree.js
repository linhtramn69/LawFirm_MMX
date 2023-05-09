import { Button, DatePicker, Descriptions, Divider, Form, Image, Input, Modal, Popconfirm, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { UploadImg, fileSelected } from "../UploadImg";
import { degreeService, userService } from "~/services";
import { useParams } from "react-router-dom";
import { DeleteOutlined } from '@ant-design/icons';

import moment from "moment";

const type = [
    {
        value: "Bằng Đại học",
        label: "Bằng Đại học"
    },
    {
        value: "Bằng Cao đẳng",
        label: "Bằng Cao đẳng"
    },
    {
        value: "Chứng chỉ hành nghề",
        label: "Chứng chỉ hành nghề"
    },
    {
        value: "Bằng Tiếng Anh",
        label: "Bằng Tiếng Anh"
    }
]
function FormAddDegree() {

    let { id } = useParams();
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [degrees, setDegrees] = useState([])
    let data = [];

    useEffect(() => {
        const getDegree = async () => {
            setDegrees((await degreeService.findByStaff(id)).data)
        }
        getDegree()
    }, [])
    console.log(degrees);
    useEffect(() => {
        if (degrees.length > 0) {
            data = degrees.map((value, index) => {
                return {
                    key: index,
                    id: value._id,
                    type: value.loai,
                    date: moment(value.ngay_cap).format('DD-MM-YYYY'),
                    dateEnd: value.thoi_han,
                    img: value.hinh_anh
                }
            })
        }
        setDataSource(data);
    }, [degrees])

    const handleAdd = async (value) => {
        try {
            let result = (await degreeService.create(value)).data;
            const degreeNew = (await degreeService.getById(result.insertedId)).data;
            setDegrees([...degrees, degreeNew]);
            setIsModalOpen(false);
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleDelete = async (value) => {
        try {
            (await degreeService.delete(value));
            const newData = degrees.filter((item) => item._id !== value);
            setDegrees(newData);
        } catch (err) {
            console.log(err);
        }
    }
    const onFinish = (value) => {
        const data = {
            _id: value.id,
            loai: value.type,
            ngay_cap: value.date,
            thoi_han: value.dateEnd,
            hinh_anh: fileSelected,
            nhan_vien: id
        }
        form.resetFields();
        handleAdd(data);
    }

    const columns = [
        {
            title: 'Mã BC/CC',
            dataIndex: 'id',
            width: 200
        },
        {
            title: 'Loại BC/CC',
            dataIndex: 'type',
            width: 400
        },
        {
            title: 'Ngày cấp',
            dataIndex: 'date',
            width: 200
        },
        {
            title: 'Thời hạn',
            dataIndex: 'dateEnd',
            width: 200
        },
        {
            title: 'Hinh anh',
            dataIndex: 'img',
            width: 200,
            render: (_, record) => (
                <Image src={record.img}/>
        )
        },
        {
            title: 'Thao tác',
            dataIndex: 'operation',
            width: 100,
            render: (_, record) => (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
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
        title: 'Thông tin chi tiết Bằng cấp / Chứng chỉ',
        content: (
            <>
                <Descriptions
                    column={{
                        lg: 4,
                        md: 4,
                        sm: 2,
                    }}
                >
                    <Descriptions.Item span={4} label="Mã BC/CC">{data.id}</Descriptions.Item>
                    <Descriptions.Item span={4} label="Loại BC/CC">{data.type}</Descriptions.Item>
                    <Descriptions.Item span={4} label="Ngày cấp">{data.date}</Descriptions.Item>
                    <Descriptions.Item span={4} label="Thời hạn">{data.dateEnd}</Descriptions.Item>
                </Descriptions>
                <Divider />
                <Image width={100} src={data.img}/>
            </>
        ),
        onOk() { },
    })

    return (
        <>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>Thêm mới</Button>
            <Modal
                title="Thêm bằng cấp / chứng chỉ"
                open={isModalOpen}
                footer={null}
                width={600}
                onCancel={() => setIsModalOpen(false)}>
                <Divider />
                <Form
                    name="basic"
                    form={form}
                    onFinish={onFinish}
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 1000,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Mã BC / CC"
                        name="id"
                        required>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Loại BC / CC"
                        name="type"
                        required>
                        <Select options={type}/>
                    </Form.Item>
                    <Form.Item
                        label="Ngày cấp"
                        name="date"
                        required>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="Thời hạn"
                        name="dateEnd">
                        <Input placeholder="5 năm hoặc vĩnh viễn" />
                    </Form.Item>
                    <Form.Item
                        label="Hình ảnh"
                        name="img"
                        required>
                        <UploadImg />
                    </Form.Item>
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

export default FormAddDegree;