import { Avatar, Button, Card, Col, Divider, Row, Space, } from "antd";
import {
    ReconciliationFilled,
    UsbFilled,
    CalendarFilled,
} from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import CardMatter from "../../../components/AdminComponents/Card/CardMatter";
import { actions, useStore, useToken } from "~/store";
import { useEffect } from "react";
import { quoteService, timeAppointmentService } from "~/services";
import { useState } from "react";
import moment from "moment";
import { TypeServiceFavoritePie } from "../Chart/TypeServiceFavoritePie";
import { Link } from "react-router-dom";
import { ProvincePie } from "../Chart/ProvincePie";
const styleCol = {
    textAlign: 'center'
}
function QuoteManager() {
    const [state, dispatch] = useStore();
    const [time, setTime] = useState([]);
    const { token } = useToken()
    useEffect(() => {
        const getQuotes = async () => {
            const quote = (await quoteService.get()).data;
            dispatch(actions.setQuotes(quote));
        }
        const getTime = async () => {
            const time = (await timeAppointmentService.findByStaff({ id: token._id })).data;
            setTime(time)
        }
        getTime()
        getQuotes();
    }, [])
    const handleTotalQuote = (value) => {
        const arr = state.quotes.filter(vl => vl.status === value)
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
    console.log(time);
    return (
        <>

            <Space wrap direction="horizontal">
                <Link to={`/tu-van-vien/quotes/add`}>
                    <Button className="btn-cyan" icon={<UsbFilled />} block>Báo giá mới</Button>
                </Link>
                <Button className="btn-cyan" icon={<CalendarFilled />} block>Lịch hẹn mới</Button>
            </Space>
            <Divider />
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
                            <Title level={5}>Báo giá</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8, 8]}>
                                <CardMatter title="Yêu cầu báo giá" total={handleTotalQuote(0)} color={0} url={`/tu-van-vien/quotes/0`} />
                                <CardMatter title="Đã tạo báo giá" total={handleTotalQuote(1)} color={1} url={`/tu-van-vien/quotes/1`} />
                                <CardMatter title="Đã gửi báo giá" total={handleTotalQuote(2)} color={3} url={`/tu-van-vien/quotes/2`} />
                                <CardMatter title="Đã lên lịch" total={handleTotalQuote(3)} color={2} url={`/tu-van-vien/quotes/3`} />
                            </Row>
                        </Col>
                    </Row>
                    <Divider />
                </Col>
                <Col md={{ span: 10, push: 2 }} xs={{ span: 24 }}>
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
                    <Divider />
                </Col>
            </Row>
            <Row>
                <Col span={8} push={1}>
                    <Card className="card-chart"  style={{ width: '600px'}}
                        headStyle={{ background: 'linear-gradient(to bottom, #3333cc 0%, #000066 100%)', color: 'white', textAlign: 'center' }}
                        title={`Lĩnh vực được quan tâm theo năm ${new Date().getFullYear()} / Tỷ lệ %`}>
                        <TypeServiceFavoritePie />
                    </Card>
                </Col>
                <Col span={8} push={5}>
                    <Card className="card-chart" style={{ width: '600px'}}
                        headStyle={{ background: 'linear-gradient(to bottom, #3333cc 0%, #000066 100%)', color: 'white', textAlign: 'center' }}
                        title={`Khách hàng theo khu vực`}>
                        <ProvincePie />
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default QuoteManager;