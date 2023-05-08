import { Table } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TableComponent({ data, columns }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  let navigate = useNavigate();
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            navigate(`${record._id}`)
          }, // click row
        }
      }}
    />
  )
    ;
};
export default TableComponent;