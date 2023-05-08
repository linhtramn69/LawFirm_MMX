import { Button, Form, Modal, Popconfirm, Select, Table, Space, Divider, InputNumber, Input, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { stepService } from "~/services";
import { actions, useStore } from "~/store";

function FormAddPeriod({ props }) {

    const [form] = Form.useForm();
    const [state, dispatch] = useStore();
    const [dataSource, setDataSource] = useState([]);
    const [dataTemp, setDataTemp] = useState([]);
    const [open, setOpen] = useState(false);
    const [steps, setSteps] = useState([])
    const [priceStep, setPriceStep] = useState(0);
    const [unitStep, setUnitStep] = useState();

    useEffect(() => {
        dispatch(actions.setSteps([...dataTemp]));
    }, [dataTemp])
    useEffect(() => {
        const getSteps = async () => {
            setSteps((await stepService.getByIdService(state.matter.dich_vu._id)).data)
        }
        getSteps();
    }, [])
    // lay qui trinh dua theo id chi phi co dinh
    useEffect(() => {
        const showDataSource = async () => {
            const rs = (await stepService.getByIdChiPhiCoDinh(props ? props : [])).data
            const dataShow = rs.map((value) => {
                return {
                    _id: value._id,
                    periodName: value.ten_qt,
                    price: value.don_gia_qt,
                    unit: value.don_vi_tinh
                }
            })
            setDataSource(dataShow);
            setDataTemp(props ? props : []);
        }
        showDataSource();
    }, [])

    const arrStep = steps.map((value) => {
        return ({
            value: value._id,
            label: value.ten_qt
        })
    })
    const handleChangeStep = async (value) => {
        dispatch(actions.setStep((await stepService.getById(value)).data))
        setPriceStep(state.step.don_gia_qt);
        setUnitStep(state.step.don_vi_tinh);
    }
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item._id !== key);
        const data = dataTemp.filter((item) => item !== key);
        setDataSource(newData);
        setDataTemp(data)
    };
    const handleAdd = (values) => {
        setOpen(false);
        setDataSource([...dataSource, {
            ...values,
            periodName: state.step.ten_qt,
            price: state.step.don_gia_qt,
            unit: state.step.don_vi_tinh
        }]);
        setDataTemp([...dataTemp, values]);
    }
    const onFinish = (values) => {
        const newVal = values.periodName;
        form.resetFields();
        handleAdd(newVal);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const columns = [
        {
            title: 'Tên quy trình',
            dataIndex: 'periodName',
            width: 650,
            ellipsis: {
                showTitle: false,
            },
            render: (step) => (
                <Tooltip placement="topLeft" title={step}>
                    {step}
                </Tooltip>
            ),
        },
        {
            title: 'Đơn vị tính',
            dataIndex: 'unit',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
        },
        {
            title: 'Thao tác',
            dataIndex: 'operation',
            render: (_, record) => (
                <Space split={<Divider type="vertical" />}>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
                        <Button>Delete</Button>
                    </Popconfirm>
                </Space>)
        },
    ];

    return (
        <>
            <Button type="primary" onClick={() => {
                setOpen(true)
            }}
            >
                Thêm mới
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
                onCancel={() => setOpen(false)}
            >
                <Form
                    name="basic"
                    form={form}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    fields={[
                        {
                            name: ["price"],
                            value: priceStep
                        },
                        {
                            name: ["unit"],
                            value: unitStep
                        }
                    ]}

                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên quy tình"
                        name="periodName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Select options={arrStep} onChange={handleChangeStep} />
                    </Form.Item>
                    <Form.Item
                        label="Đơn giá"
                        name="price"
                    >
                        <InputNumber
                            style={{
                                width: 400,
                            }}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            addonAfter='VNĐ'
                        />
                    </Form.Item>
                    <Form.Item
                        label="Đơn vị tính"
                        name="unit"
                    >
                        <Input />
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

export default FormAddPeriod;