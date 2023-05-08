import {
    PhoneOutlined,
    MailOutlined,
    UserOutlined,
    ContactsOutlined,
    InstagramFilled,
    FacebookFilled,
    EnvironmentOutlined,
    PrinterOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const styleIcon = {
    fontSize: '16px'
};

const itemsHeadTop = [
    {
        label: '(316) 268-0200',
        key: 'phone',
        icon: <PhoneOutlined />,
    },
    {
        label: 'Estimating@Law-Co.Com',
        key: 'mail',
        icon: <MailOutlined />
    },
    {
        label: 'Liên hệ',
        key: 'contact',
        icon: <ContactsOutlined style={styleIcon} />
    },
    {
        label: <Link to='/login'><UserOutlined style={styleIcon} /></Link>,
        key: 'user',
    },
];

const itemsHeadBot = [
    {
        label: <Link to="/">Trang chủ</Link>,
        key: 'home',
    },
    {
        label: <Link to="/service">Dịch vụ</Link>,
        key: 'service'
    },
    {
        label: 'Luật sư tư vấn',
        key: 'advisory lawyer',
        children: [
            {
                type: 'group',
                children: [
                    {
                        label: 'Dân sự',
                        key: 'people',
                    },
                    {
                        label: 'Đất đai',
                        key: 'land',
                    },
                    {
                        label: 'Hợp đồng',
                        key: 'contract',
                    },
                    {
                        label: 'Doanh nghiệp',
                        key: 'business',
                    },
                    {
                        label: 'Lao động',
                        key: 'work',
                    },
                    {
                        label: 'Hôn nhân',
                        key: 'love',
                    },
                    {
                        label: 'Luật sư đại diện',
                        key: 'representative lawyer',
                    },
                ],
            }
        ]
    },
    // {
    //     label: 'Đăng ký kinh doanh',
    //     key: 'business registration',
    //     children: [
    //         {
    //             type: 'group',
    //             children: [
    //                 {
    //                     label: 'An toàn thực phẩm',
    //                     key: 'food safety',
    //                 },
    //                 {
    //                     label: 'Công ty, doanh nghiệp',
    //                     key: 'business license',
    //                 },
    //                 {
    //                     label: 'Thay đổi giấy phép kinh doanh',
    //                     key: 'change of business license',
    //                 },
    //             ],
    //         }
    //     ]
    // },
    {
        label: 'Đội ngũ chúng tôi',
        key: 'team',
    },
    {
        label: 'Liên hệ',
        key: 'contact',
    },
];


const itemsFootTop = [
    {
        title: 'Office: (316) 268-0200',
        icon: <PhoneOutlined />,
    },
    {
        title: '3/2 Đại học Cần Thơ, Ninh Kiều, Cần Thơ',
        icon: <EnvironmentOutlined />,
    },
    {
        title: 'Fax: (316) 268-0210',
        icon: <PrinterOutlined />
    },
    {
        title: 'Estimating@Law-Co.Com',
        icon: <MailOutlined />,
    },
];

const itemsFootBot = [
    {
        label: '©THE LAW COMPANY 2023'
    },
    {
        label: 'Khảo sát khách hàng'
    },
    {
        label: 'Chính sách hỗ trợ',
    },
    {
        label: 'Bản đồ',
    },
    {
        icon: <FacebookFilled style={styleIcon} />,
    },
    {
        icon: <InstagramFilled style={styleIcon} />
    },

];

export { itemsHeadTop, itemsHeadBot, itemsFootTop, itemsFootBot };