import { Badge, Card } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { accountingEntryService } from "~/services";

function FormAccountingEntry({ props }) {
    const [buttoan, setButtoan] = useState();
    useEffect(() => {
        const getButtoan = async () => {
            const result = (await accountingEntryService.get()).data
            const rs = result.find((item) => item.vu_viec === props)
            setButtoan(rs)
        }
        getButtoan()
    }, [])
    return (
        <>
        <div style={{width: 600, margin: 50}}>
             <Badge.Ribbon text="Chưa thanh toán">
                <Card title="Thông tin bút toán"  size="small">
                    cc
                </Card>
            </Badge.Ribbon>
        </div>
           
        </>
    );
}

export default FormAccountingEntry;