import { useState } from 'react';
import {
    EllipsisOutlined,
    AlignRightOutlined,
    PhoneOutlined,
    MailOutlined,
    UserOutlined,
    ContactsOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Col, Menu, Row, Input, Drawer, Button } from 'antd';
import { logo } from '~/assets/images/index';
import { useToken } from '~/store';
const { Search } = Input;
const styleIcon = {
    fontSize: '16px'
};
const itemsHeadTop = [
    {
        label: '(316) 268-0200',
        key: 'phone',
        icon: <PhoneOutlined />,
    },
    {
        label: 'MMX@Law-Firm.Com',
        key: 'mail',
        icon: <MailOutlined />
    },
    {
        label: 'Liên hệ',
        key: 'contact',
        icon: <ContactsOutlined style={styleIcon} />
    },
    {
        label: <Link to='/login'><UserOutlined style={styleIcon} /></Link>,
        key: 'user',
    },
];



function Header() {
    const [open, setOpen] = useState(false);
    const {token} = useToken()
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const itemsHeadBot = [
        {
            label: <Link to="/">Trang chủ</Link>,
            key: 'home',
        },
        {
            label: <Link to="/service">Dịch vụ</Link>,
            key: 'service'
        },
        {
            label: 'Luật sư tư vấn',
            key: 'advisory lawyer',
            children: [
                {
                    type: 'group',
                    children: [
                        {
                            label: 'Dân sự',
                            key: 'people',
                        },
                        {
                            label: 'Đất đai',
                            key: 'land',
                        },
                        {
                            label: 'Hợp đồng',
                            key: 'contract',
                        },
                        {
                            label: 'Doanh nghiệp',
                            key: 'business',
                        },
                        {
                            label: 'Lao động',
                            key: 'work',
                        },
                        {
                            label: 'Hôn nhân',
                            key: 'love',
                        },
                        {
                            label: 'Luật sư đại diện',
                            key: 'representative lawyer',
                        },
                    ],
                }
            ]
        },
        {
            label: 'Đội ngũ chúng tôi',
            key: 'team',
        },
        {
            label: 'Liên hệ',
            key: 'contact',
        },
        token ?
        {
            key: 'matter',
            label: <Link to='/matters/all'>Vụ việc</Link>
        } : <></>
    ];
    return (
        <div className='header'>
            <Row className='nav-top'>
                <Col md={{ span: 18, push: 6 }} xs={{ span: 2, push: 23 }}>
                    <Menu className='menu' mode="horizontal" items={itemsHeadTop} overflowedIndicator={<EllipsisOutlined />} />
                </Col>
                <Col md={{ span: 6, pull: 18 }} xs={{ span: 12, pull: 4 }}  >
                    <Search
                        placeholder="Bạn đang tìm kiếm sự trợ giúp gì ?"
                        style={{
                            width: 400,
                            marginTop: 8,
                        }}
                    />
                </Col>
            </Row>

            <Row className='nav-bot'>
                <Col md={{ span: 18, push: 5 }} xs={{ span: 0, push: 0 }}>
                    <Menu className='menu' mode="horizontal" items={itemsHeadBot} overflowedIndicator={<AlignRightOutlined />} />
                </Col>
                <Col md={{ span: 0, push: 0 }} xs={{ span: 2, push: 21 }}>
                    <Button className='head-btn' type='' onClick={showDrawer} >
                        <AlignRightOutlined />
                    </Button>
                    <Drawer placement="right" onClose={onClose} open={open}>
                        <Menu className='menu' items={itemsHeadBot} mode='inline' />
                    </Drawer>
                </Col>
                <Col md={{ span: 6, pull: 16 }} xs={{ span: 12, pull: 1 }}  >
                    <img alt='' src={logo.logo} style={{ width: 350 }} />
                </Col>
            </Row>
        </div>
    );
}

export default Header;