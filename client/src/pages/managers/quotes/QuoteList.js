import { quoteService } from "~/services";
import { useToken } from "~/store";
import { useState, useEffect, useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Space, Table, Tag } from "antd";
import moment from "moment";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from '@ant-design/icons';
const url = ['', 'admin', 'tu-van-vien']
const statusText = ['Yêu cầu báo giá', 'Đã gửi báo giá', 'Đã lên lịch']


function QuoteList() {

    let { id } = useParams();
    const { token } = useToken();
    let navigate = useNavigate();
    const [quotes, setQuotes] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    useEffect(() => {
        const getQuotes = async () => {
            const result = (await quoteService.get()).data
            const arr = id === 'all' ? result : result.filter(item => item.status == id);
            setQuotes(arr);
        };
        getQuotes()
    }, [id]);
    const data = quotes.map((value, index) => {
        return {
                stt: index + 1,
                _id: value._id,
                customer: value.khach_hang.ho_ten,
                sdt: value.khach_hang.sdt,
                email: value.khach_hang.email,
                date: value.ngay_gui_phieu ? 
                moment(value.ngay_gui_phieu).format('DD-MM-YYYY LTS')  : 
                moment(value.ngay_gui_phieu).format('DD-MM-YYYY LTS'),
                status: value.status
          
    }
    })

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Tìm kiếm theo số điện thoại khách hàng`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'sdt',
            key: 'sdt',
            ...getColumnSearchProps('sdt'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Thời gian lập phiếu',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag
                    color={status === 0 ? 'volcano' : status === 1 ? 'geekblue' : 'success'}
                >
                    {statusText[status].toUpperCase()}
                </Tag>
            ),
        },
    ];
    return (
        <>
           <Table columns={columns} dataSource={data}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            navigate(`/${url[token.account.quyen]}/quote/${record._id}`)
                        }, // click row
                    }
                }} />
        </>
    );
}

export default QuoteList;