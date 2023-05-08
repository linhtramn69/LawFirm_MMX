import { Col, Row, List } from 'antd';
import { itemsFootTop, itemsFootBot } from '~/dataUI';
import { logo } from '~/assets/images/index';

function Footer() {

    return (
        <div className='footer'>
            <Row className='foot-top'>
                <Col md={{ span: 8, push: 2 }} xs={{ span: 22, push: 2 }}>
                    <img alt='' src={logo.logo} style={{ width: 400 }} />
                </Col>
                <Col md={{ span: 10, push: 3 }} xs={{ span: 22, push: 1 }}>
                    <List
                        grid={{
                            gutter: 12,
                            column: 2,
                        }}
                        dataSource={itemsFootTop}
                        renderItem={(item) => (
                            <List.Item title='' className='listItem'>
                                {item.icon} {item.title}
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
            <Row className='foot-bot' justify={"center"} >
                <List
                    grid={{
                        gutter: { md: 48, xs: 0 },
                        lg: 24,
                        xs: 2
                    }}
                    dataSource={itemsFootBot}
                    renderItem={(item) => (
                        <List.Item>
                            {item.icon} {item.label}
                        </List.Item>
                    )}
                />
            </Row>
        </div>
    );
}

export default Footer;