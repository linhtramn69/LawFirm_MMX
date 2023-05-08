import { quoteService } from '~/services';
import '~/assets/style/User/HomePage.scss';
import { banner, service, attribute, avatar } from '~/assets/images/index';
import { Row, Col, Divider, Card, Space, Button, Input, Form, Avatar, notification, Typography, FloatButton, message } from 'antd';
import {
    ForwardOutlined,
    PhoneOutlined,
    MailOutlined,
    PaperClipOutlined,
    SlackOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import moment from 'moment';
const { Text } = Typography;

function HomePage() {
    const lawyer = [
        {
            name: 'Nguyễn Linh Trâm',
            phone: '0797381985',
            mail: 'tramxinhdep.lawyer@gmail.com',
            avt: 'https://th.bing.com/th/id/R.7ecfcf1af8410b2b1fb2c841705bfb2e?rik=wJaOLmLuA4istQ&riu=http%3a%2f%2feqpower.ch%2fwp-content%2fuploads%2f2014%2f03%2flawyer-man-portrait.jpg&ehk=I3mFJWQK963C%2f0pH7wfkxCgyNVdpvwlyS8AEZjxVhlE%3d&risl=&pid=ImgRaw&r=0'
        },
        {
            name: 'Trần Thị Kim Linh',
            phone: '0797381985',
            mail: 'linhlun.lawyer@gmail.com',
            avt: 'https://th.bing.com/th/id/OIP.trcdmbDPzqICtysG-kGn7QHaLH?pid=ImgDet&rs=1'
        },
        {
            name: 'Nguyễn Linh Trâm',
            phone: '0797381985',
            mail: 'tramxinhdep.lawyer@gmail.com',
            avt: 'https://th.bing.com/th/id/R.7ecfcf1af8410b2b1fb2c841705bfb2e?rik=wJaOLmLuA4istQ&riu=http%3a%2f%2feqpower.ch%2fwp-content%2fuploads%2f2014%2f03%2flawyer-man-portrait.jpg&ehk=I3mFJWQK963C%2f0pH7wfkxCgyNVdpvwlyS8AEZjxVhlE%3d&risl=&pid=ImgRaw&r=0'
        },
        {
            name: 'Trần Thị Kim Linh',
            phone: '0797381985',
            mail: 'linhlun.lawyer@gmail.com',
            avt: 'https://th.bing.com/th/id/OIP.trcdmbDPzqICtysG-kGn7QHaLH?pid=ImgDet&rs=1'
        },
        {
            name: 'Nguyễn Linh Trâm',
            phone: '0797381985',
            mail: 'tramxinhdep.lawyer@gmail.com',
            avt: 'https://th.bing.com/th/id/R.7ecfcf1af8410b2b1fb2c841705bfb2e?rik=wJaOLmLuA4istQ&riu=http%3a%2f%2feqpower.ch%2fwp-content%2fuploads%2f2014%2f03%2flawyer-man-portrait.jpg&ehk=I3mFJWQK963C%2f0pH7wfkxCgyNVdpvwlyS8AEZjxVhlE%3d&risl=&pid=ImgRaw&r=0'
        },
        {
            name: 'Trần Thị Kim Linh',
            phone: '0797381985',
            mail: 'linhlun.lawyer@gmail.com',
            avt: 'https://th.bing.com/th/id/OIP.trcdmbDPzqICtysG-kGn7QHaLH?pid=ImgDet&rs=1'
        },
    ]

    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [messageApi, contextHolderMess] = message.useMessage();

    const openNotification = (placement) => {
        api.open({
            duration: false,
            message: <Space size={20}>
                <Avatar size='large' src={avatar.tuvan} />
                <Space direction="vertical" size={1}> <Title level={5}>LawKim kính chào Quý khách </Title>
                    <Text italic>
                        Quý Khách cần thêm thông tin xin hãy điền vào thông tin bên dưới.
                        Chúng tôi sẽ liên hệ với bạn.</Text>
                </Space>

            </Space>,
            description: <Card title="Yêu cầu báo giá">
                <Form
                    form={form}
                    layout="vertical"
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Họ và tên"
                        name="fullname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your fullname!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="sdt"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your number phone!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Vấn đề của bạn"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <TextArea />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>,
            placement,

        })
    };

    const onFinish = async (values) => {
        const data = {
            khach_hang: {
                ho_ten: values.fullname,
                sdt: values.sdt,
                email: values.email
            },
            ngay_gui_phieu: moment().toDate(),
            van_de: values.description,
            status: 0
        }
        try {
            await quoteService.create(data).data;
            messageApi.open({
                type: 'success',
                content: 'Yêu cầu báo giá thành công!',
            });
        }
        catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Yêu cầu báo giá thất bại!',
            });
            console.log(error);
        }
        form.resetFields();
    }

    return (
        <>
            <div className="home-page">
                <section className='banner-top'>
                    <img alt='' src={banner.bannerTop} />
                    <div className='banner-top-text'>
                        <h2>Hãy để chúng tôi làm</h2>
                        <h2>Luật sư riêng của bạn</h2>
                        <Divider style={{ backgroundColor: 'white' }} />
                        <button className='banner-top-btn' >Đăng ký tư vấn <ForwardOutlined /></button>
                    </div >
                </section>
                <section className='banner-second'>
                    <Row>
                        <Col md={{ span: 12 }} xs={{ span: 24 }}>
                            <h1>Về chúng tôi</h1>
                            <p>
                                Công ty Luật Minh Gia thuộc Đoàn Luật sư thành phố Hà Nội, thành lập và hoạt động theo Giấy Chứng nhận đăng ký hoạt động số: 01020716/TP/ĐKHĐ do Sở Tư pháp HN cấp.
                            </p>
                            <p>
                                Với đội ngũ luật sư chuyên nghiệp, giàu kinh nghiệm, phạm vi hoạt động đa dạng bao gồm các phòng ban chuyên môn thuộc nhiều lĩnh vực khác nhau, Luật Minh Gia tư vấn pháp luật, đại diện ngoài tố tụng và tham gia tranh tụng nhằm bảo vệ quyền và lợi ích hợp pháp cho khách hàng tại Tòa án các cấp trong các vụ án Dân sự, Hình sự, Đất Đai, Thừa kế, Hợp đồng, Kinh doanh thương mại, Lao động, Hôn nhân Gia đình, Hành chính…,
                            </p>
                            <p>
                                Cung cấp dịch vụ pháp lý khác như: Soạn thảo các loại văn bản, hợp đồng, dịch vụ luật sư doanh nhiệp, sở hữu trí tuệ, đầu tư nước ngoài, luật sư riêng và tư vấn pháp luật thường xuyên.
                            </p>
                            <Divider style={{ backgroundColor: 'grey' }} />
                            <button className='btn-dark-blue'>Tìm hiểu thêm <ForwardOutlined /></button>
                        </Col>
                        <Col className='box-img' md={{ span: 10, push: 1 }} xs={{ span: 24 }}>
                            <img alt=''
                                src={banner.bannerSecond} />
                        </Col>
                    </Row>
                </section>
                <section className='banner-third'>
                    <img alt='' src={banner.bannerThird} />
                    <div className='banner-third-text'>
                        <Row>
                            <Col className='banner-third-text-top' lg={{ span: 9, push: 1 }} md={{ span: 24 }}>
                                <h1>Dịch vụ luật sư</h1>
                                <Divider style={{ backgroundColor: 'white' }} />
                                <p> Luật Minh Gia cung cấp luật sư trong các lĩnh vực</p>
                            </Col>
                            <Col lg={{ span: 14, push: 4 }} md={{ span: 24 }} className='banner-third-card'>
                                <Row>
                                    {service.map((value, index) => {
                                        return (
                                            <Col key={index} className='banner-third-item' md={{ span: 8 }} xs={{ span: 12 }}>
                                                <Card className='card-hover' hoverable>
                                                    <img alt='' src={value.img} />
                                                    <p className='banner-third-item-text'>{value.title}</p>
                                                </Card>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </section>
                <section className='banner-sixth'>
                    <Row>
                        <Col md={{ span: 9, push: 14 }} xs={{ span: 20, push: 2 }} className='banner-sixth-title'>
                            <h1>Chúng tôi ở đây</h1>
                            <p>
                                Để giải đáp mọi vướng mắc về pháp luật cho bạn
                            </p>
                            <p>
                                Quyền lợi của bạn là ưu tiên hàng đầu của chúng tôi, Hãy gửi yêu cầu nếu bạn cần luật sư giải quyết mọi vấn đề pháp lý của mình.
                            </p>
                            <Divider style={{ backgroundColor: 'grey' }} />
                            <button className='btn-dark-blue' style={{ marginLeft: 260 }}>Gửi yêu cầu <ForwardOutlined /></button>
                        </Col>
                        <Col md={{ span: 12, pull: 8 }}>
                            <Row className='banner-sixth-card'>
                                {attribute.map((attr, index) => {
                                    return (
                                        <Col md={{ span: 10 }} xs={{ span: 20, push: 2 }} key={index} className={attr.classParent}>
                                            <Card className={attr.classChildren}>
                                                <Space direction='vertical' size={10}>
                                                    <img alt='' src={attr.img} />
                                                    <h6>{attr.description}</h6>
                                                    <p>{attr.title}</p>
                                                </Space>

                                            </Card>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Col>

                    </Row>
                </section>
                <section className='banner-fifth'>
                    <img className='banner-fifth-img' alt='' src={banner.bannerFifth} />
                    <Row className='banner-fifth-content'>
                        <Col className='banner-fifth-title' lg={{ span: 8, push: 1 }} xs={{ span: 20, push: 2 }}>
                            <h1>Đội ngũ luật sư chúng tôi</h1>
                            <Divider style={{ backgroundColor: 'white' }} />
                            <p> Tại Minh gia tất cả luật sư đều có chứng chỉ hành nghề và có nhiều năm kinh nghiệm.</p>
                        </Col>
                        <Col lg={{ span: 14, push: 1 }} md={{ span: 20, push: 0 }} xs={{ span: 20, push: 2 }} className='banner-fifth-card'>
                            <Row>
                                {lawyer.map((law, index) => {
                                    return (
                                        <Col className='banner-fifth-item' md={{ span: 7 }} xs={{ span: 18, push: 3 }} key={index} >
                                            <img src={law.avt} alt="Avatar" className="image" />
                                            <div className="overlay">
                                                <div className="text">
                                                    <h4>Ls {law.name}</h4>
                                                    <span> < PhoneOutlined /> {law.phone}</span>
                                                    <p>< MailOutlined /> {law.mail}</p>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Col>
                    </Row>
                </section>
                <section className='banner-fourth'>
                    <h1>Tôn chỉ hoạt động</h1>
                    <Divider ><SlackOutlined /></Divider>
                    <Row>
                        <Col className='banner-fourth-card' md={{ span: 8, push: 3 }} xs={{ span: 9, push: 2 }}>
                            <PaperClipOutlined className='banner-fourth-card-icon' />
                            <p>"Phương châm hoạt động của Luật Minh Gia là Tận tâm vì khách hàng - Tận tụy với công việc.Với đội ngũ luật sư có chuyên môn cao và nhiều kinh nghiêm cùng sự kết hợp,
                                hỗ trợ giữa các luật sư trong nhiều lĩnh vực khác nhau," </p>
                        </Col>
                        <Col className='banner-fourth-card' md={{ span: 8, push: 5 }} xs={{ span: 9, push: 4 }}>
                            <PaperClipOutlined className='banner-fourth-card-icon' />
                            <p>"Chúng tôi luôn nhận thức đầy đủ về trách nhiệm, lương tâm nghề nghiệp của mình
                                và cam kết không ngừng nâng cao chất lượng dịch vụ pháp lý, nhằm tạo ra kết quả tuyệt vời cho khách hàng của chúng tôi."</p>
                        </Col>
                    </Row>
                </section>
                <FloatButton
                    trigger="click"
                    type="primary"
                    style={{
                        left: 50,
                    }}
                    onClick={() => openNotification('bottomLeft')}
                    icon={<QuestionCircleOutlined />}
                >
                </FloatButton>
                {contextHolder}
                <FloatButton.Group
                    trigger="hover"
                    style={{
                        right: 20
                    }}
                    icon={<QuestionCircleOutlined />}
                >

                    <br />
                    <FloatButton.BackTop visibilityHeight={0} />
                </FloatButton.Group>
            </div>
            {contextHolderMess}
        </>
    );
}

export default HomePage;