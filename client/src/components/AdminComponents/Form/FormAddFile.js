import { Button, Popconfirm, Table } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { actions, useStore } from "~/store";

function FormAddFile({ props }) {
    const [state, dispatch] = useStore();
    const [dataSource, setDataSource] = useState(state.files ? state.files : []);
    useEffect(() => {
        dispatch(actions.setFiles(dataSource))
    }, [dataSource])
    const handleChange = (e) => {
        let selected = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(selected);
        reader.onload = (e) => {
            setDataSource([...dataSource, {
                key: dataSource.length,
                lastModified: selected.lastModified,
                lastModifiedDate: moment(selected.lastModifiedDate).format('DD-MM-YYYY LTS'),
                name: selected.name,
                size: selected.size,
                type: selected.type,
                file: e.target.result
            }])
        }
    }
    const onButtonClick = (file, name) => {
        let a = document.createElement("a");
        a.href = `${file}`;
        a.download = `${name}`;
        document.body.appendChild(a);
        a.click();
        a.parentNode.removeChild(a);

    }
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const columns = [
        {
            title: 'Số',
            dataIndex: 'lastModified',
            key: 'lastModified',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Loại file',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Kích thước',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'lastModifiedDate',
            key: 'lastModifiedDate',
        },
        {
            title: 'Tải xuống',
            dataIndex: 'download',
            render: (_, record) => (
                <a onClick={() => onButtonClick(record.file, record.name)}>
                    Dowload File
                </a>
            )
        },
        !props ? {
            title: 'Thao tac',
            dataIndex: 'actions',
            render: (_, record) => (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                    <Button>Delete</Button>
                </Popconfirm>
            )
        } : <></>
    ];
    return (
        <>
            {!props ?
                <input type="file" onChange={handleChange} />
                : <></>
            }
            <Table columns={columns} dataSource={dataSource} />
        </>
    );
}

export default FormAddFile;