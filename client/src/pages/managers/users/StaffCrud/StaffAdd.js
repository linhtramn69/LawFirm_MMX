import { faHouse, faReceipt, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Divider, Space, Typography } from "antd";
import FormLaw from "~/components/AdminComponents/Form/Law";

function StaffAdd() {

    return (
        <>
            <Card className="card-form card-detail"
                title={
                    <Space split={<Divider type="vertical" />}>
                        <Typography.Link><FontAwesomeIcon icon={faHouse} /> Vụ việc</Typography.Link>
                        <Typography.Link><FontAwesomeIcon icon={faTasks} /> Hợp đồng</Typography.Link>
                        <Typography.Link><FontAwesomeIcon icon={faTasks} /> Báo giá</Typography.Link>
                        <Typography.Link><FontAwesomeIcon icon={faReceipt} /> Hóa đơn</Typography.Link>
                    </Space>
                }
            >
                <FormLaw props={null}/>
            </Card>
        </>
    );
}

export default StaffAdd;