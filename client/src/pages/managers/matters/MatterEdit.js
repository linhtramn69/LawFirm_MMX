import { Badge, Card, Button, Popconfirm, Space, message } from "antd";
import FormMatter from "~/components/AdminComponents/Form/Matter";
import { faCircleCheck, faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "~/store";
import { matterService } from "~/services";
import { useNavigate } from "react-router-dom";
import ErrorResult from "~/pages/Result/Error";

function MatterEdit() {

    const [state, dispatch] = useStore();
    const [messageApi, contextHolder] = message.useMessage();
    let navigate = useNavigate();

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
    const handleOk = async (value) => {
        try {
            await matterService.setStatus(state.matter._id, { status: value })
            success()
            setTimeout(() => {
                navigate(`/staff/matters/${state.matter._id}`)
            }, [500])
        } catch (err) {
            error()
        }
    }
    
    return (
        <>
            {
                state.matter._id ?
                    <Card
                        title=
                        {
                            state.matter.status == 0 ? <Badge status="processing" text="Đang thực hiện" />
                                : state.matter.status == 1 ? <Badge status="success" text="Hoàn thành" />
                                    : <Badge status="warning" text="Tạm ngưng" />
                        }
                        extra={
                            state.matter.status == 0 ?
                                <Space>
                                    <Popconfirm
                                        placement="topRight"
                                        title="Hoàn thành vụ việc"
                                        description="Bạn có chắc là vụ việc đã hoàn thành chứ?"
                                        okText="Xác nhận"
                                        cancelText="Hủy"
                                        onConfirm={() => handleOk(1)}
                                    >
                                        <Button
                                            className="btn btn-status"
                                            icon={<FontAwesomeIcon
                                                style={{
                                                    color: '#389e0d',
                                                    marginRight: 10
                                                }} icon={faCircleCheck} />}>Hoàn thành</Button>
                                    </Popconfirm>
                                    <Popconfirm
                                        placement="topRight"
                                        title="Tạm ngưng vụ việc"
                                        description="Bạn có chắc là vụ việc sẽ tạm ngưng chứ?"
                                        okText="Xác nhận"
                                        cancelText="Hủy"
                                        onConfirm={() => handleOk(2)}
                                    >
                                        <Button className="btn btn-status" icon={<FontAwesomeIcon style={{
                                            color: '#faad14',
                                            marginRight: 10
                                        }} icon={faCirclePause} />}>Tạm ngưng</Button>
                                    </Popconfirm>

                                </Space> : state.matter.status == 2 ?
                                    <Popconfirm
                                        placement="topRight"
                                        title="Tiếp tục"
                                        description="Bạn có chắc là vụ việc sẽ tạm ngưng chứ?"
                                        okText="Xác nhận"
                                        cancelText="Hủy"
                                        onConfirm={() => handleOk(0)}
                                    >
                                        <Button className="btn btn-status" icon={<FontAwesomeIcon style={{
                                            color: '#faad14',
                                            marginRight: 10
                                        }} icon={faCirclePlay} />}>Tiếp tục</Button>
                                    </Popconfirm>
                                    : null
                        }>
                        <FormMatter props={state.matter} />
                    </Card>
                    :
                    <ErrorResult />
            }

        </>
    );
}

export default MatterEdit;