import User from "./User";
const columnsCustomer = [
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
        title: 'Nghề nghiệp',
        dataIndex: 'job',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
    },
    {
        title: 'Phân loại',
        dataIndex: 'typeOfUser',
    },
];
function CustomerManager() {
    return ( 
        <>
            <User props={0} columns={columnsCustomer}/>
        </>
     );
}

export default CustomerManager;