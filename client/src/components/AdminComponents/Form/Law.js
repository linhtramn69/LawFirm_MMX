import { Avatar, Button, Col, DatePicker, Form, Input, Radio, Row, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { avatar } from "~/assets/images";
import { boPhanService, chucVuService, typeServiceService, userService } from '../../../services/index';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useStore } from "~/store";
dayjs.extend(customParseFormat);

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        md: {
            span: 8,
        },
    }
};
function FormLaw({ props }) {

    let { id } = useParams();
    let navigate = useNavigate();
    let btn = ['Thêm mới', 'Cập nhật'];
    const user = { ...props }
    const [form] = Form.useForm();
    const [state, dispatch] = useStore()
    const [chucVu, setChucVu] = useState([]);
    const [boPhan, setBoPhan] = useState([]);
    const [showBoss, setShowBoss] = useState(false);
    const [showChuyenMon, setShowChuyenMon] = useState(false);
    const [typeService, setTypeService] = useState([]);
    const [arrType, setArrType]= useState([]);
    const [arrLaws, setArrLaw] = useState([]);
    const [law, setLaw] = useState([]);
    let arrLaw = [];
    let arrTypeService = [];

    useEffect(() => {
        const getBoPhan = async () => {
            setBoPhan((await boPhanService.get()).data)
        };
        const getTypeService = async () => {
            setTypeService((await typeServiceService.get()).data)
        };
        const getLaw = async () => {
            setLaw((await userService.get()).data)
        }
        getLaw();
        getTypeService();
        getBoPhan();
    }, []);

    const handleSelectedBoPhan = async (e) => {
        setChucVu((await chucVuService.getByBoPhan({ bo_phan: e })).data)
    }
    const arrBoPhan = boPhan.map((value) => {
        return {
            label: value.ten_bo_phan,
            value: value._id
        }
    });
    const arrChucVu = chucVu.map((value) => {
        return {
            label: value.ten_chuc_vu,
            value: value._id
        }
    });
    const handleSelectedChucVu = async (e) => {
        if (e === 'TL02') {
            setShowBoss(true);
            setShowChuyenMon(false);
            law.map(item => {
                if (item.account.quyen != 0 && item.chuc_vu._id === 'LS02') {
                    arrLaw.push({
                        label: item.ho_ten,
                        value: item._id
                    })
                }
            })
            setArrLaw(arrLaw);
        }
        else if (e === 'LS02') {
            setShowChuyenMon(true);
            setShowBoss(false);
            typeService.map((item) => {
                arrTypeService.push({
                    label: item.ten_linh_vuc,
                    value: item._id
                })
            })
            setArrType(arrTypeService);
        }
    }
    const handleUpdate = async (data) => {
        try {
            if (window.confirm(`Bạn muốn cập nhật lại người dùng ${user.ho_ten} ?`)) {
                await userService.update(id, data);
                navigate(`/admin/staff/${id}`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleAdd = async (data) => {
        try {
            let result = (await userService.create(data)).data;
            navigate(`/admin/staff/${result.insertedId}`);
        }
        catch (error) {
            console.log(error);
        }
    }
    const onFinish = (values) => {
        if (values.active === undefined)
            values.active = 1;

        const data = {
            ho_ten: values.name,
            ngay_sinh: values.dateOfBirth.format('DD-MM-YYYY'),
            email: values.email,
            dia_chi: values.address,
            account: {
                sdt: values.phone,
                mat_khau: values.password,
                quyen: 2
            },
            active: values.active,
            chuc_vu: values.chucVu,
            bo_phan: values.boPhan,
            boss: values.boss,
            chuyen_mon: values.type
        }
        if (props)
            handleUpdate(data);
        else handleAdd(data);
    }
    
    return (
        <>
            <Form
                {...formItemLayout}
                fields={
                    props ?
                        [
                            {
                                name: ["name"],
                                value: user.ho_ten,
                            },
                            {
                                name: ["dateOfBirth"],
                                value: dayjs(user.ngay_sinh, 'DD-MM-YYYY'),
                            },
                            {
                                name: ["address"],
                                value: user.dia_chi,
                            },
                            {
                                name: ["phone"],
                                value: user.account.sdt,
                            },
                            {
                                name: ["email"],
                                value: user.email,
                            },
                            {
                                name: ["job"],
                                value: user.nghe_nghiep,
                            },
                            {
                                name: ["typeOfUser"],
                                value: user.loai_user,
                            },
                            {
                                name: ["website"],
                                value: user.website_cong_ty,
                            },
                            {
                                name: ["password"],
                                value: user.account.mat_khau,
                            },
                            {
                                name: ["active"],
                                value: user.active,
                            },
                            {
                                name: ["chucVu"],
                                value: user.chuc_vu.ten_chuc_vu,
                            },
                            {
                                name: ["boPhan"],
                                value: user.bo_phan.ten_bo_phan,
                            },
                        ]
                        :
                        [
                            {
                                name: ["typeOfUser"],
                                value: 'Cá nhân',
                            },
                            {
                                name: ["active"],
                                value: true,
                            }
                        ]
                }
                form={form}
                onFinish={onFinish}
            >
                <Row>
                    <Col md={{ span: 8 }}>
                        <Form.Item
                            label="Họ tên"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập họ tên!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 8, push: 1 }}>
                        <Form.Item
                            label="Di động"
                            name="phone"
                            rules={[
                                {
                                    type: 'phone',
                                    message: 'Số điện thoại không hợp lệ!',
                                },
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số điện thoại!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 4, push: 3 }}>
                        <div className="edit-img">
                            <Avatar size={150} style={{
                                position: 'absolute'
                            }} src={avatar.user} />

                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 8 }}>
                        <Form.Item
                            name="dateOfBirth"
                            label="Ngày sinh"
                        >
                            <DatePicker format={'DD-MM-YYYY'} />
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 8, push: 1 }}>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 8 }}>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Email không hợp lệ!',
                                },
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 8, push: 1 }}>
                        <Form.Item
                            label="Mật khẩu tài khoản"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu tài khoản!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 8 }}>
                        <Form.Item
                            name="boPhan"
                            label="Bộ phận"
                        >
                            <Select
                                options={arrBoPhan}
                                onChange={handleSelectedBoPhan}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 8, push: 1 }}>
                        <Form.Item
                            label="Chức vụ"
                            name="chucVu"
                        >
                            <Select
                                options={arrChucVu}
                                onChange={handleSelectedChucVu}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 8 }}>
                        <Form.Item
                            label='Hoạt động'
                            name="active"
                            valuePropName="checked"
                            initialValue={user.active}
                        >
                            <Switch checkedChildren="Hoạt động" unCheckedChildren="Khoá" success="false" />
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 8, push: 1 }}>
                        {showBoss
                            ? <Form.Item
                                label="Thuộc cấp"
                                name="boss"
                            >
                                <Select
                                    options={arrLaws}
                                />
                            </Form.Item> : <></>}
                        {showChuyenMon
                            ? <Form.Item
                                label="Chuyên môn"
                                name="type"
                            >
                                <Select
                                    mode="multiple"
                                    options={arrType}
                                />
                            </Form.Item> : <></>}
                    </Col>
                </Row>
                <Form.Item
                    wrapperCol={{
                        offset: 20,
                    }}
                >
                    <Button type="primary" htmlType="submit" className="btn-primary">{props ? btn[1] : btn[0]}</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default FormLaw;