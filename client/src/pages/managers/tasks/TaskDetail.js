import { faCancel, faCircleCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Card, Col, Descriptions, Divider, Popconfirm, Row, Tabs, message } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormAddFile from "~/components/AdminComponents/Form/FormAddFile";
import { matterService, taskService } from "~/services";
import { useStore, useToken } from "~/store";

function TaskDetail() {

    let { id } = useParams();
    const [state, disabled] = useStore();
    const [task, setTask] = useState({});
    const [matter, setMatter] = useState({});
    const [messageApi, contextHolder] = message.useMessage();
    const {token} = useToken()

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Cập nhật thành công',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Có lỗi khi xử lý',
        });
    };

    useEffect(() => {
        const getTask = async () => {
            setTask((await taskService.getById(id)).data)
        }
        getTask()
    }, [])
    useEffect(() => {
        const getMatter = async () => {
            setMatter((await matterService.getById(task.vu_viec)).data)
        }
        getMatter()
    }, [task])

    const handleOk = async (value) => {
        const newVal = {
            ...task,
            nguoi_phu_trach: task.nguoi_phu_trach._id,
            status: value
        }
        try {
            const rs = (await taskService.update(task._id, newVal)).data
            success();
            setTask(rs);
        }
        catch (err) {
            error();
        }
    }
    const handleSubmit = async () => {
        const newData = {
            ...task,
            nguoi_phu_trach: task.nguoi_phu_trach._id,
            tai_lieu: state.files
        }
        try {
            if (window.confirm(`Bạn muốn cập nhật lại công việc ${task.ten_cong_viec} ?`)) {
                try{
                    const rs = (await taskService.update(task._id, newData)).data;
                    setTask(rs);
                    success();
                }
                catch(err){
                    error();
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    
    return (
        <>
            {contextHolder}
            <Card
                style={{ width: '90%', marginLeft: 60 }}
                title={
                    task.status === 0 ? <Badge status="processing" text="Đã giao" />
                        : task.status === 1 ? <Badge status="warning" text="Trình duyệt" />
                        : task.status === 2 ? <Badge status="success" text="Hoàn thành" />
                            : <Badge status="warning" text="Tạm ngưng" />
                }
                extra={
                    task.status === 0 ?
                        <Popconfirm
                            placement="topRight"
                            title="Trình duyệt công việc"
                            description="Bạn có chắc là công việc đã thực hiện xong chứ?"
                            okText="Xác nhận"
                            cancelText="Hủy"
                            onConfirm={() => handleOk(1)}
                        >
                            <Button
                                className="btn btn-status"
                                icon={<FontAwesomeIcon
                                    style={{
                                        color: '#faad14',
                                        marginRight: 10
                                    }} icon={faPen} />}>Trình lên duyệt</Button>
                        </Popconfirm> 
                        : task.status === 1 && token.chuc_vu._id == 'TL02' ?
                        <Popconfirm
                            placement="topRight"
                            title="Huỷ trình công việc"
                            description="Bạn có chắc muốn huỷ trình công việc này chứ?"
                            okText="Xác nhận"
                            cancelText="Hủy"
                            onConfirm={() => handleOk(0)}
                        >
                            <Button
                                className="btn btn-status"
                                icon={<FontAwesomeIcon
                                    style={{
                                        color: '#cf1322',
                                        marginRight: 10
                                    }} icon={faCancel} />}>Huỷ trình</Button>
                        </Popconfirm>
                        : task.status === 1 && token.chuc_vu._id == 'LS02' ?
                        <Popconfirm
                            placement="topRight"
                            title="Hoàn thành công việc"
                            description="Bạn có chắc chắn là công việc này đã hoàn thành chứ chứ?"
                            okText="Xác nhận"
                            cancelText="Hủy"
                            onConfirm={() => handleOk(2)}
                        >
                            <Button
                                className="btn btn-status"
                                icon={<FontAwesomeIcon
                                    style={{
                                        color: '#389e0d',
                                        marginRight: 10
                                    }} icon={faCircleCheck} />}>Hoàn thành</Button>
                        </Popconfirm>
                        : <></>

                }
            >
                {
                    matter._id ?
                        <Row>
                            <Col md={{ span: 12, push: 1 }}>
                                <Descriptions
                                    title="Vụ việc"
                                    column={{
                                        md: 2,
                                    }}>
                                    <Descriptions.Item span={2} label="Tên vụ việc">{matter.ten_vu_viec}</Descriptions.Item>
                                    <Descriptions.Item span={1} label="Lĩnh vực">{matter.linh_vuc.ten_linh_vuc}</Descriptions.Item>
                                    <Descriptions.Item span={1} label="Dịch vụ">{matter.dich_vu.ten_dv}</Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col md={{ span: 10, push: 2 }}>
                                <Descriptions
                                    title="Luật sư phụ trách"
                                    column={{
                                        md: 2,
                                    }}>
                                    <Descriptions.Item span={2} label="Tên luật sư">{matter.luat_su.ho_ten}</Descriptions.Item>
                                    <Descriptions.Item span={1} label="Số điện thoại">{matter.luat_su.account.sdt}</Descriptions.Item>
                                    <Descriptions.Item span={1} label="Email">{matter.luat_su.email}</Descriptions.Item>
                                </Descriptions>
                            </Col>
                        </Row> : <></>
                }
                <Divider />
                {
                    task._id ?
                        <Row>
                            <Col md={{ span: 12, push: 1 }}>
                                <Descriptions
                                    title="Thông tin chi tiết"
                                    column={{
                                        md: 2,
                                    }}>
                                    {
                                        task._id ?
                                            <>
                                                <Descriptions.Item span={2} label="Tên công việc">{task.ten_cong_viec}</Descriptions.Item>
                                                <Descriptions.Item span={1} label="Ngày giao">
                                                    {moment(task.ngay_giao).format('DD-MM-YYYY LT')}
                                                </Descriptions.Item>
                                                <Descriptions.Item span={1} label="Hạn chót công việc">
                                                    {moment(task.han_chot_cong_viec).format('DD-MM-YYYY LT')}
                                                </Descriptions.Item>
                                            </> : <></>
                                    }
                                </Descriptions>
                            </Col>
                            <Col md={{ span: 10, push: 2 }}>
                                <Descriptions
                                    title="Phụ trách công việc"
                                    column={{
                                        md: 2,
                                    }}>
                                    {
                                        task._id ?
                                            <>
                                                <Descriptions.Item span={2} label="Họ tên">{task.nguoi_phu_trach.ho_ten}</Descriptions.Item>
                                                <Descriptions.Item span={1} label="Số điện thoại">
                                                    {task.nguoi_phu_trach.account.sdt}
                                                </Descriptions.Item>
                                                <Descriptions.Item span={1} label="Email">
                                                    {task.nguoi_phu_trach.email}
                                                </Descriptions.Item>
                                            </> : <></>
                                    }
                                </Descriptions>
                            </Col>
                        </Row>
                        : <></>
                }
                <Divider />
                <Tabs type="card"
                    items={[
                        {
                            key: '1',
                            label: `Tài liệu đính kèm`,
                            children: task._id && task.status == 0 ? <FormAddFile fileTask = {task.tai_lieu}/> :
                            task._id && task.status != 0 ?
                            <FormAddFile fileTask = {task.tai_lieu} props={1}/>
                            : <></>
                        },
                    ]} />
                {task.status === 0 ?
                    <Button type="primary" onClick={handleSubmit} className="btn-submit">Lưu thông tin</Button>
                    : <></>}

            </Card>
        </>
    );
}

export default TaskDetail;