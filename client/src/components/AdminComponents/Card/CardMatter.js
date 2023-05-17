import { Col } from "antd";
import { Link } from "react-router-dom";

function CardMatter({ title, total, url, color }) {
    return (
        <Col md={{span: 8}} xs={{span: 8}}>
            <Link to={url} >
                <div className="card-matter" 
                    style={{
                        background: color===0 ? `linear-gradient(to bottom, #33ccff 0%, #3366ff 100%)` 
                        : color === 1 ? "linear-gradient(to top, #33cc33 0%, #99ff99 100%)" 
                        : color=== 2 ?  `linear-gradient(to top, #ffcc00 0%, #ffff66 100%)` 
                        : color=== 3 ?  "#d9d9d9" 
                        : `linear-gradient(to bottom, #ff6666 0%, #ff3300 100%)`
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