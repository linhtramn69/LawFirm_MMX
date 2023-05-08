import { Avatar, Button, Col, DatePicker, Form, Input, Radio, Row, Switch } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { avatar } from "~/assets/images";
import { userService } from '../../../services/index';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
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
function FormCustomer({ props }) {
    let { id } = useParams();
    let navigate = useNavigate();
    let btn = ['Thêm mới', 'Cập nhật'];
    const user = { ...props }
    const [form] = Form.useForm();
    const handleUpdate = async (data) => {
        try {
            if (window.confirm(`Bạn muốn cập nhật lại người dùng ${user.ho_ten} ?`)) {
                await userService.update(id, data);
                navigate(`/admin/customer/${id}`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleAdd = async (data) => {
        try {
            let result = (await userService.create(data)).data;
            navigate(`/admin/customer/${result.insertedId}`);
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
            nghe_nghiep: values.job,
            dia_chi: values.address,
            loai_user: values.typeOfUser,
            website_cong_ty: values.website,
            account: {
                sdt: values.phone,
                mat_khau: values.password,
                quyen: 0
            },
            active: values.active,
            
        }
       
        if (props)
            handleUpdate(data);
        else handleAdd(data);
    }
    console.log(typeof user.ngay_sinh);
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
                            <DatePicker format={'DD-MM-YYYY'}/>
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 8, push: 1 }}>
                        <Form.Item
                            name="mobile"
                            label="Số điện thoại"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 8 }}>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 8, push: 1 }}>
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

                </Row>

                <Row>
                    <Col md={{ span: 8 }}>
                        <Form.Item
                            label="Nghề nghiệp"
                            name="job"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 8, push: 1 }}>
                        <Form.Item
                            name="website"
                            label="Website"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 8, push: 1 }}>

                    </Col>
                </Row>

                <Row>
                    <Col md={{ span: 8 }}>
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

                    <Col md={{ span: 8, push: 1 }}>
                        <Form.Item
                            label="Loại tài khoản"
                            name="typeOfUser"
                        >
                            <Radio.Group value={user.loai_user}>
                                <Radio value={'Cá nhân'}>Cá nhân</Radio>
                                <Radio value={'Doanh nghiệp'}>Doanh nghiệp</Radio>
                            </Radio.Group>
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

export default FormCustomer;