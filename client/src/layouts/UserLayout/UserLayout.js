
import HeaderUser from "~/components/UserComponents/Header";
import FooterUser from "~/components/UserComponents/Footer";
import { Layout } from 'antd';
import '~/assets/style/User/LayoutUser.scss'

function UserLayout({ children }) {

    return (
        <>
            <Layout>
                <HeaderUser />
                    {children}
                <FooterUser />
            </Layout>
        </>
    );
}


export default UserLayout;
