import { Avatar, Button, Col, Divider, Row, Space, } from "antd";
import {
    ReconciliationFilled,
    CreditCardFilled,
    UsbFilled,
    CalendarFilled,
    TeamOutlined,
} from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import { actions, useStore, useToken } from "~/store";
import { useEffect, useState } from "react";
import { billService, feeService, matterService, quoteService, taskService } from "~/services";
import ModalAddTask from "./matters/ModalAddTask";
import ModalAddFee from "./matters/ModalAddFee";
import CardMatter from "~/components/AdminComponents/Card/CardMatter";
import { BillChiLine } from "./Chart/BillChiLine";
import { BillThuLine } from "./Chart/BillThuLine";
import { MatterFinishBar } from "./Chart/MatterFinishBar";
import { TypeServiceFavoritePie } from "./Chart/TypeServiceFavoritePie";
const styleCol = {
    textAlign: 'center'
}
function Manager() {

    const { token } = useToken();
    const [state, dispatch] = useStore();
    const [isModalOpenTask, setIsModalOpenTask] = useState(false);
    const [isModalOpenFee, setIsModalOpenFee] = useState(false);

    


    const showModalTask = () => {
        setIsModalOpenTask(true)
    }
    const handleCancelTask = () => {
        setIsModalOpenTask(false);
    };
    const showModalFee = () => {
        setIsModalOpenFee(true)
    }
    const handleCancelFee = () => {
        setIsModalOpenFee(false);
    };
    useEffect(() => {
        const getMatters = async () => {
            const quote = (await quoteService.get()).data;
            const matter = (await matterService.get()).data;
            const task = (await taskService.get()).data;
            const fee = (await feeService.get()).data;
            const bill = (await billService.get()).data;
            dispatch(actions.setFees(fee));
            dispatch(actions.setMatters(matter));
            dispatch(actions.setTasks(task));
            dispatch(actions.setQuotes(quote));
            dispatch(actions.setBills(bill));
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
    const handleTotalQuote = (value) => {
        const arr = state.quotes.filter(vl => vl.status === value)
        return arr.length
    }
    const handleTotalFee = (value) => {
        const arr = state.fees.filter(vl => vl.status === value)
        return arr.length
    }
    const handleTotalBill = (value) => {
        const arr = state.bills.filter(vl => vl.loai_hoa_don === value)
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
                <Button onClick={showModalFee} className="btn-cyan" icon={<UsbFilled />} block>Chi phí mới</Button>
                <Button className="btn-cyan" icon={<CalendarFilled />} block>Tạo nhật ký làm việc</Button>
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
                                <CardMatter title="Đang thực hiện" color={0} total={handleTotalMatter(0)} url={`/admin/matters/0`} />
                                <CardMatter title="Tạm ngưng" color={2} total={handleTotalMatter(2)} url={`/admin/matters/2`} />
                                <CardMatter title="Hoàn thành" color={1} total={handleTotalMatter(1)} url={`/admin/matters/1`} />
                            </Row>
                        </Col>
                    </Row>
                    {/* <Divider />
                    <Row>
                        <Col style={{ ...styleCol }} xs={4}>
                            <Avatar
                                style={{ backgroundColor: `var(--grey)` }}
                                size={50}
                                icon={
                                    <CreditCardFilled />
                                } />
                            <Title level={5}>Công việc</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8, 8]}>
                                <CardMatter title="Được giao" total={handleTotalTask(0)} color={0} url={`/admin/tasks/0`} />
                                <CardMatter title="Tạm ngưng" total={handleTotalTask(2)} color={2} url={`/admin/tasks/2`} />
                                <CardMatter title="Hoàn thành" total={handleTotalTask(1)} color={1} url={`/admin/tasks/1`} />
                            </Row>
                        </Col>
                    </Row> */}
                    <Divider />
                    <Row>
                        <Col style={{ ...styleCol }} xs={{ span: 4 }}>
                            <Avatar
                                style={{ backgroundColor: `var(--grey)` }}
                                size={50}
                                icon={
                                    <TeamOutlined />
                                } />
                            <Title level={5}>Báo giá</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8, 8]}>
                                <CardMatter title="Yêu cầu báo giá" total={handleTotalQuote(0)} color={0} url={`/admin/quotes/0`} />
                                <CardMatter title="Đã gửi báo giá" total={handleTotalQuote(1)} color={1} url={`/admin/quotes/1`} />
                                <CardMatter title="Đã lên lịch" total={handleTotalQuote(2)} color={2} url={`/admin/quotes/2`} />
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
                            <Title level={5}>Chi phí</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8, 8]}>
                                <CardMatter title="Đã trình" total={handleTotalFee(0)} color={0} url={`fees/0`} />
                                <CardMatter title="Đã duyệt" total={handleTotalFee(1)} color={1} url={`fees/1`} />
                                <CardMatter title="Đã kết toán" total={handleTotalFee(2)} color={2} url={`fees/2`} />
                                <CardMatter title="Từ chối" total={handleTotalFee(3)} color={3} url={`fees/3`} />
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
                            <Title level={5}>Hóa đơn</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={8}>
                                <CardMatter title="Nội bộ" color={0} total={handleTotalBill('NB')} url={`bills/type-bill/NB`} />
                                <CardMatter title="Khách hàng" color={1} total={handleTotalBill('KH')} url={`bills/type-bill/KH`} />
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
                        <Title level={4}>Tổng thu chi theo từng tháng / {new Date().getFullYear()}</Title>
                    </Divider>
                    <Row>
                        <Col span={24} >
                            <BillThuLine />
                        </Col>
                        <Col span={24} >
                            <BillChiLine />
                        </Col>
                    </Row>
                    <Divider>
                        <Title level={4}>Số lượng vụ việc đã hoàn thành theo từng tháng / {new Date().getFullYear()}</Title>
                    </Divider>
                    <Row>
                        <Col span={24} >
                            <MatterFinishBar />
                        </Col>
                    </Row>
                    <Divider>
                        <Title level={4}>Thống kê lĩnh vực được quan tâm theo năm ({new Date().getFullYear()}) </Title>
                    </Divider>
                    <Row>
                        <Col span={20} >
                            <TypeServiceFavoritePie />
                        </Col>
                    </Row>
                </Col>
            </Row>
            {isModalOpenTask ? <ModalAddTask open={isModalOpenTask} onCancel={handleCancelTask} /> : null}
            {isModalOpenFee ? <ModalAddFee open={isModalOpenFee} onCancel={handleCancelFee} /> : null}

        </>
    );
}
export default Manager;