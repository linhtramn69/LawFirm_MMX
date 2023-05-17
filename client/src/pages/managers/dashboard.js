import { faBusinessTime, faChartPie, faCoins, faHeadset, faLaptopFile, faPhoneVolume, faUser, faUsers, faUsersGear, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, List } from "antd";
import { Link } from "react-router-dom";
import "~/assets/style/Admin/Dashboard.scss"
const data = [
    {
        icon: faUsers,
        title: "Khách hàng",
        color: `linear-gradient(to bottom, #0000cc 0%, #000066 100%)`,
        link: "customer"
    },
    {
        icon: faLaptopFile,
        title: "Vụ việc",
        color: `linear-gradient(to top, #800000 0%, #cc0000 100%)`,
        link: "matter"
    },
    {
        icon: faCoins,
        title: "Kế toán",
        color: `linear-gradient(to bottom, #339933 0%, #006600 100%)`,
        link: "fee"
    },
    {
        icon: faHeadset,
        title: "Báo giá",
        color: `linear-gradient(to bottom, #ff9900 0%, #cc6600 100%)`,
        link: 'quote'
    },
    {
        icon: faUsersGear,
        title: "Nhân viên",
        color: `linear-gradient(to top, #990033 0%, #cc0066 100%)`,
        link: "staff"
    },
    {
        icon: faBusinessTime,
        title: "Lịch hẹn",
        color: `linear-gradient(to top, #003366 0%, #006699 100%)`,
        link: "calendar"
    },
    {
        icon: faUser,
        title: "Chi phí",
        color: `linear-gradient(to bottom, #993399 0%, #660066 100%)`,
        link: "fee"
    },
    {
        icon: faChartPie,
        title: "Thống kê",
        color: `linear-gradient(to bottom, #009999 0%, #006666 100%)`,
        link: "thong-ke"
    }

];
function Dashboard() {
    return (
        <>
            <div className="dashboard">
                <List
                    style={{ width: '70%' }}
                    grid={{
                        xs: 2,
                        sm: 3,
                        md: 3,
                        lg: 4,
                        xl: 4
                    }}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item
                            style={{ textAlign: 'center' }}>
                            <Link to={`${item.link}`}>
                                <button style={{ background: item.color }} className="item-dashboard">
                                    <FontAwesomeIcon icon={item.icon} />
                                </button>
                                <h4 style={{ fontSize: 22 }}>{item.title}</h4>
                            </Link>
                            <br/>
                        </List.Item>
                    )}
                />
            </div>

        </>
    );
}

export default Dashboard;