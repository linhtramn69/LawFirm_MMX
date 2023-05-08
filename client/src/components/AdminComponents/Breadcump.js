import { Breadcrumb, Col, Row } from "antd";
import Search from "antd/es/transfer/search";
function BreadcrumpAdmin() {
    return (
        <>
            <Row className="breadcrump-admin">
                <Col md={{ span: 10 }}>
                    <Breadcrumb />
                </Col>
                <Col md={{ span: 10, push: 4 }}>
                    <Search
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                    />
                </Col>
            </Row>
        </>
    );
}

export default BreadcrumpAdmin;