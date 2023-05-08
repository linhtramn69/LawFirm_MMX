import { Layout, Row, Col } from "antd";
import Footer from "~/components/UserComponents/Footer";
import Header from "~/components/UserComponents/Header";
import Sidebar from "~/components/UserComponents/Sidebar";

function UserLayoutSidebar({children}) {
    return (  
        <>
            <Layout>
                <Header />
                <Row className="content">
                    <Col md={{span: 16, push: 1}} xs={{span: 22, push: 1}}>
                        {children}
                    </Col>
                    <Col md={{span: 5, push: 1}} xs={{span: 22}} className="sidebar">
                        <Sidebar/>
                    </Col>
                </Row>
                <Footer/>
            </Layout>
        </>
    );
}

export default UserLayoutSidebar;