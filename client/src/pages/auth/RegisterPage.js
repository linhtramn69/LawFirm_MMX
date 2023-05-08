import {
    Cascader,
    Checkbox,
    Form,
    Input,
    Select,
    Menu,
    DatePicker
} from "antd";

import { Link, useNavigate } from "react-router-dom";
import "~/assets/style/AuthPage.scss"
import { userService } from '../../services/index';

function RegisterPage() {

    let navigate = useNavigate();
    const { Option } = Select;
    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    const onFinish = async (values) => {
        try {
            const data = {
                _id: values.sdt,
                ho_ten: values.hoTen,
                cccd: values.cccd,
                email: values.email,
                ngay_sinh: values.ngaySinh.format('DD-MM-YYYY'),
                nghe_nghiep: values.ngheNghiep,
                dia_chi: values.diaChi,
                avatar: values.avatar,
                account: {
                    mat_khau: values.password,
                    sdt: values.sdt,
                    quyen: 0
                },
                chuc_vu: null,
                linh_vuc: null,
                bang_cap: null
            }
            await userService.create(data);
            navigate(`/login`);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="auth-page">
                <div className="auth-header" >
                    <h1>Đăng ký</h1>
                    <Menu
                        defaultSelectedKeys={"2"}
                        className="menu-auth"
                        mode="horizontal"
                    >
                        <Menu.Item key="1">
                            <Link to="/login">Đăng nhập</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/register">Đăng ký</Link>
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="auth-content">
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        initialValues={{
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '86',
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        scrollToFirstError
                    >

                        <Form.Item
                            name="hoTen"
                            label="Họ tên"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập họ tên!',
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    border: '1px solid var(--dark-blue)'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name="ngaySinh" label="Ngày tháng năm sinh" >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                            name="cccd"
                            label="CCCD / CMND"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số CCCD / CMND!',
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    border: '1px solid var(--dark-blue)'
                                }}
                            />
                        </Form.Item>
                         <Form.Item
                            name="diaChi"
                            label="Địa chỉ"
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng nhập địa chỉ!',
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    border: '1px solid var(--dark-blue)'
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="sdt"
                            label="Số điện thoại"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số điện thoại!',
                                },
                            ]}
                        >
                            <Input
                                addonBefore={prefixSelector}
                                style={{
                                    width: '100%',
                                    border: '1px solid var(--dark-blue)',
                                    borderRadius: '6px'
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="ngheNghiep"
                            label="Nghề nghiệp"
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng nhập nghề nghiệp!',
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    border: '1px solid var(--dark-blue)'
                                }}
                            />
                        </Form.Item>
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
                                    message: 'Vui lòng nhập địa chỉ Email!',
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    border: '1px solid var(--dark-blue)'
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                                style={{
                                    border: '1px solid var(--dark-blue)'
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="Xác nhận mật khẩu"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập lại mật khẩu!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Nhập lại mật khẩu không trùng khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                style={{
                                    border: '1px solid var(--dark-blue)'
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                },
                            ]}
                            {...tailFormItemLayout}
                        >
                            <Checkbox>
                                I have read the <Link to='/login'>agreement</Link>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <button className="login-form-button" type="primary" htmltype="submit">
                                Register
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;