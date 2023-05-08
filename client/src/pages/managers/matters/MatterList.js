import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { matterService, serviceService, typeServiceService, userService } from "~/services";
import { useToken } from "~/store";
import { Button, Input, Space, Table, Tag, Tooltip } from "antd";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
const statusText = ['Đang thực hiện', 'Hoàn thành', 'Tạm ngưng'];
const statusTT = ['Chưa thanh toán', 'Đang thanh toán', 'Đã thanh toán'];
function MatterList() {

    let { id } = useParams();
    let navigate = useNavigate();
    const { token } = useToken();
    const [matters, setMatters] = useState([]);
    const [type, setType] = useState([]);
    const [service, setService] = useState([]);
    const [law, setLaw] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    let url = 'admin'
    if(token.chuc_vu._id === 'LS02')
        url = 'staff'
    else if(token.chuc_vu._id === 'TVV02') 
        url = 'tro-ly'
    else if(token.chuc_vu._id === 'KT02') 
        url = 'ke-toan'

    useEffect(() => {
        const getMatter = async () => {
            const result =
                token.account.quyen === 1 || token.chuc_vu._id === 'KT02' ?
                    ((await matterService.get()).data)
                    : ((await matterService.findByIdAccess({ id: token._id })).data)
            const arr = id === 'all' ? result : result.filter(item => item.status == id || item.status_tt == id)
            setMatters(arr)
        }
        const getType = async () => {
            setType((await typeServiceService.get()).data)
        }
        const getService = async () => {
            setService((await serviceService.get()).data)
        }
        const getLaw = async () => {
            setLaw((await userService.getByBoPhan('LS')).data)
        }
        getMatter()
        getType()
        getService()
        getLaw()
    }, [id])

    const data = matters.map((value, index) => {
        return {
            _id: value._id,
            key: index + 1,
            nameMatter: value.ten_vu_viec,
            typeService: value.linh_vuc.ten_linh_vuc,
            service: value.dich_vu.ten_dv,
            customer: value.khach_hang.ho_ten,
            phoneCus: value.khach_hang.account.sdt,
            law: value.luat_su.ho_ten,
            status: value.status,
            status_tt: value.status_tt
        }
    })
    const arrType = type.map((value) => {
        return {
            value: value.ten_linh_vuc,
            text: value.ten_linh_vuc
        }
    })
    const arrService = service.map((value) => {
        return {
            value: value.ten_dv,
            text: value.ten_dv
        }
    })
    const arrLaw = law.map((value) => {
        return {
            value: value.ho_ten,
            text: value.ho_ten
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
            dataIndex: 'key',
            key: 'key',
            width: 60
        },
        {
            title: 'Tên vụ việc',
            dataIndex: 'nameMatter',
            key: 'nameMatter',
            ellipsis: {
                showTitle: false,
            },
            render: (nameMatter) => (
                <Tooltip placement="topLeft" title={nameMatter}>
                    {nameMatter}
                </Tooltip>
            ),
        },
        {
            title: 'Lĩnh vực',
            dataIndex: 'typeService',
            key: 'typeService',
            filters: arrType,
            onFilter: (value, record) => record.typeService.startsWith(value),
            ellipsis: {
                showTitle: false,
            },
            render: (typeService) => (
                <Tooltip placement="topLeft" title={typeService}>
                    {typeService}
                </Tooltip>
            ),
        },
        {
            title: 'Dịch vụ',
            dataIndex: 'service',
            key: 'service',
            filters: arrService,
            onFilter: (value, record) => record.service.startsWith(value),
            filterSearch: true,
            ellipsis: {
                showTitle: false,
            },
            render: (service) => (
                <Tooltip placement="topLeft" title={service}>
                    {service}
                </Tooltip>
            ),
        },
        {
            title: 'Luật sư phụ trách',
            dataIndex: 'law',
            key: 'law',
            filters: arrLaw,
            onFilter: (value, record) => record.law.startsWith(value),
            filterSearch: true,
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Số điện thoại khách hàng',
            dataIndex: 'phoneCus',
            key: 'phoneCus',
            ...getColumnSearchProps('phoneCus'),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status) => (
                <Tag
                    color={status === 0 ? 'geekblue' : status === 1 ?  'success' : 'volcano'}
                >
                    {statusText[status]}
                </Tag>
            ),
        },
        {
            title: 'Thanh toán',
            dataIndex: 'status_tt',
            render: (status_tt) => (
                <Tag
                    color={status_tt === 0 ? 'volcano' : status_tt === 2 ?  'success' : 'geekblue'}
                >
                    {statusTT[status_tt]}
                </Tag>
            ),
        },
    ]

    return (
        <>
            <Table columns={columns} dataSource={data}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            navigate(`/${url}/matter/${record._id}`)
                        }, // click row
                    }
                }} />
        </>
    );
}

export default MatterList;