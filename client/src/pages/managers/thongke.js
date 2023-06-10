
import { Card, Col, Divider, Row, Space } from "antd";
import { CustomerOldLine } from "./Chart/CustomerOldLine";
import { TypeServiceFavoritePie } from "./Chart/TypeServiceFavoritePie";
import { MatterFinishBar } from "./Chart/MatterFinishBar";
import { BillChiLine } from "./Chart/BillChiLine";
import { ProvincePie } from "./Chart/ProvincePie";
import { BillThuLine } from "./Chart/BillThuLine";
function thongke() {
    return (
        <>
            <Row>
                <Col span={8} >
                    <Card className="card-chart"
                        headStyle={{ background: 'linear-gradient(to bottom, #3333cc 0%, #000066 100%)', color: 'white', textAlign: 'center' }}
                        title={`Tỷ lệ khách hàng quay lại văn phòng`}>
                        <CustomerOldLine />
                    </Card>
                    <Divider />
                    <Card className="card-chart"
                        headStyle={{ background: 'linear-gradient(to bottom, #3333cc 0%, #000066 100%)', color: 'white', textAlign: 'center' }}
                        title={`Tổng thu khách hàng năm ${new Date().getFullYear()} / VNĐ`}>
                        <BillThuLine />
                    </Card>
                    <Divider />
                    <Card className="card-chart"
                        headStyle={{ background: 'linear-gradient(to bottom, #3333cc 0%, #000066 100%)', color: 'white', textAlign: 'center' }}
                        title={`Lĩnh vực được quan tâm theo năm ${new Date().getFullYear()} / Tỷ lệ %`}>
                        <TypeServiceFavoritePie />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="card-chart"
                        headStyle={{ background: 'linear-gradient(to bottom, #3333cc 0%, #000066 100%)', color: 'white', textAlign: 'center' }}
                        title={`Số lượng vụ việc đã hoàn thành theo từng tháng / ${new Date().getFullYear()}`}>
                        <MatterFinishBar />
                    </Card>
                    <Divider />

                    <Card className="card-chart"
                        headStyle={{ background: 'linear-gradient(to bottom, #3333cc 0%, #000066 100%)', color: 'white', textAlign: 'center' }}
                        title={`Tổng chi nội bộ năm ${new Date().getFullYear()} / VNĐ`}>
                        <BillChiLine />
                    </Card>
                    <Divider />
                    <Card className="card-chart"
                        headStyle={{ background: 'linear-gradient(to bottom, #3333cc 0%, #000066 100%)', color: 'white', textAlign: 'center' }}
                        title={`Khách hàng theo khu vực`}>
                        <ProvincePie />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="card-chart"
                        headStyle={{ background: 'linear-gradient(to bottom, #3333cc 0%, #000066 100%)', color: 'white', textAlign: 'center' }}
                        title={`Số lượng vụ việc đã hoàn thành theo từng tháng / ${new Date().getFullYear()}`}>
                        <MatterFinishBar />
                    </Card>
                    <Divider />

                    <Card className="card-chart"
                        headStyle={{ background: 'linear-gradient(to bottom, #3333cc 0%, #000066 100%)', color: 'white', textAlign: 'center' }}
                        title={`Tổng chi nội bộ năm ${new Date().getFullYear()} / VNĐ`}>
                        <BillChiLine />
                    </Card>
                    <Divider />
                    <Card className="card-chart"
                        headStyle={{ background: 'linear-gradient(to bottom, #3333cc 0%, #000066 100%)', color: 'white', textAlign: 'center' }}
                        title={`Khách hàng theo khu vực`}>
                        <ProvincePie />
                    </Card>
                </Col>
            </Row>
        </>

    );
}

export default thongke;