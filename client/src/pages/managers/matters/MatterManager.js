import { Avatar, Button, Col, Divider, Row, Space, } from "antd";
import {
    ReconciliationFilled,
    CreditCardFilled,
    TeamOutlined,
} from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import CardMatter from "../../../components/AdminComponents/Card/CardMatter";
import { Link } from "react-router-dom";
import { actions, useStore, useToken } from "~/store";
import { useEffect } from "react";
import { matterService, quoteService, taskService } from "~/services";
import { useState } from "react";
import ModalAddTask from "./ModalAddTask";
import { MatterFinishBar } from "../Chart/MatterFinishBar";
const styleCol = {
    textAlign: 'center'
}
function MatterManager() {

    const { token } = useToken();
    const [state, dispatch] = useStore();
    const [taskGiaoCho, setTaskGiaoCho] = useState([]);
    const [isModalOpenTask, setIsModalOpenTask] = useState(false);

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

    return (
        <>
            <Space wrap direction="horizontal">
                {token.account.quyen === 1 ?
                    <Link to="matter/add">
                        <Button className="btn-cyan" icon={<ReconciliationFilled />} block>Vụ việc mới</Button>
                    </Link>
                    : null
                }
                <Button onClick={showModalTask} className="btn-cyan" icon={<CreditCardFilled />} block >Công việc mới</Button>
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
                                <CardMatter title="Tạm ngưng" total={handleTotalTask(2)} color={2} url={`tasks/2`} />
                                <CardMatter title="Hoàn thành" total={handleTotalTask(1)} color={1} url={`tasks/1`} />
                                {/* <CardMatter title="Hạn hôm nay" total={0} />
                                <CardMatter title="Quá hạn" total={0} /> */}
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
                                <CardMatter title="Đã hoàn thành" total={handleTotalTaskGiaoCho(1)} color={1} url={`tasks-giao/1`} />
                                {/* <CardMatter title="Hạn hôm nay" total={0} />
                                <CardMatter title="Quá hạn" total={0} /> */}
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
                            {/* <Row gutter={[8, 8]}>
                                <CardMatter title="Hôm nay" total={0} />
                                <CardMatter title="Tuần này" total={handleTotalTask(0)} status={0} />
                                <CardMatter title="Tháng này" total={0} />
                            </Row> */}
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
                        {/* <Col span={24} >
                            <BillChiLine />
                        </Col> */}
                    </Row>
                </Col>
            </Row>
            {isModalOpenTask ? <ModalAddTask open={isModalOpenTask} onCancel={handleCancelTask} /> : null}
        </>
    );
}

export default MatterManager;