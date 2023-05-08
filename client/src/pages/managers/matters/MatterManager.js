import { Avatar, Button, Col, Divider, Row, Space, } from "antd";
import {
    ReconciliationFilled,
    CreditCardFilled,
    TeamOutlined,
    UsbFilled
} from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import CardMatter from "../../../components/AdminComponents/Card/CardMatter";
import { Link } from "react-router-dom";
import { actions, useStore, useToken } from "~/store";
import { useEffect } from "react";
import { matterService, taskService, timeAppointmentService } from "~/services";
import { useState } from "react";
import ModalAddTask from "./ModalAddTask";
import { MatterFinishBar } from "../Chart/MatterFinishBar";
import ModalAddFee from "./ModalAddFee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
const styleCol = {
    textAlign: 'center'
}
function MatterManager() {

    const { token } = useToken();
    const [state, dispatch] = useStore();
    const [taskGiaoCho, setTaskGiaoCho] = useState([]);
    const [isModalOpenTask, setIsModalOpenTask] = useState(false);
    const [isModalOpenFee, setIsModalOpenFee] = useState(false);
    const [time, setTime] = useState([]);

    const showModalTask = () => {
        setIsModalOpenTask(true)
    }
    const handleCancelTask = () => {
        setIsModalOpenTask(false);
    };

    useEffect(() => {
        const getMatters = async () => {
            const matter = (await matterService.findByIdAccess({ id: token._id })).data;
            const task = (await taskService.getByStaff({ id: token._id })).data;
            const taskGiaoCho = (await taskService.getByStaffPhanCong({id: token._id})).data;
            setTaskGiaoCho(taskGiaoCho);
            dispatch(actions.setMatters(matter));
            dispatch(actions.setTasks(task));
        }
        const getTime = async() => {
            const time = (await timeAppointmentService.findByStaff({id: token._id})).data;
            setTime(time)
        }
        getTime()
        getMatters();
    }, [])

    const handleTotalMatter = (value) => {
        const arr = state.matters.filter(vl => vl.status === value)
        return arr.length
    }
    const handleTotalTask = (value) => {
        const arr = state.tasks.filter(vl => vl.status === value)
        return arr.length
    }
    const handleTotalTaskGiaoCho = (value) => {
        const arr = taskGiaoCho.filter(vl => vl.status === value)
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
    return (
        <>
            <Space wrap direction="horizontal">
                <Button onClick={showModalTask} className="btn-cyan" icon={<CreditCardFilled />} block >Công việc mới</Button>
                <Button onClick={() => setIsModalOpenFee(true)} className="btn-cyan" icon={<UsbFilled />} block>Chi phí mới</Button>
            </Space>
            <Divider />
            <Row>
                <Col md={{ span: 13 }} xs={{ span: 24 }}>
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
                            <Row gutter={8}>
                                <CardMatter title="Đang thực hiện" color={0} total={handleTotalMatter(0)} url={`matters/0`} />
                                <CardMatter title="Tạm ngưng" color={2} total={handleTotalMatter(2)} url={`matters/2`} />
                                <CardMatter title="Hoàn thành" color={1} total={handleTotalMatter(1)} url={`matters/1`} />
                            </Row>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col style={{ ...styleCol }} xs={4}>
                            <Avatar
                                style={{ backgroundColor: `var(--grey)` }}
                                size={50}
                                icon={
                                    <CreditCardFilled />
                                } />
                            <Title level={5}>Công việc được phân công</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8, 8]}>
                                <CardMatter title="Được phân công" total={handleTotalTask(0)} color={0} url={`tasks/0`} />
                                <CardMatter title="Tạm ngưng" total={handleTotalTask(-1)} color={2} url={`tasks/-1`} />
                                <CardMatter title="Hoàn thành" total={handleTotalTask(1)} color={1} url={`tasks/1`} />
                            </Row>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col style={{ ...styleCol }} xs={4}>
                            <Avatar
                                style={{ backgroundColor: `var(--grey)` }}
                                size={50}
                                icon={
                                    <CreditCardFilled />
                                } />
                            <Title level={5}>Công việc đã giao</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8, 8]}>
                                <CardMatter title="Đã giao" total={handleTotalTaskGiaoCho(0)} color={0} url={`tasks-giao/0`} />
                                <CardMatter title="Đã trình" total={handleTotalTaskGiaoCho(1)} color={2} url={`tasks-giao/1`} />
                                <CardMatter title="Đã hoàn thành" total={handleTotalTaskGiaoCho(2)} color={1} url={`tasks-giao/2`} />
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
                                    <TeamOutlined />
                                } />
                            <Title level={5}>Lịch hẹn</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                        <Row gutter={[8, 8]}>
                            <CardMatter title="Hôm nay" total={handleTimeByDay(0)} color={0} url={`/staff/calendar`} />
                                <CardMatter title="Tuần này" total={handleTimeByWeek(1)} color={1} url={`/staff/calendar`} />
                                <CardMatter title="Tháng này" total={handleTimeByMonth(2)} color={2} url={`/staff/calendar`} />
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col md={{ span: 10, push: 1 }} xs={{ span: 24 }}>
                    <Divider>
                        <Title level={4}>Số lượng vụ việc đã hoàn thành theo từng tháng / {new Date().getFullYear()}</Title>
                    </Divider>
                    <Row>
                        <Col span={24} >
                            <MatterFinishBar />
                        </Col>
                    </Row>
                </Col>
            </Row>
            {isModalOpenTask ? <ModalAddTask open={isModalOpenTask} onCancel={handleCancelTask} /> : null}
            {isModalOpenFee ? <ModalAddFee open={isModalOpenFee} onCancel={() => setIsModalOpenFee(false)} /> : null}

        </>
    );
}

export default MatterManager;