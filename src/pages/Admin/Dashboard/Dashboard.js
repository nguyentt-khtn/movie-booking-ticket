import React, { useEffect } from 'react'
import { Table, Space, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EditTwoTone, DeleteFilled } from '@ant-design/icons'
import { NavLink } from 'react-router-dom';
import { deleteUserAction, getListUserAction } from '../../../redux/actions/UserAction';

const { Search } = Input;

export default function Dashboard(props) {
    const { listUser } = useSelector(state => state.UserReducer)
    const arrUser = []
    let i = 1;
    for(let key in listUser){
        let temp = {...listUser[key],stt:i}
        i++
        arrUser.push(temp)
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getListUserAction())
    }, [])
    const onSearch = value => {
        dispatch(getListUserAction(value))
    };
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            sorter: (a, b) => a.stt - b.stt,
            sortDirection: ['descend', 'ascend'],
            width: '5%'
        },
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            width: '15%',
            key: 'taiKhoan',
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'matKhau',
            width: '15%',
            key: 'matKhau',
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            width: '15%',
            key: 'hoTen',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '15%',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
            width: '15%',
            key: 'soDt',
        },
        {
            title: 'Thao tác',
            key: 'action',
            width:'20%',
            render: (text, user, index) => (
                <Space size="middle" key={index}>
                    <NavLink to={`/admin/dashboard/editUser/${user.taiKhoan}`}><EditTwoTone className='scale-150' /></NavLink>
                    <span style={{cursor:'pointer'}} onClick={() => {
                        if(window.confirm(`Bạn có chắc chắn xóa tài khoản ${user.taiKhoan} không?`)){
                            dispatch(deleteUserAction(user.taiKhoan))
                        }
                    }}><DeleteFilled className='scale-150' style={{ color: 'red' }} /></span>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <NavLink to='/admin/dashboard/adduser' className='text-3xl'>Thêm người dùng</NavLink>
            <Search placeholder="Nhập tài khoản hoặc họ tên người dùng" onSearch={onSearch} enterButton className='mb-5 mt-2' />
            <Table columns={columns} dataSource={arrUser} rowKey={'taiKhoan'} />
        </div>
    )
}
