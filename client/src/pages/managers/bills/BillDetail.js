import { Button, Card, Col, Descriptions, Divider, Form, Input, Modal, Row, Space, Tabs } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { billService, feeService, matterService } from "~/services";
import { useStore } from "~/store";

function BillDetail() {

    let { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [bill, setBill] = useState({});
    const [fee, setFee] = useState({});
    const [matter, setMatter] = useState({});

    useEffect(() => {
        const getBill = async () => {
            const result = (await billService.getById(id)).data;
            setBill(result);
        }
        getBill();
    }, [])
    useEffect(() => {
        const getFee = async () => {
            const result = (await feeService.getById(bill.chi_phi_phat_sinh)).data;
            setFee(result);
        }
        const getMatter = async () => {
            const result = (await matterService.getById(bill.vu_viec)).data;
            setMatter(result);
        }
        getFee();
        getMatter();
    }, [bill])
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOpen = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            {bill._id &&  bill.loai_hoa_don === 'NB'
                ?
                <Card
                    title="Chi tiết hoá đơn"
                    style={{
                        width: 1200,
                        marginLeft: 100,
                        padding: '0 20px'
                    }}>
                    <Row>
                        <Col md={{ span: 12 }}>
                            <Descriptions
                                column={{
                                    md: 1,
                                }}
                                title="Thông tin tài khoản khách">
                                <Descriptions.Item label="Ngân hàng">{bill.tai_khoan_khach.ngan_hang}</Descriptions.Item>
                                <Descriptions.Item label="Số tài khoản">{bill.tai_khoan_khach.so_tai_khoan}</Descriptions.Item>
                                <Descriptions.Item label="Chủ tài khoản">{bill.tai_khoan_khach.chu_tai_khoan}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col md={{ span: 12, push: 1 }}>
                            <Descriptions
                                column={{
                                    md: 1,
                                }}
                                title="Thông tin hoá đơn">
                                <Descriptions.Item label="Nhân viên lập">{bill.nhan_vien_lap_hoa_don.ho_ten}</Descriptions.Item>
                                <Descriptions.Item label="Loại hoá đơn">{bill.loai_hoa_don === 'NB' ? 'Nội bộ' : 'Khách hàng'}</Descriptions.Item>
                                <Descriptions.Item label="Ngày lập">{moment(bill.ngay_lap).format('DD-MM-YYYY LT')}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                    {fee && fee.nhan_vien
                        ?
                        <Tabs items={[
                            {
                                key: '1',
                                label: `Chi tiết hoá đơn`,
                                children: <Row>
                                    <Col md={{ span: 12 }}>
                                        <Descriptions
                                            column={{
                                                md: 2,
                                            }}
                                            title="Nội dung">
                                            <Descriptions.Item label="Mô tả">{fee.mo_ta}</Descriptions.Item>
                                            <Descriptions.Item label="Đơn giá">{`${fee.don_gia}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'}</Descriptions.Item>
                                            <Descriptions.Item label="Ngày lập">{moment(fee.ngay_lap).format('DD-MM-YYYY LT')}</Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                    <Col md={{ span: 12, push: 1 }}>
                                        <Descriptions
                                            column={{
                                                md: 2,
                                            }}
                                            title="Thông tin nhân viên">
                                            <Descriptions.Item label="Họ tên">{fee.nhan_vien.ho_ten}</Descriptions.Item>
                                            <Descriptions.Item label="Email">{fee.nhan_vien.email}</Descriptions.Item>
                                            <Descriptions.Item label="Số điện thoại">{fee.nhan_vien.account.sdt}</Descriptions.Item>
                                            <Descriptions.Item label="Chức vụ">{fee.nhan_vien.chuc_vu.ten_chuc_vu}</Descriptions.Item>
                                            <Descriptions.Item label="Bộ phận">{fee.nhan_vien.bo_phan.ten_bo_phan}</Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                </Row>
                            },
                        ]} />
                        : null
                    }

                    <Divider />
                    <Space direction="vertical" style={{ textAlign: 'end', float: 'right' }}>
                        <span>
                            <b style={{ marginRight: 15 }}>Tổng :</b>
                            {`${fee.don_gia}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'}</span>
                        <span>
                            <i style={{ marginRight: 15 }}>Thanh toán lúc {moment(bill.ngay_lap).format('DD-MM-YYYY LT')}</i>
                        </span>
                        <span>
                            <b style={{ marginRight: 15 }}>Số tiền phải trả:</b>
                            2,000,000đ</span>
                    </Space>

                </Card>
                : bill._id ?
                    <Card
                        title="Chi tiết hoá đơn"
                        style={{
                            width: 1200,
                            marginLeft: 100,
                            padding: '0 20px'
                        }}>
                        <Descriptions
                            column={{
                                md: 3,
                            }}
                            title="Thông tin hoá đơn">
                            <Descriptions.Item label="Nhân viên lập">{bill.nhan_vien_lap_hoa_don.ho_ten}</Descriptions.Item>
                            <Descriptions.Item label="Loại hoá đơn">{bill.loai_hoa_don === 'NB' ? 'Nội bộ' : 'Khách hàng'}</Descriptions.Item>
                            <Descriptions.Item label="Ngày lập">{moment(bill.ngay_lap).format('DD-MM-YYYY LT')}</Descriptions.Item>
                        </Descriptions>
                        <Divider />
                        <Row>
                            <Col md={{ span: 12 }}>
                                <Descriptions
                                    column={{
                                        md: 2,
                                    }}
                                    title="Tài khoản khách">
                                    <Descriptions.Item span={2} label="Ngân hàng">{bill.tai_khoan_khach.ngan_hang}</Descriptions.Item>
                                    <Descriptions.Item label="Số tài khoản">{bill.tai_khoan_khach.so_tai_khoan}</Descriptions.Item>
                                    <Descriptions.Item label="Chủ tài khoản">{bill.tai_khoan_khach.chu_tai_khoan}</Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col md={{ span: 12 }}>
                                <Descriptions
                                    column={{
                                        md: 2,
                                    }}
                                    title="Tài khoản công ty">
                                    <Descriptions.Item span={2} label="Ngân hàng">{bill.tai_khoan_cong_ty.ngan_hang}</Descriptions.Item>
                                    <Descriptions.Item label="Số tài khoản">{bill.tai_khoan_cong_ty.so_tai_khoan}</Descriptions.Item>
                                    <Descriptions.Item label="Chủ tài khoản">{bill.tai_khoan_cong_ty.chu_tai_khoan}</Descriptions.Item>
                                </Descriptions>
                            </Col>
                        </Row>
                        {
                            matter._id ?
                                <Tabs items={[

                                    {
                                        key: '1',
                                        label: `Chi tiết hoá đơn`,
                                        children: <Row>
                                            <Col md={{ span: 12 }}>
                                                <Descriptions
                                                    column={{
                                                        md: 2,
                                                    }}
                                                    title="Thông tin khách hàng">
                                                    <Descriptions.Item span={2} label="Họ tên">{matter.khach_hang.ho_ten}</Descriptions.Item>
                                                    <Descriptions.Item label="Số điện thoại">{matter.khach_hang.account.sdt}</Descriptions.Item>
                                                    <Descriptions.Item label="Email">{matter.khach_hang.email}</Descriptions.Item>
                                                </Descriptions>
                                            </Col>
                                            <Col md={{ span: 12}}>
                                            <Descriptions
                                                    column={{
                                                        md: 2,
                                                    }}
                                                    title="Thông tin vụ việc">
                                                    <Descriptions.Item  label="Tên vụ việc">{matter.ten_vu_viec}</Descriptions.Item>
                                                    <Descriptions.Item  label="Lĩnh vực">{matter.linh_vuc.ten_linh_vuc}</Descriptions.Item>
                                                    <Descriptions.Item span={2} label="Dịch vụ">{matter.dich_vu.ten_dv}</Descriptions.Item>
                                                    <Descriptions.Item label="Điều khoản thanh toán">{matter.dieu_khoan_thanh_toan.ten}</Descriptions.Item>
                                                </Descriptions>
                                            </Col>
                                        </Row>
                                    },
                                ]} />
                                : null
                        }


                        <Divider />
                        <Space direction="vertical" style={{ textAlign: 'end', float: 'right' }}>
                            <span>
                                <b style={{ marginRight: 15 }}>Tổng :</b>
                                {`${bill.tong_gia_tri}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'}</span>
                            <span>
                                <i style={{ marginRight: 15 }}>Thanh toán lúc {moment(bill.ngay_lap).format('DD-MM-YYYY LT')}</i>
                            </span>
                        </Space>

                    </Card> : null
            }

            {/* <Modal title="Ghi nhận thanh toán"
                width={600}
                open={isModalOpen}
                onOk={handleOpen}
                onCancel={handleCancel} footer={null}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 1000,
                        marginTop: 30
                    }}
                    autoComplete="off">
                    <Form.Item
                        label="Số tài khoản">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Chủ tài khoản">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ngân hàng">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tổng">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 18,
                            span: 6,
                        }}>
                        <Button type="primary">
                            Ghi nhận
                        </Button>
                    </Form.Item>
                </Form>
            </Modal> */}
        </>
    );
}

export default BillDetail;