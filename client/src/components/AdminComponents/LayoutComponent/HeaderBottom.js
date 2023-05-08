import { faCalendar, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumb, Col, Row, Segmented } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import "~/assets/style/Admin/HeaderBottom.scss"
import { useToken } from '~/store';
import { Link } from 'react-router-dom';
function HeaderBottom() {
    const { token } = useToken();
    const data = [
        {
            label: <Link to='/staff/'>Vụ việc</Link>,
            value: 'tasks',
            icon: <FontAwesomeIcon icon={faTasks} />
        },
        {
            label: <Link to='/staff/calendar'>Lịch hẹn</Link>,
            value: 'calend',
            icon: <FontAwesomeIcon icon={faCalendar} />
        },
        {
            label: 'Báo giá',
            value: 'quote',
            icon: <FontAwesomeIcon icon={faPaperPlane} />
        },
    ];
    return (
        <>
            <section className='header-bottom'>
                <Row>
                    <Col md={{ span: 13 }}>
                        <Segmented options={data} />
                    </Col>
                </Row>

            </section>
        </>
    );
}

export default HeaderBottom;