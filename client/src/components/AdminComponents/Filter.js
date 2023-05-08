import { Button, Col, Row, Space, TreeSelect } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
          {
            value: 'leaf2',
            title: 'leaf2',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'leaf3',
            title: (
              <b
                style={{
                  color: '#08c',
                }}
              >
                leaf3
              </b>
            ),
          },
        ],
      },
    ],
  },
];
function Filter({ seg }) {
  const [placement, SetPlacement] = useState('topLeft');
  const placementChange = (e) => {
    SetPlacement(e.target.value);
  };
  return (
    <>
      <Row>
        <Col md={{ span: 4 }}>
          <Space>
            <Link to={`add`}><Button type="primary" className="btn-primary">CREATE</Button></Link>
          </Space>
        </Col>
        <Col md={{ span: 8, push: 10 }}>

          <TreeSelect
            showSearch
            dropdownStyle={{
              maxHeight: 400,
              overflow: 'auto',
              minWidth: 300,
            }}
            placeholder="Bộ lọc"
            dropdownMatchSelectWidth={false}
            placement={placement}
            allowClear
            treeDefaultExpandAll
            treeData={treeData}
          />
          {seg}
        </Col>
      </Row>

    </>
  );
}

export default Filter;