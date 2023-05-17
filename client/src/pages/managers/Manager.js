import { Avatar, Button, Card, Col, Divider, Row, Space, } from "antd";
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
import { billService, feeService, matterService, quoteService, taskService, timeAppointmentService } from "~/services";
import ModalAddTask from "./matters/ModalAddTask";
import ModalAddFee from "./matters/ModalAddFee";
import CardMatter from "~/components/AdminComponents/Card/CardMatter";
import { BillChiLine } from "./Chart/BillChiLine";
import { BillThuLine } from "./Chart/BillThuLine";
import { MatterFinishBar } from "./Chart/MatterFinishBar";
import { TypeServiceFavoritePie } from "./Chart/TypeServiceFavoritePie";
import { CustomerOldLine } from "./Chart/CustomerOldLine";
import moment from "moment";
import { ProvincePie } from "./Chart/ProvincePie";
const styleCol = {
    textAlign: 'center'
}
function Manager() {

    const { token } = useToken();
    const [state, dispatch] = useStore();
    const [time, setTime] = useState([]);
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
        const getQuotes = async () => {
            const quote = (await quoteService.get()).data;
            dispatch(actions.setQuotes(quote));
        }
        const getFees = async () => {
            const fee = (await feeService.get()).data;
            dispatch(actions.setFees(fee));
        }
        const getMatters = async () => {
            const matter = (await matterService.get()).data;
            dispatch(actions.setMatters(matter));
        }
        const getTasks = async () => {
            const task = (await taskService.get()).data;
            dispatch(actions.setTasks(task));
        }
        const getBills = async () => {
            const bill = (await billService.get()).data;
            dispatch(actions.setBills(bill));
        }
        const getTime = async () => {
            const time = (await timeAppointmentService.findByStaff({ id: token._id })).data;
            setTime(time)
        }
        getTime()
        getMatters();
        getBills();
        getTasks();
        getFees();
        getQuotes();
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
    const handleTimeByDay = (value) => {
        const arr = time.filter(vl => moment(vl.thoi_gian.start).format('DDMMYYYY') === moment().format('DDMMYYYY'))
        return arr.length
    }
    const handleTimeByWeek = (value) => {
        const arr = time.filter(vl => moment(vl.thoi_gian.start).week() === moment().week())
        return arr.length
    }
    const handleTimeByMonth = (value) => {
        const arr = time.filter(vl => moment(vl.thoi_gian.start).format('MMYYYY') === moment().format('MMYYYY'))
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
            </Space>
            <Divider/>
            <Row>
                <Col span={8}>
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
                        <Col md={{ span: 19, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={8}>
                                <CardMatter title="Đang thực hiện" color={0} total={handleTotalMatter(0)} url={`/admin/matters/0`} />
                                <CardMatter title="Hoàn thành" color={1} total={handleTotalMatter(1)} url={`/admin/matters/1`} />
                                <CardMatter title="Tạm ngưng" color={2} total={handleTotalMatter(2)} url={`/admin/matters/2`} />
                            </Row>
                        </Col>
                    </Row>
                    <Divider style={{paddingTop: 20}}/>
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
                        <Col md={{ span: 19, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8, 8]}>
                                <CardMatter title="Yêu cầu báo giá" total={handleTotalQuote(0)} color={0} url={`/admin/quotes/0`} />
                                <CardMatter title="Đã gửi báo giá" total={handleTotalQuote(1)} color={1} url={`/admin/quotes/1`} />
                                <CardMatter title="Đã lên lịch" total={handleTotalQuote(2)} color={2} url={`/admin/quotes/2`} />
                            </Row>
                        </Col>
                    </Row>
                    <Divider style={{paddingTop: 20}}/>
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
                                <CardMatter title="Từ chối" total={handleTotalFee(-1)} color={-1} url={`fees/-1`} />
                            </Row>
                        </Col>
                    </Row>
                    <Divider style={{paddingTop: 20}}/>
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
                    <Divider style={{paddingTop: 20}}/>
                    <Row>
                        <Col style={{ ...styleCol }} xs={{ span: 4 }}>
                            <Avatar
                                style={{ backgroundColor: `var(--grey)` }}
                                size={50}
                                icon={
                                    <ReconciliationFilled />
                                } />
                            <Title level={5}>Lịch hẹn</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8, 8]}>
                                <CardMatter title="Hôm nay" total={handleTimeByDay(0)} color={0} url={`/tu-van-vien/calendar`} />
                                <CardMatter title="Tuần này" total={handleTimeByWeek(1)} color={1} url={`/tu-van-vien/calendar`} />
                                <CardMatter title="Tháng này" total={handleTimeByMonth(2)} color={2} url={`/tu-van-vien/calendar`} />
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={10} push={1}>
                    <Space>
                        <Card className="card-chart"
                            headStyle={{ background: 'linear-gradient(to bottom, #3333cc 0%, #000066 100%)', color: 'white', textAlign: 'center' }}
                            title={`Số lượng vụ việc đã hoàn thành theo từng tháng`}>
                            <MatterFinishBar />
                        </Card>
                        <Card className="card-chart"
                            headStyle={{ background: 'linear-gradient(to bottom, #3333cc 0%, #000066 100%)', color: 'white', textAlign: 'center' }}
                            title={`Tỷ lệ khách hàng quay lại văn phòng/ Tỷ lệ %`}>
                            <CustomerOldLine />
                        </Card>
                    </Space>
                    <Divider/>
                    <Space>
                    <Card className="card-chart"
                            headStyle={{ background: 'linear-gradient(to bottom, #3333cc 0%, #000066 100%)', color: 'white', textAlign: 'center' }}
                            title={`Tổng thu khách hàng năm ${new Date().getFullYear()} / VNĐ`}>
                            <BillThuLine/>
                        </Card>
                        <Card className="card-chart"
                            headStyle={{ background: 'linear-gradient(to bottom, #3333cc 0%, #000066 100%)', color: 'white', textAlign: 'center' }}
                            title={`Tổng chi nội bộ năm ${new Date().getFullYear()} / VNĐ`}>
                            <BillChiLine/>
                        </Card>
                    </Space>
                    <Divider/>
                    <Space>
                    <Card className="card-chart"
                            headStyle={{ background: 'linear-gradient(to bottom, #3333cc 0%, #000066 100%)', color: 'white', textAlign: 'center' }}
                            title={`Lĩnh vực được quan tâm theo năm ${new Date().getFullYear()} / Tỷ lệ %`}>
                            <TypeServiceFavoritePie/>
                        </Card>
                        <Card className="card-chart"
                            headStyle={{ background: 'linear-gradient(to bottom, #3333cc 0%, #000066 100%)', color: 'white', textAlign: 'center' }}
                            title={`Khách hàng theo khu vực`}>
                            <ProvincePie/>
                        </Card>
                    </Space>
                    
                </Col>
            </Row>
            {/* <Row>
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
                                <CardMatter title="Từ chối" total={handleTotalFee(-1)} color={-1} url={`fees/-1`} />
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
                    <Row>
                        <Col span={20} >
                            <CustomerOldLine />
                        </Col>
                    </Row>
                </Col>
            </Row> */}
            {isModalOpenTask ? <ModalAddTask open={isModalOpenTask} onCancel={handleCancelTask} /> : null}
            {isModalOpenFee ? <ModalAddFee open={isModalOpenFee} onCancel={handleCancelFee} /> : null}

        </>
    );
}
export default Manager;