import { CloseCircleOutlined } from '@ant-design/icons';
import { Result, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useToken } from '~/store';
const { Paragraph, Text } = Typography;
const url = ['', 'admin', 'staff']

const ErrorResult = () => {
  const { token } = useToken()
  return (

    <Result
      status="error"
      title="Submission Failed"
      subTitle="Please check and modify the following information before resubmitting."
      extra={
        <Link to={`/${url[token.account.quyen]}`}>
          Quay lại trang chủ
        </Link>
      }
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            The content you submitted has the following error:
          </Text>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account has been
          frozen. <a>Thaw immediately &gt;</a>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account is not yet
          eligible to ErrorResultly. <a>ErrorResultly Unlock &gt;</a>
        </Paragraph>
      </div>
    </Result>
  );
}
export default ErrorResult;