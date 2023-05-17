import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { matterService, periodService, serviceService, typeServiceService, userService } from "~/services";
import { useToken } from "~/store";
import { Button, Card, Input, Progress, Space, Table, Tag, Tooltip } from "antd";
import Highlighter from 'react-highlight-words';
import { SearchOutlined, ReconciliationFilled } from '@ant-design/icons';
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
    const [dataSource, setDataSource] = useState([])
    const [period, setPeriod] = useState([])
    let url = 'admin'
    if(token.account.quyen != 0){
         if (token.chuc_vu._id === 'LS02')
        url = 'staff'
    else if (token.chuc_vu._id === 'TL02')
        url = 'tro-ly'
    else if (token.chuc_vu._id === 'KT02')
        url = 'ke-toan'
    }
   
    const get_day_of_time = (d1, d2) => {
        let ms1 = d1.getTime();
        let ms2 = d2.getTime();
        return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
    };
    const handleTotalMatterDay = (value, array) => {
        const arr = array.filter(vl =>
            vl.status_tt != 2 &&
            vl.dieu_khoan_thanh_toan.ten - get_day_of_time(new Date(vl.ngay_lap), new Date()) <= value
            && vl.dieu_khoan_thanh_toan.ten - get_day_of_time(new Date(vl.ngay_lap), new Date()) >= 0)

        return arr
    }
    const handleTotalMatterMiss = (array) => {
        const arr = array.filter(vl =>
            vl.status_tt != 2 &&
            vl.dieu_khoan_thanh_toan.ten < get_day_of_time(new Date(vl.ngay_lap), new Date()))
        return arr
    }
    useEffect(() => {
        const getMatter = async () => {
            const result =
            token.account.quyen === 0 ? ((await matterService.findByIdAccessUser({ id: token._id })).data)
               : token.account.quyen === 1 || token.chuc_vu._id === 'KT02' ?
                    ((await matterService.get()).data)
                    : token.chuc_vu._id === 'TL02' ?
                        ((await matterService.findByIdAccess({ id: token.boss })).data)
                        : ((await matterService.findByIdAccess({ id: token._id })).data)
            const arr = id === 'all' ? result
                : id === 'tt-1' ? handleTotalMatterDay(1, result)
                    : id === 'tt-7' ? handleTotalMatterDay(7, result)
                        : id === 'tt-30' ? handleTotalMatterDay(30, result)
                            : id === 'tt-miss' ? handleTotalMatterMiss(result)
                                : result.filter(item => item.status == id)
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
    console.log(matters);
    useEffect(() => {
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
                status: `${value.status}`,
                status_tt: `${value.status_tt}`,
                progress: value.quy_trinh ?
                 Math.floor((((value.quy_trinh.filter((item) => item.status > 0))).length / value.quy_trinh.length) * 100)
                 : 0
            }
        })
        setDataSource(data)
    }, [matters])
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
                    placeholder={dataIndex == 'phoneCus' ? `Tìm kiếm theo số điện thoại khách hàng` : `Tìm kiếm theo tên`}
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
            filterSearch: true,
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
            ...getColumnSearchProps('customer')
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
            key: 'status',
            filters: [
                {
                    text: 'Đang thực hiện',
                    value: 0
                },
                {
                    text: 'Đã hoàn thành',
                    value: 1
                },
                {
                    text: 'Tạm ngưng',
                    value: 2
                }
            ],
            onFilter: (value, record) => record.status.startsWith(value),

            render: (status) => (
                <Tag
                    color={status == 0 ? 'geekblue' : status == 1 ? 'success' : 'volcano'}
                >
                    {statusText[status]}
                </Tag>
            ),
        },
        {
            title: 'Thanh toán',
            dataIndex: 'status_tt',
            filters: [
                {
                    text: 'Chưa thanh toán',
                    value: 0
                },
                {
                    text: 'Đang thanh toán',
                    value: 1
                },
                {
                    text: 'Đã thanh toán',
                    value: 2
                }
            ],
            onFilter: (value, record) => record.status_tt.startsWith(value),
            render: (status_tt) => (
                <Tag
                    color={status_tt == 0 ? 'volcano' : status_tt == 2 ? 'success' : 'geekblue'}
                >
                    {statusTT[status_tt]}
                </Tag>
            ),
        },
        {
            title: 'Tiến độ',
            dataIndex: 'progress',
            sorter: (a, b) => a.progress - b.progress,
            render: (progress) => (
                <Progress percent={(
                    progress

                )} strokeColor={
                    progress < 50
                        ? "#1677ff"
                        :
                        progress >= 50
                            &&
                            progress < 100
                            ? "#fadb14"
                            : '#7cb305'
                } />
                // progress ?
                //     <Progress percent={(
                //         Math.floor((((progress.filter((item) => item.status > 0))).length / progress.length) * 100)

                //     )} strokeColor={
                //         (((progress.filter((item) => item.status > 0))).length / progress.length) * 100 < 50
                //             ? "#1677ff"
                //             :
                //             (((progress.filter((item) => item.status > 0))).length / progress.length) * 100 >= 50
                //                 &&
                //                 (((progress.filter((item) => item.status > 0))).length / progress.length) * 100 < 100
                //                 ? "#fadb14"
                //                 : '#7cb305'
                //     } />
                //     : <Progress percent={0} />


            ),
        },
    ]
    return (
        <>
            {token.account.quyen === 1 ?
                <Link to="/admin/matter/add">
                    <Button className="btn-cyan" icon={<ReconciliationFilled />} block>Vụ việc mới</Button>
                </Link>
                : null
            }
            <Card className="card-list">
                <Table columns={columns} dataSource={dataSource}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                navigate(
                                        token.account.quyen == 0 ? `/matter/${record._id}`
                                     : `/${url}/matter/${record._id}`
                                       )
                            }, // click row
                        }
                    }} />
            </Card>

        </>
    );
}

export default MatterList;