import { avatar } from '~/assets/images';
import { Avatar, Card, Col, Row, Space, Tag } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
const { Meta } = Card;

function CardUser({ info }) {

    return (
        <Card className='card-info'>
            <Meta
                avatar={<Avatar shape='square' size={60} src={info.typeOfUser === 'Doanh nghiệp' ? avatar.company : avatar.user} />}
                title={info.active ? info.name :
                    <Space>
                        {info.name}
                        <FontAwesomeIcon icon={faLock} />
                    </Space>
                }
                description={
                    <>
                        <Row>
                            <Col md={{ span: 16 }} sm={{ span: 24 }} xs={{ span: 16 }}>{info.address} </Col>
                            <Col md={{ span: 8 }} sm={{ span: 24 }} xs={{ span: 8 }}>
                                {
                                    info.role === 0 ?
                                        <Tag color={
                                            info.typeOfUser === 'Doanh nghiệp' ? "volcano" : "geekblue"}>
                                            {info.typeOfUser === 'Doanh nghiệp' ? 'Doanh nghiệp' : "Cá nhân"}
                                        </Tag>
                                        : null
                                }
                            </Col>
                        </Row>
                        <p>
                            {info.email}
                        </p>
                    </>
                }
            />
        </Card>
    );
}

export default CardUser;