import {  Col, Divider, Row, Space } from "antd";
import {
    SlackOutlined
} from '@ant-design/icons';
import { banner } from '~/assets/images/index';
import "~/assets/style/User/ServicePage.scss"
import CardService from "~/components/UserComponents/CardService";
function ServicePage() {
    const service = [
        {
            title: 'thành lập doanh nghiệp',
            img: banner.bannerSecond,
            description: 'Một doanh nghiêp muốn tồn tại và phát triển tốt thì...'
        },
        {
            title: 'thành lập doanh nghiệp',
            img: banner.bannerSecond,
            description: 'Một doanh nghiêp muốn tồn tại và phát triển tốt thì...'
        },
        {
            title: 'thành lập doanh nghiệp',
            img: banner.bannerSecond,
            description: 'Một doanh nghiêp muốn tồn tại và phát triển tốt thì...'
        },
        {
            title: 'thành lập doanh nghiệp',
            img: banner.bannerSecond,
            description: 'Một doanh nghiêp muốn tồn tại và phát triển tốt thì...'
        },
        {
            title: 'thành lập doanh nghiệp',
            img: banner.bannerSecond,
            description: 'Một doanh nghiêp muốn tồn tại và phát triển tốt thì...'
        },
        {
            title: 'thành lập doanh nghiệp',
            img: banner.bannerSecond,
            description: 'Một doanh nghiêp muốn tồn tại và phát triển tốt thì...'
        },
        {
            title: 'thành lập doanh nghiệp',
            img: banner.bannerSecond,
            description: 'Một doanh nghiêp muốn tồn tại và phát triển tốt thì...'
        },
        {
            title: 'thành lập doanh nghiệp',
            img: banner.bannerSecond,
            description: 'Một doanh nghiêp muốn tồn tại và phát triển tốt thì...'
        }
    ]
    return (
        <>
            <div className="service">
                <h3>TƯ VẤN PHÁP LUẬT DOANH NGHIỆP</h3>
                <Space direction="vertical" size={30}>
                    <p>
                        Một doanh nghiêp muốn tồn tại và phát triển tốt thì phải dựa trên các quy phạm pháp luật để tạo dựng
                        nên một cơ sở nền móng vững chắc về nguồn lực trong quá trình thực hiện các hoạt động kinh doanh.
                        Tất các các nguồn lực cốt lõi như nguồn nhân lực, tài chính, cơ sở hạ tầng, máy móc, trang thiết bị,
                        nhà xưởng, công nghệ, sản phẩm trí tuệ, bí quyết kinh doanh …đều được xây dựng có sự ràng buộc pháp lý…
                        Để xây dựng các mối quan hệ chặt chẽ cho các nguồn lực của doanh nghiệp, doanh nghiệp phải dựa trên các
                        quy phạm pháp luật để điều chỉnh các muốn quan hệ pháp luật đó để phục vụ tốt nhất cho quá trình hoạt động kinh doanh.
                        Công ty luật Việt An với kinh nghiệm chuyên sâu và chuyên nghiệp chúng tôi sẽ cung cấp cho
                        doanh nghiệp những giải pháp pháp ly tối ưu nhất, qua đó giúp cho doanh nghiệp có sự ổn
                        định trong kinh doanh, tránh được những rui ro pháp lý có thể xẩy ra trong tương lai
                        cũng như xây dựng phát triển bền vững cho doanh nghiệp trên con đường kinh doanh tại Việt Nam
                        cũng như hội nhập thị trường quốc tế.
                    </p>
                    <Space className="img-service" direction="vertical" size={10}>
                        <img alt="" src={banner.bannerTop} />
                        <span className="img-service-title">Hình 1: Tư vấn pháp luật doanh nghiệp</span>
                    </Space>

                    <p>
                        Một doanh nghiêp muốn tồn tại và phát triển tốt thì phải dựa trên các quy phạm pháp luật để tạo dựng
                        nên một cơ sở nền móng vững chắc về nguồn lực trong quá trình thực hiện các hoạt động kinh doanh.
                        Tất các các nguồn lực cốt lõi như nguồn nhân lực, tài chính, cơ sở hạ tầng, máy móc, trang thiết bị,
                        nhà xưởng, công nghệ, sản phẩm trí tuệ, bí quyết kinh doanh …đều được xây dựng có sự ràng buộc pháp lý…
                        Để xây dựng các mối quan hệ chặt chẽ cho các nguồn lực của doanh nghiệp, doanh nghiệp phải dựa trên các
                        quy phạm pháp luật để điều chỉnh các muốn quan hệ pháp luật đó để phục vụ tốt nhất cho quá trình hoạt động kinh doanh.
                        Công ty luật Việt An với kinh nghiệm chuyên sâu và chuyên nghiệp chúng tôi sẽ cung cấp cho
                        doanh nghiệp những giải pháp pháp ly tối ưu nhất, qua đó giúp cho doanh nghiệp có sự ổn
                        định trong kinh doanh, tránh được những rui ro pháp lý có thể xẩy ra trong tương lai
                        cũng như xây dựng phát triển bền vững cho doanh nghiệp trên con đường kinh doanh tại Việt Nam
                        cũng như hội nhập thị trường quốc tế.
                    </p>
                </Space>
                <div className="list-card-service">
                    <h3>Dịch vụ thành lập doanh nghiệp</h3>
                    <Divider style={{ color: `var(--deep-blue)` }}><SlackOutlined /></Divider>
                    <Row >
                        {service.map((value, index) => {
                            return (
                                <Col lg={{ span: 8 }} xs={{ span: 12 }} key={index} className="col-service-item">
                                    <CardService title={value.title} img={value.img} description={value.description} />
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </div>
        </>
    );
}

export default ServicePage;