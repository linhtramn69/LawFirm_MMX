import { Table, Tag, Tooltip } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { taskService, userService } from "~/services";
import { useToken } from "~/store";
const statusText = ['Đã giao', 'Hoàn thành', 'Tạm ngưng']

function TaskListGiao() {

    let { id } = useParams()
    let navigate = useNavigate();
    const { token } = useToken();
    const [task, setTask] = useState([]);
    const [law, setLaw] = useState([]);
    let url = 'admin'
    if(token.chuc_vu._id === 'LS02')
        url = 'staff'
    else if(token.chuc_vu._id === 'TVV02') 
        url = 'tro-ly'

    useEffect(() => {
        const getTask = async () => {
            const result = (await taskService.getByStaffPhanCong({ id: token._id })).data
            const arr = result.filter(item => item.status == id)
            setTask(arr)
        };
        const getLaw = async () => {
            setLaw((await userService.getByBoPhan('LS')).data)
        };
        getTask();
        getLaw();
    }, [])

    const data = task.length > 0 ? task.map((value, index) => {
        return {
            _id: value._id,
            index: index + 1,
            nameTask: value.ten_cong_viec,
            matter: value.vu_viec,
            staff: value.nguoi_phu_trach.ho_ten,
            dateStart: moment(value.ngay_giao).format('DD-MM-YYYY LTS'),
            dateEnd: moment(value.han_chot_cong_viec).format('DD-MM-YYYY LTS'),
            status: value.status
        }
    }) : null
    const arrLaw = law.map((value) => {
        return {
            value: value.ho_ten,
            text: value.ho_ten
        }
    })
    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            width: 60
        },
        {
            title: 'Tên công việc',
            dataIndex: 'nameTask',
            key: 'nameTask',
            ellipsis: {
                showTitle: false,
            },
            render: (nameTask) => (
                <Tooltip placement="topLeft" title={nameTask}>
                    {nameTask}
                </Tooltip>
            ),
        },
        {
            title: 'Phụ trách',
            dataIndex: 'staff',
            key: 'staff',
            filters: arrLaw,
            onFilter: (value, record) => record.staff.startsWith(value),
            filterSearch: true,
        },
        {
            title: 'Ngày giao',
            dataIndex: 'dateStart',
            key: 'dateStart',
        },
        {
            title: 'Hạn chót',
            dataIndex: 'dateEnd',
            key: 'dateEnd',
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
                    color={status === 0 ? 'geekblue' : 'success' }
                >
                    {statusText[status]}
                </Tag>
            ),
        }
    
    ]
    return (
        <>
            <Table columns={columns} dataSource={data}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            navigate(`/${url}/task/${record._id}`)
                        }, // click row
                    }
                }} />
        </>
    );
}

export default TaskListGiao;