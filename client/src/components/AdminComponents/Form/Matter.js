import { Button, Col, Form, Input, Radio, Row, Space, Tabs, Select, Divider, InputNumber, Table } from "antd";
import { useEffect, useState } from "react";
import { TableAddFile } from "~/components";
import FormAddTask from "./FormAddTask";
import FormAddPeriod from "./FormAddPeriod";
import FormAddFee from "./FormAddFee";
import { accountingEntryService, matterService, serviceService, timePayService, typePayService, typeServiceService, userService } from '~/services/index';
import { useNavigate } from "react-router-dom";
import { useStore, useToken } from "~/store";
import FormAddFile from "./FormAddFile";
import FormAccountingEntry from "./FormAccountingEntry";

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
const label = [
    'Nội bộ được phép truy cập',
    'Khách hàng được phép truy cập'
]
const columnsBill = [

    {
        title: 'Ngày lập',
        dataIndex: 'dateCreate',
        width: 200
    },
    {
        title: 'Nhân viên',
        dataIndex: 'staff',
        width: 200
    },
    {
        title: 'Tài khoản bút toán',
        dataIndex: 'stk_bt',
        width: 150
    },
    {
        title: 'Chủ tài khoản bút toán',
        dataIndex: 'ctk_bt',
        width: 150
    },
    {
        title: 'Tài khoản nhận',
        dataIndex: 'stk_nhan',
        width: 150
    },
    {
        title: 'Chủ tài khoản nhận',
        dataIndex: 'ctk_nhan',
        width: 150
    },
    {
        title: 'Tổng',
        dataIndex: 'tong_tien',
        width: 150
    },
];
function FormMatter({ props }) {

    const matter = { ...props }
    const [state, dispatch] = useStore();
    const arrCustomer = [];
    const arrStaff = [];
    const arrCustomerAccess = [];
    const arrStaffAccess = [];
    const [users, setUsers] = useState([]);
    const [value, setValue] = useState(matter ? 1 : 0);
    const [typeServices, setTypeServices] = useState([]);
    const [services, setServices] = useState([{ ...matter.dich_vu }]);
    const [access, setAccess] = useState([]);
    const [typePay, setTypePay] = useState([]);
    const [timePay, setTimePay] = useState([]);
    const [type, setType] = useState(
        matter._id ? matter.linh_vuc._id : null
    );
    const { token } = useToken();
    let navigate = useNavigate();

    useEffect(() => {
        const getService = async () => {
            setServices((await serviceService.getByType(type)).data)
        }
        getService()
    }, [type])
    useEffect(() => {
        const getTypeServices = async () => {
            setTypeServices((await typeServiceService.get()).data)
        };
        const getUser = async () => {
            setUsers((await userService.get()).data)
        }
        const getAccess = async () => {
            if (matter.truy_cap) {
                const arr1 = matter.truy_cap.nhan_vien;
                const arr2 = matter.truy_cap.khach_hang;
                setAccess((await userService.getByMatter(arr1.concat(arr2))).data)
            }
        }
        const getTypePay = async () => {
            setTypePay((await typePayService.get()).data)
        };
        const getTimePay = async () => {
            setTimePay((await timePayService.get()).data)
        };
        getTimePay();
        getTypePay();
        getAccess();
        getUser();
        getTypeServices();
    }, []);

    users.map((value) => {
        if (value.account.quyen === 0) {
            arrCustomer.push({
                value: value._id,
                label: value.ho_ten
            })
        }
        else if (value.chuc_vu._id === 'LS02' && value.chuyen_mon.includes(type)) {
            arrStaff.push({
                value: value._id,
                label: value.ho_ten
            })
        }
    })
    const arrTypeService = typeServices.map((value) => {
        return ({
            value: value._id,
            label: value.ten_linh_vuc
        })
    })
    const arrService = services.map((value) => {
        return ({
            value: value._id,
            label: value.ten_dv
        })
    })
    const arrTypePay = typePay.map((value) => {
        return ({
            value: value._id,
            label: value.ten
        })
    })
    const arrTimePay = timePay.map((value) => {
        return ({
            value: value._id,
            label: value.ten
        })
    })
    access.map((value) => {
        if (value.account.quyen !== 0) {
            arrStaffAccess.push(value._id)
        } else arrCustomerAccess.push(value._id)
    })
    const handleChangeTypeService = async (value) => {
        setType(value)
        matter._id ? matter.linh_vuc._id = value : matter.linh_vuc = null
    };
    const onAccessChange = (e) => {
        setValue(e.target.value);
    };
    const handleAdd = async (data) => {
        try {
            let result = (await matterService.create(data)).data;
            navigate(`/admin/matter/${result.insertedId}`);
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleUpdate = async (data) => {
        const newData = {
            ...data,
            truy_cap: {
                khach_hang: data.customerAccess,
                nhan_vien: data.staffAccess,
            }
        }
        try {
            if (window.confirm(`Bạn muốn cập nhật lại vụ việc ${matter.ten_vu_viec} ?`)) {
                await matterService.update(matter._id, newData);
                navigate(`/admin/matters/${matter._id}`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const onFinish = (values) => {
        const newData = {
            ...values,
            chiet_khau_hoa_hong: values.chiet_khau_hoa_hong
                ? values.chiet_khau_hoa_hong : 0,
            truy_cap: {
                khach_hang: values.customerAccess,
                nhan_vien: values.staffAccess
            },
            status: 0,
            ngay_lap: new Date(),
            tai_lieu: matter._id ? state.files : null,
            cong_viec: matter._id ? state.tasks : null,
            phi_co_dinh: matter._id ? state.steps : null,
            chi_phi_phat_sinh: matter._id ? state.fees : null
        }
       
        matter._id ? handleUpdate(newData) : handleAdd(newData)
    }


    return (
        <>
            <Form
                {...formItemLayout}
                onFinish={onFinish}
                fields={props ? [
                    {
                        name: ['ten_vu_viec'],
                        value: matter.ten_vu_viec
                    },
                    {
                        name: ['linh_vuc'],
                        value: matter.linh_vuc._id
                    },
                    {
                        name: ['dich_vu'],
                        value: matter.dich_vu._id
                    },
                    {
                        name: ['khach_hang'],
                        value: matter.khach_hang._id
                    },
                    {
                        name: ['luat_su'],
                        value: matter.luat_su._id,
                    },
                    {
                        name: ['dieu_khoan_thanh_toan'],
                        value: matter.dieu_khoan_thanh_toan._id
                    },
                    {
                        name: ['phuong_thuc_tinh_phi'],
                        value: matter.phuong_thuc_tinh_phi._id
                    },
                    {
                        name: ['chiet_khau_hoa_hong'],
                        value: matter.chiet_khau_hoa_hong
                    },
                    {
                        name: ['tong_tien'],
                        value: matter.tong_tien
                    },
                    {
                        name: ['show'],
                        value: matter.truy_cap.khach_hang ? 1 : 0
                    },
                    {
                        name: ['staffAccess'],
                        value: matter.truy_cap.nhan_vien
                    },
                    {
                        name: ['customerAccess'],
                        value: matter.truy_cap.khach_hang
                    },
                ] : null}
            >
                <Form.Item
                    wrapperCol={{
                        offset: 20,
                    }}
                >
                    <Button type="primary" htmlType="submit" className="btn-primary">Lưu thông tin</Button>
                </Form.Item>
                <Row>
                    <Col span={12} pull={2}>
                        <Form.Item
                            label="Tên vụ việc"
                            name="ten_vu_viec"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Lĩnh vực"
                            name="linh_vuc"
                        >
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
                                options={arrTypeService}
                                onChange={handleChangeTypeService}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Dịch vụ"
                            name="dich_vu"
                        >
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
                                options={arrService}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12} pull={2}>
                        <Form.Item
                            label="Khách hàng"
                            name="khach_hang"
                        >
                            <Select
                                disabled={token.account.quyen !== 1}
                                showSearch
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                options={arrCustomer}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Luật sư phụ trách"
                            name="luat_su"
                        >
                            <Select
                                disabled={token.account.quyen !== 1}
                                showSearch
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                options={arrStaff}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Tabs style={{ width: '100%' }} type="card" defaultActiveKey={token.account.quyen === 1 ? '1' : '2'} items={[
                    {
                        key: '1',
                        label: `Thiết lập`,
                        disabled: token.account.quyen !== 1 ? true : false,
                        children: <Row style={{ paddingTop: 30 }}>
                            <Col md={{ span: 10 }}>
                                <Form.Item
                                    name='dieu_khoan_thanh_toan'
                                    label="Điều khoản thanh toán">
                                    <Select options={arrTimePay} />
                                </Form.Item>
                                <Form.Item
                                    name='phuong_thuc_tinh_phi'
                                    label="Phương thức tính phí">
                                    <Select options={arrTypePay} />
                                </Form.Item>
                                <Form.Item
                                    name='chiet_khau_hoa_hong'
                                    label="Chiết khấu hoa hồng">
                                    <InputNumber
                                        bordered='false'
                                        min={0}
                                        max={100}
                                        formatter={(value) => `${value}%`}
                                        parser={(value) => value.replace('%', '')}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name='tong_tien'
                                    label="Tổng tiền">
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
                            </Col>
                            <Col md={{ span: 12 }}>
                                <Form.Item
                                    label="Hiển thị"
                                    name="show"
                                >
                                    <Radio.Group onChange={onAccessChange} value={value}>
                                        <Space direction="vertical">
                                            <Radio value={0}>Tài khoản nội bộ được mời</Radio>
                                            <Radio value={1}>Tài khoản nội bộ và khách hàng được mời</Radio>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>
                                {(() => {
                                    if (value < 2) {
                                        const showCustomer = <Form.Item
                                            label={label[1]}
                                            name="customerAccess"
                                        >
                                            <Select
                                                mode="multiple"
                                                showSearch
                                                allowClear
                                                style={{
                                                    width: '100%',
                                                }}
                                                options={arrCustomer}
                                            />
                                        </Form.Item>
                                        const showStaff = <Form.Item
                                            label={label[0]}
                                            name="staffAccess"
                                        >
                                            <Select
                                                mode="multiple"
                                                showSearch
                                                allowClear
                                                style={{
                                                    width: '100%',
                                                }}
                                                options={arrStaff}
                                            />
                                        </Form.Item>
                                        return (
                                            value === 0 ? showStaff : <>{showStaff} {showCustomer}</>
                                        )
                                    }
                                })()}
                            </Col>
                        </Row>,
                    },
                    {
                        key: '2',
                        label: `Giấy tờ`,
                        children: <FormAddFile />,
                        disabled: matter ? false : true
                    },
                    {
                        key: '3',
                        label: `Liên hệ`,
                        children: <TableAddFile />,
                        disabled: matter ? false : true
                    },
                    {
                        key: '4',
                        label: `Công việc`,
                        children: <FormAddTask props={matter.cong_viec} />,
                        disabled: matter ? false : true
                    },
                    
                    {
                        key: '6',
                        label: `Chi phí`,
                        children: <FormAddFee props={matter.chi_phi_phat_sinh} />,
                        disabled: matter ? false : true
                    },
                    {
                        key: '7',
                        label: `Hoá đơn khách hàng`,
                        children:
                            <>
                                <Table pagination={false} columns={columnsBill} />
                                <br />
                                <Space direction="vertical" style={{ textAlign: 'end', float: 'right' }}>
                                    <span>
                                        <b style={{ marginRight: 15 }}>Tổng tiền vụ việc :</b>
                                        {`${state.matter.tong_tien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'}
                                    </span>
                                    <span>
                                        <b style={{ marginRight: 15 }}>Đã thanh toán :</b>
                                        {`${state.matter.tong_tien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'}
                                    </span>
                                    <span>
                                        <b style={{ marginRight: 15 }}>Số tiền còn lại:</b>
                                        {`${state.matter.tong_tien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'}
                                        </span>
                                </Space>
                            </>,
                    }
                ]} />
            </Form>
        </>
    );
}

export default FormMatter;