import { Table, Tag } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { feeService } from "~/services";
import { useToken } from "~/store";
const statusText = ['Đã trình', 'Đã duyệt', 'Đã duyệt', 'Đã từ chối']
const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
        key: 'key',
        width: 60
    },
    {
        title: 'Mô tả',
        dataIndex: 'mo_ta',
        key: 'mo_ta',
    },
    {
        title: 'Đơn giá',
        dataIndex: 'don_gia',
        key: 'don_gia',
    },
    {
        title: 'Ngày lập',
        dataIndex: 'ngay_lap',
        key: 'ngay_lap',
    },
    {
        title: 'Nhân viên',
        dataIndex: 'staff',
        key: 'staff',
    },
    {
        title: 'Tiến độ công việc',
        dataIndex: 'status',
        key: 'status',
        ellipsis: {
            showTitle: false,
        },
        render: (status) => (
            <Tag
                color={status === 0 ? 'cyan' : status === 1 ? 'geekblue' : status === 2 ? 'green' : 'error'}
            >
                {statusText[status]}
            </Tag>
        ),
    }

]
const url = ['', 'admin', 'ke-toan']

function FeeList() {

    let { id } = useParams();
    const { token } = useToken();
    const [fee, setFees] = useState([]);
    let navigate = useNavigate()
    
    useEffect(() => {
        const getFees = async () => {
            const result = (await feeService.get()).data;
            const arr = id === 'all' ? result : result.filter(item => item.status == id)
            setFees(arr);
        }
        getFees()
    }, [id])

    const data = fee.length > 0 ? fee.map((value, index) => {
        return {
            _id: value._id,
            key: index + 1,
            mo_ta: value.mo_ta,
            don_gia: `${value.don_gia}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ',
            ngay_lap: moment(value.ngay_lap).format('DD-MM-YYYY LT'),
            staff: value.nhan_vien.ho_ten,
            status: value.status
        }
    }) : null

    return (
        <>
            <Table columns={columns} dataSource={data}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            navigate(`/${url[token.account.quyen]}/fee/${record._id}`)
                        }, // click row
                    }
                }} />
        </>
    );
}

export default FeeList;