import { Form, Input, Modal, DatePicker, Select, Button } from "antd";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState, useEffect } from "react";
import { matterService, taskService, userService } from "~/services";
import { actions, useStore, useToken } from "~/store";

dayjs.extend(customParseFormat);
const dateFormat = 'DD-MM-YYYY hh:mm A';

function ModalAddTask(props) {

    const {token} = useToken();
    const [form] = Form.useForm();
    const [state, dispatch] = useStore();
    const [staff, setStaff] = useState([]);

    const arrMatter = state.matters.map((item) => {
        return {
            value: item._id,
            label: item.ten_vu_viec
        }
    })
    useEffect(() => {
        const getStaff = async () => {
            setStaff((await userService.getByMatter(state.matter.truy_cap.nhan_vien)).data)
        }
        getStaff()
    }, [state.matter])
    const handleChangeMatter = async (data) => {
        const matter = (await matterService.getById(data)).data
        dispatch(actions.setMatter(matter))
    }
    const arrStaff = staff.map((item) => {
        return {
            value: item._id,
            label: item.ho_ten
        }
    })
    const handleAdd = async (values) => {
        try {
            await taskService.create(values).data;
            setTimeout(()=> props.onCancel(false), 50);
        }
        catch (err) {
            console.log(err);
        }
    }
    const onSubmit = (values) => {
        const newVal = {
            ten_cong_viec: values.nameTask,
            nguoi_phu_trach: values.staff,
            nguoi_phan_cong: token._id,
            vu_viec: values.matter,
            han_chot_cong_viec: values.dateEnd,
            ngay_giao: new Date(),
            status: 0
        }
        form.resetFields();
        handleAdd(newVal);
    }
    return (
        <Modal title="Công việc mới" width={800} {...props} footer={null}>
            <Form
                form={form}
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{ padding: 30 }}
                onFinish={onSubmit}
                >
                <Form.Item
                    label="Vụ việc"
                    name='matter'
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn vụ việc cần được giao',
                        },
                    ]}>
                    <Select options={arrMatter} onChange={handleChangeMatter} />
                </Form.Item>
                <Form.Item
                    label="Phụ trách"
                    name='staff'
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn nhân viên phụ trách',
                        },
                    ]}>
                    <Select options={arrStaff} />
                </Form.Item>
                <Form.Item
                    label="Tên công việc"
                    name='nameTask'
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên công việc mới',
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Hạn chót công việc"
                    name='dateEnd'>
                    <DatePicker showTime format={dateFormat} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 20,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ModalAddTask;