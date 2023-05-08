import { Col } from "antd";
import { Link } from "react-router-dom";

function CardMatter({ title, total, url, color }) {
    return (
        <Col md={{span: 8}} xs={{span: 8}}>
            <Link to={url} >
                <div className="card-matter" 
                    style={{
                        backgroundColor: color===0 ? "#91caff" : color===1 ? "#95de64" : color===2 ?  "#fff566" : "#ff9c6e"
                    }
                }
                >
                    <p>{total}</p>
                    <p>{title}</p>
                </div>
            </Link>
        </Col>
    );
}

export default CardMatter;