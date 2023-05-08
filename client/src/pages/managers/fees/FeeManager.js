import { Avatar, Button, Col, Divider, Row, Space, } from "antd";
import {
    ReconciliationFilled,
    UsbFilled,
    CalendarFilled,
} from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import CardMatter from "../../../components/AdminComponents/Card/CardMatter";
import { actions, useStore, useToken } from "~/store";
import { useEffect } from "react";
import { billService, feeService, matterService } from "~/services";
const styleCol = {
    textAlign: 'center'
}
const url = ['', 'admin', 'ke-toan']
function FeeManager() {
    const { token } = useToken();
    const [state, dispatch] = useStore()
    useEffect(() => {
        const getFees = async () => {
            const fee = (await feeService.get()).data;
            const bill = (await billService.get()).data;
            const matter = (await matterService.get()).data;
            dispatch(actions.setMatters(matter));
            dispatch(actions.setFees(fee));
            dispatch(actions.setBills(bill));
        }
        getFees();
    }, [])
    const handleTotalMatter = (value) => {
        const arr = state.matters.filter(vl => vl.status_tt === value)
        return arr.length
    }
    const handleTotalFee = (value) => {
        const arr = state.fees.filter(vl => vl.status_tt === value)
        return arr.length
    }
    const handleTotalBill = (value) => {
        const arr = state.bills.filter(vl => vl.loai_hoa_don === value)
        return arr.length
    }
    return (
        <>
            <Space wrap direction="horizontal">
                <Button className="btn-cyan" icon={<UsbFilled />} block>Hóa đơn mới</Button>
                <Button className="btn-cyan" icon={<CalendarFilled />} block>Kết toán mới</Button>
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
                                <CardMatter title="Nội bộ" color={0} total={handleTotalBill('NB')} url={`/ke-toan/bills/type-bill/NB`} />
                                <CardMatter title="Khách hàng" color={1} total={handleTotalBill('KH')} url={`/ke-toan/bills/type-bill/KH`} />
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
                            <Row gutter={[8, 8]}>
                                <CardMatter title="Chưa thanh toán" color={0} total={handleTotalMatter(0)} url={`/${url[token.account.quyen]}/matters/0`} />
                                <CardMatter title="Đang thanh toán" color={2}total={handleTotalMatter(1)} url={`/${url[token.account.quyen]}/matters/1`} />
                                <CardMatter title="Đã thanh toán" color={1} total={handleTotalMatter(2)} url={`/${url[token.account.quyen]}/matters/2`}/>
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
                            <Title level={5}>Tiền lương</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8, 8]}>
                                <CardMatter title="Lương cứng" total={0} url={`/ke-toan/fees`} />
                                <CardMatter title="Hoa hồng" total={0} url={`/ke-toan/quotes/`} />
                                <CardMatter title="Nghỉ phép" total={0} />
                            </Row>
                        </Col>
                    </Row>
                    <Divider />

                </Col>
                {/* <Col md={{ span: 12, push: 2 }} xs={{ span: 24 }}>
                    <Chart title="Tổng thu phí vụ việc" data={[10, 15, 18, 30, 32, 39, 45, 69, 54, 23, 12, 36]} />
                    <Divider />
                    <Chart title="Vụ việc tính phí trong năm" data={[10, 15, 18, 30, 32, 39, 45, 69, 54, 23, 12, 36]} />

                </Col> */}
            </Row>
        </>
    );
}

export default FeeManager;