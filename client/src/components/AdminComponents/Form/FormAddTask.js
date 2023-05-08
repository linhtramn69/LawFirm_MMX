import { Button, Form, Modal, Popconfirm, Select, Table, DatePicker, Space, Divider, Input, Tag } from "antd";
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { useState } from "react";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import Title from "antd/es/typography/Title";
import { useStore, useToken } from "~/store";
import { taskService, userService } from "~/services";
import { useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

dayjs.extend(customParseFormat);
const dateFormat = 'DD-MM-YYYY hh:mm A';
const statusText = ['Đã giao', 'Đã hoàn thành', 'Tạm ngưng']
const url = ['', 'admin', 'staff'];
function FormAddTask() {

    const [state, dispatch] = useStore()
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [edit, setEdit] = useState();
    const [staff, setStaff] = useState([]);
    const [task, setTask] = useState([]);
    const {token} = useToken()
    let data = []

    useEffect(() => {
        const getTask = async () => {
            setTask((await taskService.findByMatter({ id: state.matter._id })).data)
        }
        const getStaff = async () => {
            setStaff((await userService.getByMatter(state.matter.truy_cap.nhan_vien)).data)
        }
        getTask();
        getStaff();
    }, [edit])
    useEffect(() => {
        if (task.length > 0) {
            data = task.map((value, index) => {
                return {
                    key: index,
                    _id: value._id,
                    ten_cong_viec: value.ten_cong_viec,
                    ngay_giao: moment(value.ngay_giao).format('DD-MM-YYYY LTS'),
                    nguoi_phu_trach: value.nguoi_phu_trach.ho_ten,
                    status: value.status,
                    han_chot_cong_viec: moment(value.han_chot_cong_viec).format('DD-MM-YYYY LTS')
                }
            })
        }
        setDataSource(data);
    }, [task])

    const arrStaff = staff.map((value) => {
        return ({
            value: value._id,
            label: value.ho_ten
        })
    })
    const handleDelete = async (key) => {
        (await taskService.delete(key));
        const newData = dataSource.filter((item) => item._id !== key);
        setDataSource(newData);
    };
    const handleEdit = async (id, data, key) => {
        try {
            let result = (await taskService.update(id, data)).data;
            const index = dataSource.findIndex((item) => key === item.key);
            dataSource.splice(index, 1, {
                ...result,
                key: key,
                ngay_giao: moment(result.ngay_giao).format('DD-MM-YYYY LTS'),
                nguoi_phu_trach: result.nguoi_phu_trach.ho_ten,
                han_chot_cong_viec: moment(result.han_chot_cong_viec).format('DD-MM-YYYY LTS')
            });
            setDataSource([...dataSource]);
            setEdit(null);
            setOpen(false);
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleAdd = async (values) => {
        try {
            let result = (await taskService.create(values)).data;
            const taskNew = (await taskService.getById(result.insertedId)).data;
            setTask([...task, taskNew]);
            setOpen(false);
        }
        catch (err) {
            console.log(err);
        }
    }
    const onSubmit = (values) => {
        const newVal = {
            ten_cong_viec: values.ten_cong_viec,
            nguoi_phu_trach: values.nguoi_phu_trach,
            vu_viec: state.matter._id,
            han_chot_cong_viec: values.han_chot_cong_viec,
            ngay_giao: new Date(),
            nguoi_phan_cong: token._id,
            status: 0
        }
        form.resetFields();
        edit ? handleEdit(edit._id, newVal, edit.key) : handleAdd(newVal)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const columns = [
        {
            title: 'Tên công việc',
            dataIndex: 'ten_cong_viec',
        },
        {
            title: 'Phân công cho',
            dataIndex: 'nguoi_phu_trach',
        },
        {
            title: 'Ngày giao',
            dataIndex: 'ngay_giao',
        },
        {
            title: 'Hạn chót',
            dataIndex: 'han_chot_cong_viec',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status) => (
                <Tag
                    color={status === 0 ? 'volcano' : status===1 ? 'success' : 'warning'}
                >
                    {statusText[status]}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            dataIndex: 'operation',
            render: (_, record) => (
                <Space split={<Divider type="vertical" />}>
                    <Button onClick={() => {
                        setEdit({...task[record.key], key: record.key})
                        setOpen(true)
                    }}><FormOutlined /></Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
                        <Button><DeleteOutlined /></Button>
                    </Popconfirm>
                </Space>)
        },
        {
            title: '',
            dataIndex: '',
            width: 130,
            render: (_, record) => (
                <Link to={`/${url[token.account.quyen]}/task/${record._id}`}>
                Xem chi tiết
                </Link>
            )
        },
    ];

    return (
        <>
            <Button type="primary" onClick={() => {
                setOpen(true)
            }}>
                Thêm công việc
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
                onCancel={() => {
                    form.resetFields()
                    setOpen(false)
                }}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={
                        {
                            maxWidth: 600
                        }}
                    onFinish={onSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    fields={
                        edit ? [
                            {
                                name: ["ten_cong_viec"],
                                value: edit.ten_cong_viec,
                            },
                            {
                                name: ["nguoi_phu_trach"],
                                value: edit.nguoi_phu_trach._id,
                                label: edit.nguoi_phu_trach.ho_ten,
                            },
                            {
                                name: ["han_chot_cong_viec"],
                                value: dayjs(edit.han_chot_cong_viec),

                            }
                        ] : null
                    }
                >
                    <Form.Item
                        label="Phân công cho"
                        name="nguoi_phu_trach"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn nhân viên phụ trách',
                            },
                        ]}
                    >
                        <Select options={arrStaff}  />
                    </Form.Item>
                    <Form.Item
                        label="Tên công việc"
                        name="ten_cong_viec"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên công việc!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Hạn chót"
                        name="han_chot_cong_viec"
                    >
                        <DatePicker showTime format={dateFormat} />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table dataSource={dataSource} columns={columns} />
        </>
    );
}
export default FormAddTask;