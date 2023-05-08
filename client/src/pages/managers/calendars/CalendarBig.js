import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'
import { useState } from 'react';
import { useEffect } from 'react';
import { timeAppointmentService, userService } from '~/services';
import { Col, Descriptions, Divider, Modal, Row } from 'antd';
import { useToken } from '~/store';
import { Link } from 'react-router-dom';
const url = ['', 'admin', 'tu-van-vien']
const localizer = momentLocalizer(moment)

function CalendarBig({ dateSelect, onNhan, select  }) {
    const {token} = useToken()
    const [events, setEvents] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [event, setEvent] = useState({
        thoi_gian: {},
        khach_hang: {}
    })
    const [staff, setStaff] = useState({
        account: {
            sdt: ''
        }
    })
    useEffect(() => {
        const getTime = async () => { 
            select == 1 ? setEvents((await timeAppointmentService.get()).data)
            : setEvents((await timeAppointmentService.findByStaff({id: token._id})).data)
         }
        getTime()
    }, [onNhan, select]);
    useEffect(() => {
        const getStaff = async () => {
            setStaff((await userService.getById(event.nhan_vien)).data)
        }
        getStaff()
    }, [event])
    const arrEvent = events.map((value) => {
        return ({
            id: value._id,
            dayMaxEvents: true,
            start: moment(`${value.thoi_gian.start}`).toDate(),
            end: moment(`${value.thoi_gian.end}`).toDate(),
            title: value.tieu_de
        })
    })

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleEvent = async (data) => {
        setIsModalOpen(true)
        setEvent((await timeAppointmentService.getById(data.id)).data)
    }

    return (
        <>
            <Calendar
                // defaultDate={dateSelect}
                date={dateSelect}
                localizer={localizer}
                defaultView="month"
                events={arrEvent}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleEvent}
                onShowMore={handleEvent}
                resizable
                style={{ height: "100vh" }}
            />
            {event ?
                <Modal bodyStyle={{paddingLeft: 40}} width={800} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Descriptions
                        column={{
                            lg: 4,
                            md: 4,
                            sm: 2,
                        }}
                        title={event.loai_lich}
                    >
                        <Descriptions.Item span={4} label="Tiêu đề">{event.tieu_de}</Descriptions.Item>
                        <Descriptions.Item span={2} label="Bắt đầu">{moment(event.thoi_gian.start).format(' DD-MM-YYYY LT')}</Descriptions.Item>
                        <Descriptions.Item span={2} label="Kết thúc dự kiến">{moment(event.thoi_gian.end).format(' DD-MM-YYYY LT')}</Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    <Row>
                        <Col span={12}>
                            <Descriptions
                                title="Thông tin khách hàng"
                                column={{
                                    lg: 4,
                                    md: 4,
                                    sm: 2,
                                }}>
                                <Descriptions.Item span={4} label="Họ tên">{event.khach_hang.ho_ten}</Descriptions.Item>
                                <Descriptions.Item span={4} label="Số điện thoại">{event.khach_hang.sdt}</Descriptions.Item>
                                <Descriptions.Item span={4} label="Email">{event.khach_hang.email}</Descriptions.Item>

                            </Descriptions>
                        </Col>
                        <Col span={12}>
                        <Descriptions
                        title="Thông tin nhân viên"
                        column={{
                            lg: 4,
                            md: 4,
                            sm: 2,
                        }}>
                        <Descriptions.Item span={4} label="Họ tên">{staff.ho_ten}</Descriptions.Item>
                        <Descriptions.Item span={4} label="Số điện thoại">{staff ? staff.account.sdt : null}</Descriptions.Item>
                        <Descriptions.Item span={4} label="Email">{staff.email}</Descriptions.Item>
                        </Descriptions>
                        </Col>
                    </Row>
                    <Divider/>
                    <Descriptions
                        title="Thông tin chi tiết"
                        column={{
                            lg: 4,
                            md: 4,
                            sm: 2,
                        }}>
                        <Descriptions.Item span={2} label="Mô tả">{event.mo_ta}</Descriptions.Item>
                        <Descriptions.Item span={2} label="Ghi chú">{event.ghi_chu}</Descriptions.Item>
                        <Descriptions.Item span={2}>
                            <Link to={`/${url[token.account.quyen]}/quote/${event.phieu_bao_gia}`}>
                                Xem chi tiết vấn đề
                            </Link>
                        </Descriptions.Item>
                    </Descriptions>
                </Modal> : null}

        </>

    );

}

export default CalendarBig;