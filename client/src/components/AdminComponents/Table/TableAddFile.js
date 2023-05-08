import { Popconfirm, Table } from "antd";
import { useState } from "react";

function TableAddFile() {
    const [pdfFile, setPDFFile] = useState(null);
    const [dataSource, setDataSource] = useState([]);
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
            title: 'Thao tác',
            render: (_, record) =>
                    dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <p>Delete</p>
                        </Popconfirm>
                    ) : null,
        },
    ];
    let currentDate = new Date();
    const fileType = ['application/pdf'];
    const handleChange = (e) => {
        let selectedFile = e.target.files[0];
        setDataSource([...dataSource, {
            lastModified: selectedFile.lastModified,
            name: selectedFile.name,
            size: selectedFile.size,
            type: selectedFile.type,
            lastModifiedDate: currentDate.toString().split('GMT+0700 (Indochina Time)')
        }])

        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader()
                reader.readAsDataURL(selectedFile)
                reader.onload = (e) => {
                    setPDFFile(e.target.result)
                }
            }
            else {
                setPDFFile(null)
            }
        }
        else {
            console.log("please");
        }
    }

    return (
        <>
            <input type="file" onChange={handleChange} />
            <Table dataSource={dataSource} columns={columns} />
        </>
    );
}

export default TableAddFile;