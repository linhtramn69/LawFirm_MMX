import { Avatar, Badge, Button, Card, Col, Descriptions, Divider, Image, List, Modal, Row, Space, Table, Tabs, Tag, Tooltip, Typography } from "antd";
import { faHouse, faReceipt, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { billService, contactService, feeService, matterService, periodService, stepService, taskService, userService } from "~/services";
import { actions, useStore, useToken } from "~/store";
import { avatar } from "~/assets/images";
import moment from "moment";
import FormAddFile from "~/components/AdminComponents/Form/FormAddFile";
import {
    UsbFilled,
    EditOutlined
} from '@ant-design/icons';
import ListHistory from "./ListHistoryMatter";
const url = ['', 'admin', 'staff'];
const url2 = ['', 'admin', 'ke-toan'];
const statusTask = ['Đã giao', 'Đã hoàn thành', 'Tạm ngưng'];
const statusFee = ['Đã trình', 'Đã duyệt', 'Đã kết toán', 'Đã huỷ'];
const statusText = ['Đang thực hiện','Đã trình', 'Hoàn thành'];

const columnsStep = [
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
];

const columnsFees = [
    {
        title: 'Ngày lập',
        dataIndex: 'ngay_lap',
        width: 200
    },
    {
        title: 'Mô tả',
        dataIndex: 'mo_ta',
        width: 400
    },
    {
        title: 'Nhân viên',
        dataIndex: 'staff',
        width: 300
    },
    {
        title: 'Tổng',
        dataIndex: 'don_gia',
        width: 200
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        render: (status) => (
            <Tag
                color={status === 0 ? 'volcano' : status === 1 ? 'geekblue' : status === 2 ? 'success' : 'error'}
            >
                {statusFee[status]}
            </Tag>
        ),
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
        title: 'Tài khoản khách',
        dataIndex: 'stk_khach',
        width: 150
    },
    {
        title: 'Chủ tài khoản khách',
        dataIndex: 'ctk_khach',
        width: 150
    },
    {
        title: 'Tài khoản công ty',
        dataIndex: 'stk_cty',
        width: 150
    },
    {
        title: 'Chủ tài khoản công ty',
        dataIndex: 'ctk_cty',
        width: 150
    },
    {
        title: 'Tổng',
        dataIndex: 'tong_tien',
        width: 150
    },
];
const detail = (data) => Modal.info({
    title: 'Chi tiết hoá đơn',
    width: 700,
    content: (
        <>
            <Descriptions
                style={{ marginTop: 10 }}
                column={{
                    lg: 4,
                    md: 4,
                    sm: 2,
                }}
            >
                <Descriptions.Item span={2} label="Mô tả">{data.mo_ta}</Descriptions.Item>
                <Descriptions.Item span={2} label="Đơn giá">{data.don_gia}</Descriptions.Item>
                <Descriptions.Item span={2} label="Mã số hoá đơn">{data.idHD}</Descriptions.Item>
                <Descriptions.Item span={2} label="Ngày lập hoá đơn">{data.ngay_lap}</Descriptions.Item>
                <Descriptions.Item span={4} label="Trạng thái"> <Badge status=
                    {data.status === 0 ? 'warning'
                        : data.status === 1 ? 'processing'
                            : data.status === 2 ? 'success' : 'error'}
                    text={statusFee[data.status]} /></Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions
                style={{ marginTop: 10 }}
                column={{
                    lg: 4,
                    md: 4,
                    sm: 2,
                }}
                title="Thông tin người lập"
            >
                <Descriptions.Item span={2} label="Họ tên">{data.staff}</Descriptions.Item>
                <Descriptions.Item span={2} label="Số điện thoại">{data.sdt}</Descriptions.Item>
                <Descriptions.Item span={4} label="Email">{data.email}</Descriptions.Item>
                <Descriptions.Item span={4} label="Ngân hàng">{data.nameBank}</Descriptions.Item>
                <Descriptions.Item span={2} label="Tên tài khoản">{data.nameCreditCard}</Descriptions.Item>
                <Descriptions.Item span={2} label="Số tài khoản">{data.numberCreditCard}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Image src={data.hinh_anh} width={150} />

        </>
    ),
    onOk() { },
});

function MatterDetail() {

    let { id } = useParams();
    const [state, dispatch] = useStore();
    const [access, setAccess] = useState([]);
    const [dataTask, setDataTask] = useState([]);
    const [dataStep, setDataStep] = useState([]);
    const [dataContact, setDataContact] = useState([]);
    const [dataFee, setDataFee] = useState([]);
    const [dataPeriod, setDataPeriod] = useState([]);
    const [dataBill, setDataBill] = useState([]);
    const { token } = useToken();

    useEffect(() => {
        const getMatter = async () => {
            const result = (await matterService.getById(id)).data
            dispatch(actions.setMatter(result))
        }
        const getTask = async () => {
            const result = (await taskService.findByMatter({ id: id })).data
            dispatch(actions.setTasks(result))
        }
        const getFee = async () => {
            const result = (await feeService.findByMatter({ id: id })).data
            dispatch(actions.setFees(result))
        }
        const getBill = async () => {
            const result = (await billService.findByMatter({ id: id })).data
            dispatch(actions.setBills(result))
        }
        const getContact = async () => {
            const rs = (await contactService.findByMatter({ vu_viec: id })).data
            dispatch(actions.setContacts(rs))
        }
        const getPeriods = async () => {
            const rs = (await periodService.findByMatter(id)).data
            dispatch(actions.setPeriods(rs))
        }
        getPeriods()
        getMatter()
        getTask()
        getFee()
        getBill()
        getContact()
    }, [id, dispatch])
    useEffect(() => {
        const getAccess = async () => {
            const arr1 = state.matter.truy_cap.nhan_vien;
            const arr2 = state.matter.truy_cap.khach_hang ? state.matter.truy_cap.khach_hang : [];
            setAccess(
                !state.matter.truy_cap.nhan_vien && !state.matter.truy_cap.khach_hang ? []
                    : (await userService.getByMatter(arr1.concat(arr2))).data)
        }
        dispatch(actions.setFiles(state.matter.tai_lieu))
        dispatch(actions.setSteps(state.matter.phi_co_dinh))
        getAccess();
    }, [state.matter])

    useEffect(() => {
        const dataTask = state.tasks ? state.tasks.map((value) => {
            return ({
                _id: value._id,
                key: value.key,
                ten_cong_viec: value.ten_cong_viec,
                nguoi_phu_trach: value.nguoi_phu_trach.ho_ten,
                han_chot_cong_viec: moment(value.han_chot_cong_viec).format('DD-MM-YYYY LT'),
                ngay_giao: moment(value.ngay_giao).format('DD-MM-YYYY LT'),
                status: value.status
            })
        }) : []
        const showDataSource = async () => {
            const rs = (await stepService.getByIdChiPhiCoDinh(state.steps)).data
            const dataShow = rs.map((value) => {
                return {
                    _id: value._id,
                    periodName: value.ten_qt,
                    price: value.don_gia_qt,
                    unit: value.don_vi_tinh
                }
            })
            setDataStep(dataShow);
        }
        const dataFee = state.fees ? state.fees.map((value) => {
            return ({
                key: value.key,
                ngay_lap: moment(value.ngay_lap).format('DD-MM-YYYY LT'),
                mo_ta: value.mo_ta,
                staff: value.nhan_vien.ho_ten,
                sdt: value.nhan_vien.account.sdt,
                email: value.nhan_vien.email,
                bo_phan: value.nhan_vien.bo_phan.ten_bo_phan,
                don_gia: `${value.don_gia}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ',
                status: value.status,
                idHD: value.so_hoa_don,
                nameBank: value.tai_khoan.ngan_hang,
                nameCreditCard: value.tai_khoan.chu_tai_khoan,
                numberCreditCard: value.tai_khoan.so_tai_khoan,
                hinh_anh: value.hinh_anh
            })
        }) : []
        const dataBill = state.bills.length > 0 ? state.bills.map((value, index) => {
            if (value.loai_hoa_don == 'KH')
                return ({
                    key: index + 1,
                    _id: value._id,
                    dateCreate: moment(value.ngay_lap).format('DD-MM-YYYY LT'),
                    staff: value.nhan_vien_lap_hoa_don.ho_ten,
                    stk_khach: value.tai_khoan_khach.so_tai_khoan,
                    ctk_khach: value.tai_khoan_khach.chu_tai_khoan,
                    stk_cty: value.tai_khoan_cong_ty.so_tai_khoan,
                    ctk_cty: value.tai_khoan_cong_ty.chu_tai_khoan,
                    tong_tien: `${value.tong_gia_tri}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'

                })
        }) : []
        const dataContacts = state.contacts.map((value, index) => {
            return ({
                key: index,
                _id: value._id,
                fullname: value.ho_ten,
                sex: value.gioi_tinh,
                year: moment(value.nam_sinh).format('YYYY'),
                sdt: value.sdt,
                address: value.dia_chi,
                relationship: value.quan_he
            })
        })
        const dataPeriod = state.periods.map((value, index) => {
            return ({
                key: index,
                _id: value._id,
                name: value.ten_qt,
                mo_ta: value.mo_ta,
                status: value.status,
                vu_viec: value.vu_viec
            })
        })
        setDataPeriod(dataPeriod)
        setDataContact(dataContacts)
        setDataBill(dataBill)
        setDataTask(dataTask);
        showDataSource();
        setDataFee(dataFee);
    }, [state.tasks, state.steps, state.fees, state.contacts, state.periods])
    const columnsTask = [
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
                color={status === 0 ? 'geekblue' : status === 1 ? 'volcano' : status === 2 ? 'success' : '#faad14'}
            >
                
                { status != -1 ?  statusText[status] : "Tạm ngưng"}
            </Tag>
            ),
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
    const columnsContact = [
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
        }
    ];
    const columnsPeriod = [
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

    ];
    const total_bill = []
    state.bills.map((value) => {
        if (value.loai_hoa_don == 'KH')
            total_bill.push(value.tong_gia_tri)
    })
    if (total_bill.length > 0) {
        var result = total_bill.reduce((total, currentValue) => {
            if (currentValue) {

                return total + currentValue
            }
        })
    }
    console.log(state.contacts);
    return (
        <>
            {
                token.account.quyen != 0 ?
                    <Space direction="horizontal">
                        {
                            token.account.quyen == 1 || token.chuc_vu._id == 'KT02' ?
                                <Link to={`/${url2[token.account.quyen]}/bill/add/${state.matter._id}`}>
                                    <Button style={{ marginBottom: 20 }} className="btn-cyan" icon={<UsbFilled />} block>Hóa đơn mới</Button>
                                </Link>
                                : <></>
                        }
                        {
                            state.matter.status !== 1 && token.chuc_vu._id != 'TL02' && token.chuc_vu._id != 'KT02' || token.account.quyen == 1 ?
                                <Link to={`/${url[token.account.quyen]}/matter/edit/${id}`}>
                                    <Button style={{ marginBottom: 20 }} className="btn-cyan" icon={<EditOutlined />}>Chỉnh sửa</Button>
                                </Link>
                                : <></>
                        }
                    </Space> : <></>
            }



            {state.matter._id ?
                <><Badge.Ribbon
                    style={{
                        width: 200,
                        height: 40,
                        textAlign: 'center',
                        lineHeight: 3,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        color: '#000'
                    }}
                    text={
                        state.matter.status_tt == 0 ? "Chưa thanh toán" : state.matter.status_tt == 1 ? "Đang thanh toán"
                            : "Đã thanh toán"
                    }
                    color={
                        state.matter.status_tt == 0 ? "vocalno" : state.matter.status_tt == 1 ? "greekblue"
                            : "green"
                    }
                >
                    <Card
                        title={
                            state.matter.status === 0 ? <Badge status="processing" text="Đang thực hiện" />
                                : state.matter.status === 1 ? <Badge status="success" text="Hoàn thành" />
                                    : <Badge status="warning" text="Tạm ngưng" />
                        }
                        extra={
                            <Space split={<Divider type="vertical" />}>
                                <Typography.Link><FontAwesomeIcon icon={faHouse} /> Vụ việc</Typography.Link>
                                <Typography.Link><FontAwesomeIcon icon={faTasks} /> Hợp đồng</Typography.Link>
                                <Typography.Link><FontAwesomeIcon icon={faTasks} /> Báo giá</Typography.Link>
                                <Typography.Link><FontAwesomeIcon icon={faReceipt} /> Hóa đơn</Typography.Link>

                            </Space>
                        }
                    >
                        <Descriptions style={{ paddingLeft: 40 }} column={{
                            md: 3,
                        }}>

                            <Descriptions.Item label="Tên vụ việc">{state.matter.ten_vu_viec}</Descriptions.Item>
                            <Descriptions.Item label="Lĩnh vực">{state.matter.linh_vuc.ten_linh_vuc}</Descriptions.Item>
                            <Descriptions.Item label="Dịch vụ">{state.matter.dich_vu.ten_dv}</Descriptions.Item>
                        </Descriptions>
                        <Divider />
                        <Row>
                            <Col md={{ span: 10, push: 1 }}>
                                <Descriptions
                                    title="Luật sư phụ trách"
                                    column={{
                                        md: 4
                                    }}>

                                    <Descriptions.Item span={4} label="Họ tên">{state.matter.luat_su.ho_ten}</Descriptions.Item>
                                    <Descriptions.Item span={2} label="Số điện thoại">{state.matter.luat_su.account.sdt}</Descriptions.Item>
                                    <Descriptions.Item span={2} label="Email">{state.matter.luat_su.email}</Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col md={{ span: 10, push: 3 }}>
                                <Descriptions
                                    title="Thông tin khách hàng"
                                    column={{
                                        md: 4
                                    }}>

                                    <Descriptions.Item span={4} label="Họ tên">{state.matter.khach_hang.ho_ten}</Descriptions.Item>
                                    <Descriptions.Item span={2} label="Số điện thoại">{state.matter.khach_hang.account.sdt}</Descriptions.Item>
                                    <Descriptions.Item span={2} label="Email">{state.matter.khach_hang.email}</Descriptions.Item>
                                </Descriptions>
                            </Col>
                        </Row>
                        <Divider />
                        <Tabs type="card" defaultActiveKey="0" items={[
                            {
                                key: 0,
                                label: 'Thiết lập',
                                children:
                                    <Descriptions
                                    >
                                        <Row style={{ paddingTop: 20 }}>
                                            <Col md={{ span: 10, push: 1 }}>
                                                <Descriptions
                                                    title="Thiết lập chi phí"
                                                    column={{
                                                        md: 4
                                                    }}>

                                                    <Descriptions.Item span={4} label="Điều khoản thanh toán">
                                                        {
                                                            state.matter.dieu_khoan_thanh_toan.ten == 0 ? "Thanh toán ngay"
                                                                : state.matter.dieu_khoan_thanh_toan.ten == -1 ? "Thanh toán ngay khi hoàn thành"
                                                                    : state.matter.dieu_khoan_thanh_toan.ten + " ngày"
                                                        }
                                                    </Descriptions.Item>
                                                    {/* <Descriptions.Item span={4} label="Phương thức tính phí">
                                                        {state.matter.phuong_thuc_tinh_phi.ten}
                                                    </Descriptions.Item> */}
                                                    <Descriptions.Item span={4} label="Chiết khấu hoa hồng">
                                                        {state.matter.chiet_khau_hoa_hong} %
                                                    </Descriptions.Item>
                                                    <Descriptions.Item span={4} label="Tổng tiền">
                                                        {`${state.matter.tong_tien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'}
                                                    </Descriptions.Item>
                                                </Descriptions>
                                            </Col>
                                            <Col md={{ span: 10, push: 3 }}>
                                                <Descriptions
                                                    title="Quyền truy cập"
                                                    column={{
                                                        md: 4
                                                    }}>
                                                </Descriptions>
                                                <List
                                                    dataSource={access}
                                                    renderItem={(item) => (
                                                        <List.Item key={item.ho_ten}>
                                                            <List.Item.Meta
                                                                avatar={<Avatar src={avatar.user} />}
                                                                title={<a href="https://ant.design">{item.ho_ten}</a>}
                                                                description={item.email}
                                                            />
                                                            <div>
                                                                {
                                                                    item.account.quyen === 0 ?
                                                                        <Tag color="blue">Khách hàng</Tag>
                                                                        : <Tag color="gold">Nhân viên</Tag>

                                                                }
                                                            </div>
                                                        </List.Item>
                                                    )}
                                                />
                                            </Col>
                                        </Row>

                                    </Descriptions>
                            },
                            {
                                key: '2',
                                label: `Giấy tờ`,
                                disabled: !(token.account.quyen == 1 || state.matter.luat_su._id == token._id || token.account.quyen == 0),
                                children: <FormAddFile props={1} />
                            },
                            {
                                key: '3',
                                label: `Liên hệ`,
                                children: <Table columns={columnsContact} dataSource={dataContact} />
                            },
                            {
                                key: '4',
                                label: `Công việc`,
                                children: <Table columns={columnsTask} dataSource={dataTask} />,
                            },
                            {
                                key: '5',
                                label: `Quy trình thực hiện`,
                                children: <Table columns={columnsPeriod} dataSource={dataPeriod} />,

                            },
                            {
                                key: '6',
                                label: `Chi phí`,
                                children: <Table columns={columnsFees} dataSource={dataFee} />,
                            },
                            {
                                key: '7',
                                label: `Hoá đơn khách hàng`,
                                children:
                                    <>
                                        <Table pagination={false} columns={columnsBill} dataSource={dataBill} />
                                        <br />
                                        <Space direction="vertical" style={{ textAlign: 'end', float: 'right' }}>
                                            <span>
                                                <b style={{ marginRight: 15 }}>Tổng tiền vụ việc :</b>
                                                {`${state.matter.tong_tien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'}
                                            </span>
                                            <span>
                                                <b style={{ marginRight: 15 }}>Đã thanh toán :</b>
                                                {`${result ? result : 0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'}
                                            </span>
                                            <span>
                                                <b style={{ marginRight: 15 }}>Số tiền còn lại:</b>
                                                {`${state.matter.tong_tien - (result ? result : 0)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'}
                                            </span>
                                        </Space>
                                    </>,
                            }
                        ]} />

                    </Card>
                </Badge.Ribbon>

                    <ListHistory props={state.matter.lich_su_chinh_sua} />
                </>

                : null
            }
        </>
    );
}

export default MatterDetail;