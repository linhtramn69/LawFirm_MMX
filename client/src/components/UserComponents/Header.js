import { useState } from 'react';
import {
    EllipsisOutlined,
    AlignRightOutlined
} from '@ant-design/icons';
import { Col, Menu, Row, Input, Drawer, Button } from 'antd';
import { logo } from '~/assets/images/index';
import { itemsHeadTop, itemsHeadBot } from '~/dataUI';
const { Search } = Input;

function Header() {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

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