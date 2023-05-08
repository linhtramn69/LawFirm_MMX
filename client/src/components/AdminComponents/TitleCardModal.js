import { Col, Row, Steps } from "antd";
import Title from "antd/es/typography/Title";
function TitleCardModal(props) {
    // console.log({...props});
    return (
        <>
            <Row style={{padding: 20}}>
                <Col span={10}>
                    <Title level={3}>{props.title}</Title>
                </Col>
                <Col span={10} push={4}>
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