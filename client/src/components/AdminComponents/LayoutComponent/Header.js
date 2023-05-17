import { Avatar, Col, Menu, Row, Space } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MailOutlined
} from '@ant-design/icons';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import "~/assets/style/Admin/Header.scss";
import { Link } from "react-router-dom";
import { useToken } from "~/store";
import { avatar } from "~/assets/images";
const url = ['', 'admin', 'staff']

function HeaderAdmin() {
  const [current, setCurrent] = useState('mail');
  const { token } = useToken();
  let url = 'admin'
  if (token.chuc_vu._id === 'LS02')
    url = 'staff'
  else if (token.chuc_vu._id === 'TVV02')
    url = 'tu-van-vien'
  else if (token.chuc_vu._id === 'KT02')
    url = 'ke-toan'
  else if (token.chuc_vu._id === 'TL02')
    url = 'tro-ly'
  const itemsAdmin = [
    {
      icon: <Link to={`/${url}`}>
        <FontAwesomeIcon icon={faHouse} />
      </Link>,
      key: 'dashboard',
    },
    {
      label: <Link to={`/${url}/matters/all`}>
        Vụ việc
      </Link>,
      key: 'matter',
    },
    {
      label: <Link to={`/${url}/calendar`}>
        Lịch hẹn
      </Link>,
      key: 'calendar',
    },
    {
      label: <Link to={`/${url}/quotes/all`}>
        Báo giá
      </Link>,
      key: 'quote',
    },
    {
      label: <Link to={`/${url}/staff`}>
        Nhân viên
      </Link>,
      key: 'staff',
    },
    {
      label: <Link to={`/${url}/customer`}>
        Khách hàng
      </Link>,
      key: 'customer',
    },
    {
      label: <Link to={`/${url}/fees/all`}>
        Chi phí
      </Link>,
      key: 'fee',
    },
    {
      label: <Link to={`/${url}/bills/all`}>
        Hoá đơn
      </Link>,
      key: 'bill',
    },
  ];
  const itemsLaw = [
    {
      icon: <Link to={`/${url}`}>
        <FontAwesomeIcon icon={faHouse} />
      </Link>,
      key: 'dashboard',
    },
    {
      label: <Link to={`/${url}/matters/all`}>
        Quản lý vụ việc
      </Link>,
      key: 'matter',
    },
    {
      label: <Link to={`/${url}/calendar`}>
        Quản lý lịch hẹn
      </Link>,
      key: 'calendar',
    },
    {
      label: <Link to={`/${url}/fees/all`}>
        Quản lý chi phí
      </Link>,
      key: 'fee',
    }
  ];
  const itemsTroLy = [
    {
      icon: <Link to={`/${url}`}>
        <FontAwesomeIcon icon={faHouse} />
      </Link>,
      key: 'dashboard',
    },
    {
      label: <Link to={`/${url}/tasks/all`}>
        Quản lý công việc
      </Link>,
      key: 'task',
    },
    {
      label: <Link to={`/${url}/calendar`}>
        Quản lý lịch hẹn
      </Link>,
      key: 'calendar',
    },
    {
      label: <Link to={`/${url}/fees/all`}>
        Quản lý chi phí
      </Link>,
      key: 'fee',
    }
  ];
  const itemsTuVanVien = [
    {
      icon: <Link to={`/${url}`}>
        <FontAwesomeIcon icon={faHouse} />
      </Link>,
      key: 'dashboard',
    },
    {
      label: <Link to={`/${url}/calendar`}>
        Quản lý lịch hẹn
      </Link>,
      key: 'calendar',
    },
    {
      label: <Link to={`/${url}/quotes/all`}>
        Quản lý báo giá
      </Link>,
      key: 'quote',
    },
  ];
  const itemsKeToan = [
    {
      icon: <Link to={`/${url}`}>
        <FontAwesomeIcon icon={faHouse} />
      </Link>,
      key: 'dashboard',
    },
    {
      label: <Link to={`/${url}/calendar`}>
        Quản lý lịch hẹn
      </Link>,
      key: 'calendar',
    },
    {
      label: <Link to={`/${url}/bills/type-bill/all`}>
        Quản lý hoá đơn
      </Link>,
      key: 'bill',
    },
    {
      label: <Link to={`/${url}/fees/all`}>
        Quản lý chi phí
      </Link>,
      key: 'fee',
    },
    {
      label: <Link to={`/${url}/matters/all`}>
        Quản lý vụ việc
      </Link>,
      key: 'bc',
    },
  ];
  const onClick = (e) => {
    setCurrent(e.key);
  };
  const items1 = [
    {
      label: token.email,
      icon: <MailOutlined />,
    },
    {
      label: token.chuc_vu.ten_chuc_vu,
      icon: <UserOutlined />,
    },
    {
      label: <Space style={{marginBottom: 4}} align="center">
        <Avatar shape="circle" src={token.avatar ? token.avatar : avatar.user} />
        {token.ho_ten}
      </Space>,
      key: 'user',
      children: [
        {
          label: 'Thiết lập tài khoản',
          key: 'settings',
          icon: <SettingOutlined />
        },
        {
          label: 'Cập nhật thông tin',
          key: 'update',
          icon: <SettingOutlined />
        },
        {
          label: <button
            style={{
              border: 0,
              backgroundColor: 'transparent'
            }}
            onClick={() => {
              sessionStorage.removeItem('token')
              window.location.href = '/login'
            }}>Đăng xuất</button>,
          key: 'logout',

          icon: <LogoutOutlined />
        }
      ]
    },
  ];
  return (
    <>
      <Row className="header-admin">
        <Col md={
          token.account.quyen === 1 ? { span: 12, push: 1 }
            : { span: 12, push: 1 }
        }>
          <Menu onClick={onClick} className="menu" selectedKeys={[current]} mode="horizontal" items={
            token.account.quyen === 1 ? itemsAdmin
              : token.chuc_vu._id === 'LS02' ? itemsLaw
                : token.chuc_vu._id === 'TVV02' ? itemsTuVanVien
                  : token.chuc_vu._id === 'TL02' ? itemsTroLy
                    : itemsKeToan
          } />
        </Col>
        <Col md={
          token.account.quyen === 1 ? { span: 11, push: 1 }
            : { span: 10, push: 2 }
        }>
          <Menu onClick={onClick} className="menu" selectedKeys={[current]} mode="horizontal" items={items1} />
        </Col>
      </Row>

    </>
  );
}

export default HeaderAdmin;