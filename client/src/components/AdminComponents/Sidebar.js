import { MailOutlined, SettingOutlined, AppstoreOutlined, MenuFoldOutlined, DashboardOutlined } from '@ant-design/icons';
import { Menu, Drawer, Button } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
var items = [];
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const laws = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
        getItem('Option 1', '1'),
        getItem('Option 2', '2'),
        getItem('Option 3', '3'),
        getItem('Option 4', '4'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
];
const admin = [
    getItem(<Link to={`/admin`}>Tổng quan</Link>,'14', <DashboardOutlined />),
    getItem(<Link to={`/admin/contact`}>Quản lý hợp đồng</Link>, 'sub1', <MailOutlined />),
    getItem(<Link to={`/admin/type-service`}>Quản lý loại dịch vụ</Link>, 'sub2', <AppstoreOutlined />),
    getItem(<Link to={`/admin/service`}>Quản lý dịch vụ</Link>,'15', <AppstoreOutlined />),

    getItem('Quản lý thu chi', 'sub3', <SettingOutlined />, [
        getItem('Option 5', '5'),
    ]),
    getItem('Quản lý hợp đồng', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
    getItem('Thống kê','13', <SettingOutlined />),
];
// const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];

function Sidebar({props}) {
    props === 1 ? items = admin : items = laws
    const onClick = (e) => {
        console.log('click ', e);
    };
    return (
            <Menu
                className='sidebar-admin'
                onClick={onClick}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
    );
};
function SidebarHDrawer({props}) {
    props === 1 ? items = admin : items = laws
    const onClick = (e) => {
        console.log('click ', e);
    };
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    }
    const onClose = () => {
        setOpen(false);
    }
    return (
        <>
            <Button style={{ width: '10%' }} onClick={showDrawer}>
                <MenuFoldOutlined />
            </Button>
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                <Menu
                    onClick={onClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
            </Drawer>
        </>
    );
};
export { Sidebar, SidebarHDrawer };