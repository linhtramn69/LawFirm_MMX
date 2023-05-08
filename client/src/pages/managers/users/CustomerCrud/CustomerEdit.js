import { faHouse, faReceipt, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Divider, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormCustomer } from "~/components";
import { userService } from '../../../../services/index';

function CustomerEdit() {

    let { id } = useParams();
    const [user, setUser] = useState({
        account: {
            sdt: '',
            mat_khau: ''
        }
    });

    useEffect(() => {
        const getUser = async () => {
            setUser((await userService.getById(id)).data)
        };
        getUser();
    }, [id]);

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
                <FormCustomer props={user} />
            </Card>
        </>
    );
}

export default CustomerEdit;