import { Col, Row, Steps } from "antd";
import Title from "antd/es/typography/Title";
function TitleCardModal(props) {
    return (
        <>
            <Row style={{padding: 20}}>
                <Col span={10}>
                    <Title level={3}>{props.title}</Title>
                </Col>
                <Col span={12} push={2}>
                    <Steps
                    size="small"
                    current={props.current}
                    type="navigation"
                    items={props.item}
                    />
                </Col>
            </Row>
        </>
    );
}

export default TitleCardModal;