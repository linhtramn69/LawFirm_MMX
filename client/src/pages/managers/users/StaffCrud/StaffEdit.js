import { faHouse, faReceipt, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Divider, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormLaw from "~/components/AdminComponents/Form/Law";
import { userService } from '../../../../services/index';

function StaffEdit() {

    let { id } = useParams();
    const [user, setUser] = useState({
        account: {
            sdt: '',
            mat_khau: ''
        },
        chuc_vu: {
            ten_chuc_vu: ''
        },
        bo_phan: {
            ten_bo_phan: ''
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
                <FormLaw props={user} />
            </Card>
        </>
    );
}

export default StaffEdit;