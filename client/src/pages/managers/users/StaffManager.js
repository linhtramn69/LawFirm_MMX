import User from "./User";

const columnsStaff = [
    {
        title: 'Họ tên',
        dataIndex: 'name',
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'dateOfBirth',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
    },
    {
        title: 'Bộ phận',
        dataIndex: 'boPhan',
    },
    {
        title: 'Chức vụ',
        dataIndex: 'chucVu',
    },
];

function StaffManager() {
    return ( 
        <>
            <User props={2} columns={columnsStaff}/>
        </>
     );
}

export default StaffManager;