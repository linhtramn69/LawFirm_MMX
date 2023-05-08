import MatterList from "../matters/MatterList";
import { Avatar, Button, Col, Divider, Row, Space, } from "antd";
import {
    ReconciliationFilled,
    CreditCardFilled,
    UsbFilled,
    CalendarFilled,
} from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import CardMatter from "../../../components/AdminComponents/Card/CardMatter";
import { actions, useStore, useToken } from "~/store";
import { useEffect, useState } from "react";
import { feeService, matterService, taskService, timeAppointmentService } from "~/services";
import moment from "moment";
import ModalAddFee from "../matters/ModalAddFee";
import ModalAdd from "../calendars/ModalAdd";
const styleCol = {
    textAlign: 'center'
}
const url = ['', 'admin', 'tro-ly']
function TaskManager() {
    const [state, dispatch] = useStore()
    const {token} = useToken()
    const [time, setTime] = useState([]);
    const [isModalOpenFee, setIsModalOpenFee] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const getTaskByStaff = async() => {
            const tasks = (await taskService.getByStaff({id: token._id})).data
            dispatch(actions.setTasks(tasks))
        }
        const getMatterByAccess = async() => {
            const matters = (await matterService.findByIdAccess({id: token.boss})).data
            dispatch(actions.setMatters(matters))
        }
        const getTime = async() => {
            const time = (await timeAppointmentService.findByStaff({id: token._id})).data;
            setTime(time)
        }
        const getFee = async() => {
            const fee = (await feeService.findByStaff(token._id)).data;
            dispatch(actions.setFees(fee))
        }
        getFee()
        getTime()
        getMatterByAccess()
        getTaskByStaff()
    }, [])
    const handleTotalTask = (value) => {
        const arr = state.tasks.filter((item) => item.status == value)
        return arr.length
    }
    const handleTotalTaskByDay = () => {
        const arr = state.tasks.filter((item) => 
        item.status == 0 &&
        moment(item.han_chot_cong_viec).format('DDMMYYYY') == moment().format('DDMMYYYY'))
        return arr.length
    }
    const handleTotalTaskByWeek = () => {
        const arr = state.tasks.filter((item) => 
        item.status == 0 &&
        moment(item.han_chot_cong_viec).week() == moment().week())
        return arr.length
    }
    const handleTotalTaskByMonth = () => {
        const arr = state.tasks.filter((item) => 
        item.status == 0 &&
        moment(item.han_chot_cong_viec).format('MMYYYY') == moment().format('MMYYYY'))
        return arr.length
    }
    const handleTotalTaskByMiss = () => {
        const arr = state.tasks.filter((item) => 
        item.status == 0 &&
        moment(item.han_chot_cong_viec).format('MMYYYY') > moment().format('MMYYYY'))
        return arr.length
    }
    const handleTotalMatter = (value) => {
        const arr = state.matters.filter((item) => item.status == value)
        return arr.length
    }
    const handleTimeByDay= (value) => {
        const arr = time.filter(vl => moment(vl.thoi_gian.start).format('DDMMYYYY') ===  moment().format('DDMMYYYY'))
        return arr.length
    }
    const handleTimeByWeek= (value) => {
        const arr = time.filter(vl => moment(vl.thoi_gian.start).week() ===  moment().week())
        return arr.length
    }
    const handleTimeByMonth= (value) => {
        const arr = time.filter(vl => moment(vl.thoi_gian.start).format('MMYYYY') ===  moment().format('MMYYYY'))
        return arr.length
    }
    const handleTotalFee = (value) => {
        const arr = state.fees.filter(vl => vl.status === value)
        return arr.length
    }
    return (
        <>
            <Space wrap direction="horizontal">
                        <Button onClick={() => setIsModalOpenFee(true)} className="btn-cyan" icon={<UsbFilled />} block>Chi phí mới</Button>
                        <Button onClick={() => setIsModalOpen(true)} className="btn-cyan" icon={<CalendarFilled />} block>Lịch hẹn mới</Button>
                    </Space>
                    <Divider/>
            <Row>
                <Col md={{ span: 10 }} xs={{ span: 24 }}>
                    <Row>
                        <Col style={{ ...styleCol }} xs={{ span: 4 }}>
                            <Avatar
                                style={{ backgroundColor: `var(--grey)` }}
                                size={50}
                                icon={
                                    <ReconciliationFilled />
                                } />
                            <Title level={5}>Công việc</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8,8]}>
                                <CardMatter title="Đã giao" total={handleTotalTask(0)} color={0} url={`/tro-ly/tasks/0`} />
                                <CardMatter title="Đã trình" total={handleTotalTask(1)} color={2} url={`/tro-ly/tasks/1`}/>
                                <CardMatter title="Hoàn thành" total={handleTotalTask(2)} color={1} url={`/tro-ly/tasks/2`}/>
                                <CardMatter title="Tạm ngưng" total={handleTotalTask(-1)} url={`/tro-ly/tasks/-1`}/>
                            </Row>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col style={{ ...styleCol }} xs={{ span: 4 }}>
                            <Avatar
                                style={{ backgroundColor: `var(--grey)` }}
                                size={50}
                                icon={
                                    <ReconciliationFilled />
                                } />
                            <Title level={5}>Vụ việc</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8,8]}>
                                <CardMatter title="Đang thực hiện" total={handleTotalMatter(0)} color={0} url={`/tro-ly/matters/0`} />
                                <CardMatter title="Tạm ngưng" total={handleTotalMatter(2)} color={2} url={`/tro-ly/matters/2`}/>
                                <CardMatter title="Hoàn thành" total={handleTotalMatter(1)} color={1} url={`/tro-ly/matters/1`}/>
                            </Row>
                        </Col>
                    </Row>
                   <Divider/>
                   <Row>
                        <Col style={{ ...styleCol }} xs={{ span: 4 }}>
                            <Avatar
                                style={{ backgroundColor: `var(--grey)` }}
                                size={50}
                                icon={
                                    <ReconciliationFilled />
                                } />
                            <Title level={5}>Chi phí</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8,8]}>
                                <CardMatter title="Đã trình" total={handleTotalFee(0)} color={0} url={`/tro-ly/fees/0`} />
                                <CardMatter title="Đã duyệt" total={handleTotalFee(1)} color={1} url={`/tro-ly/fees/1`}/>
                                <CardMatter title="Đã kết toán" total={handleTotalFee(2)} color={2} url={`/tro-ly/fees/2`}/>
                                <CardMatter title="Từ chối" total={handleTotalFee(-1)} color={-1} url={`/tro-ly/fees/-1`}/>
                            </Row>
                        </Col>
                    </Row>
                </Col>
               <Col md={{span: 10, push: 2}}>
               <Row>
                        <Col style={{ ...styleCol }} xs={{ span: 4 }}>
                            <Avatar
                                style={{ backgroundColor: `var(--grey)` }}
                                size={50}
                                icon={
                                    <ReconciliationFilled />
                                } />
                            <Title level={5}>Hạn công việc</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8,8]}>
                                <CardMatter title="Hạn hôm nay" color={0} total={handleTotalTaskByDay()} />
                                <CardMatter title="Hạn tuần này" color={2} total={handleTotalTaskByWeek()} />
                                <CardMatter title="Hạn tháng này" color={1} total={handleTotalTaskByMonth()} />
                                <CardMatter title="Trễ hạn" total={handleTotalTaskByMiss()} />
                            </Row>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col style={{ ...styleCol }} xs={4}>
                            <Avatar
                                style={{ backgroundColor: `var(--grey)` }}
                                size={50}
                                icon={
                                    <CreditCardFilled />
                                } />
                            <Title level={5}>Lịch hẹn</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8, 8]}>
                            <CardMatter title="Hôm nay" total={handleTimeByDay(0)} color={0} url={`/tro-ly/calendar`} />
                                <CardMatter title="Tuần này" total={handleTimeByWeek(1)} color={1} url={`/tro-ly/calendar`} />
                                <CardMatter title="Tháng này" total={handleTimeByMonth(2)} color={2} url={`/tro-ly/calendar`} />
                            </Row>
                        </Col>
                    </Row>

               </Col>
            </Row>
            {isModalOpen ? <ModalAdd open={isModalOpen} onCancel={() => setIsModalOpen(false)} /> : null}
            {isModalOpenFee ? <ModalAddFee open={isModalOpenFee} onCancel={() => setIsModalOpenFee(false)} /> : null}

        </>
      );
    }

export default TaskManager;