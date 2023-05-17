import { Avatar, Button, Card, Divider, List, Skeleton } from 'antd';
import Title from 'antd/es/typography/Title';
import moment from 'moment';
import { useEffect, useState } from 'react';
const count = 3;
const ListHistory = ({props}) => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(props);
  const [list, setList] = useState(props);
  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        })),
      ),
    );
    const newData = data.concat(props);
        setData(newData);
        setList(newData);
        setLoading(false);
        window.dispatchEvent(new Event('resize'));
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;
  return (
    <>
    <Divider><Title level={4}>Lịch sử chỉnh sửa</Title></Divider>
    <div style={{textAlign:'center'}}>
       <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
        >
            <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              title={"Vào lúc " +moment(item.thoi_gian).format('DD-MM-YYYY LTS') }
              description={"Người dùng " + item.nguoi_thuc_hien.ho_ten + " thực hiện chỉnh sửa"}
            />
          </Skeleton>
        </List.Item>
      )}
    />
    </div>
    
    </>

   
  );
};
export default ListHistory;