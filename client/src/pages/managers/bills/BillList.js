import { Card, Table, Tag } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { billService } from "~/services";
import { useToken } from "~/store";
const statusText = ['Chưa thanh toán', 'Đang thanh toán', 'Đã thanh toán']
const url = ['', 'admin', 'ke-toan']

function BillList() {

    let { id } = useParams();
    const { token } = useToken();
    const [bill, setBills] = useState([]);
    let navigate = useNavigate()


    useEffect(() => {
        const getBills = async () => {
            const result = (await billService.get()).data;
            const arr = id === 'all' ? result : result.filter(item => item.loai_hoa_don === id)
            setBills(arr);
        }
        getBills()
    }, [id])

    const data = bill.length > 0 ? bill.map((value, index) => {
        return {
            _id: value._id,
            index: index + 1,
            date: moment(value.ngay_lap).format('DD-MM-YYYY LT'),
            staff: value.nhan_vien_lap_hoa_don.ho_ten,
            total: `${value.tong_gia_tri}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ',
            type_bill: value.loai_hoa_don
        }
    }) : null
console.log(data);
    const [filteredInfo, setFilteredInfo] = useState({});
    const handleChange = (filters) => {
        setFilteredInfo(filters);
      };
    

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            width: 60
        },
        {
            title: 'Ngày lập hoá đơn',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Nhân viên lập hoá đơn',
            dataIndex: 'staff',
            key: 'staff',
        },
        {
            title: 'Tổng giá trị',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Loại hoá đơn',
            dataIndex: 'type_bill',
            key: 'type_bill',
            render: (type) => (
                type === 'NB' ? 'Nội bộ' : 'Khách hàng'
            )
        },

    ]

    return (
        <>
        <Card className="card-list">
          <Table columns={columns} dataSource={data}
                onChange={handleChange}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            navigate(`/${url[token.account.quyen]}/bill/${record._id}`)
                        }, // click row
                    }
                }} />  
        </Card>
            
        </>
    );
}

export default BillList;