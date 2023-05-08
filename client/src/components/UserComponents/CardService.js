import { Card } from "antd";
import Meta from "antd/es/card/Meta";
function CardService({title, img, description}) {
    return (
        <>
            <Card
                className="card-service"
                hoverable
                cover={<img alt="" src={img} />}
            >
                <Meta title={title} description={description} />
                <button className="btn-card">Xem chi tiết</button>
            </Card>
        </>
    );
}

export default CardService;