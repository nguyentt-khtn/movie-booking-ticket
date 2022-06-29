import React, { Fragment, useEffect } from 'react'
import { Table, Space, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EditTwoTone, DeleteFilled, CalendarOutlined } from '@ant-design/icons'
import { deleteFilmAction, getFilmAction } from '../../../redux/actions/FilmAction';
import { NavLink } from 'react-router-dom';

const { Search } = Input;

export default function Films(props) {
    const { arrFilm } = useSelector(state => state.FilmReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFilmAction())
    }, [])
    const onSearch = value => {
        dispatch(getFilmAction(value))
    };
    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',
            key: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirection: ['descend', 'ascend'],
            width: '10%'
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            width: '15%',
            key: 'tenPhim',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            key: 'hinhAnh',
            render: (text, film, index) => {
                return <Fragment key={index}>
                    <img width={50} src={film.hinhAnh} alt={film.biDanh} />
                </Fragment>
            },
            width: '10%'
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            render: (text, film, index) => {
                return <Fragment key={index}>
                    {film.moTa.length > 50 ? <span>{film.moTa.substr(0, 50)} ...</span> : film.moTa}
                </Fragment>
            },
            key: 'moTa',
            width: '30%'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, film, index) => (
                <Space size="middle" key={index}>
                    <NavLink to={`/admin/films/editfilm/${film.maPhim}`}><EditTwoTone className='scale-150' /></NavLink>
                    <span style={{cursor:'pointer'}} onClick={() => {
                        if(window.confirm(`Ban co chac chan xoa phim ${film.tenPhim} khong?`)){
                            dispatch(deleteFilmAction(film.maPhim))
                        }
                    }}><DeleteFilled className='scale-150' style={{ color: 'red' }} /></span>
                    <NavLink to={`/admin/films/showtime/${film.maPhim}`}><CalendarOutlined className='scale-150' /></NavLink>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <h1>Quản lý phim</h1>
            <Search placeholder="input search text" onSearch={onSearch} enterButton className='mb-5 mt-2' />
            <Table columns={columns} dataSource={arrFilm} rowKey={'maPhim'} />
        </div>
    )
}
