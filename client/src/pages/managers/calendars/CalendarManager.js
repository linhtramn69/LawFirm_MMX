import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Calendar, Radio } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { faUserGear, faUsersGear } from '@fortawesome/free-solid-svg-icons';
import CalendarBig from './CalendarBig';
import ModalAdd from './ModalAdd';

function CalendarManager() {
    const [select, setSelect] = useState(1)
    const [dateSelect, setDateSelect] = useState(moment().toDate())
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const nhan = () => {
        CalendarBig.setEvents()
    }

    return (
        <>
            <Row>
                <Col md={{ span: 17 }}>
                    <button className='btn-create-calendar' onClick={showModal}>
                        <FontAwesomeIcon icon={faCalendarPlus} style={{ color: "#496ba7", marginRight: 10 }} />
                        Tạo lịch</button>
                </Col>
                <Col md={{ span: 6, push: 2 }}>
                    <Radio.Group defaultValue={1} className='btn-select' onChange={(e) => setSelect(e.target.value)}>
                        <Radio.Button value={0}>
                            <FontAwesomeIcon icon={faUserGear} style={{ marginRight: 10 }} />
                            Lịch của tôi</Radio.Button>
                        <Radio.Button value={1}>
                            <FontAwesomeIcon icon={faUsersGear} style={{ marginRight: 10 }} />
                            Lịch của tất cả</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 6 }}  >
                    <Calendar className='calendar-small' fullscreen={false} onChange={(value) => setDateSelect(moment(value.$d).toDate())} />
                </Col>
                <Col md={{ span: 17, push: 1 }} className='calendar-big'>
                    <CalendarBig dateSelect={dateSelect} onNhan={nhan} select={select} />
                </Col>
            </Row>
            {isModalOpen ? <ModalAdd open={isModalOpen} onCancel={handleCancel} /> : null}
        </>

    );
}

export default CalendarManager;