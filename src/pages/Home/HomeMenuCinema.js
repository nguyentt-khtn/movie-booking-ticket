import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCinemaAction } from '../../redux/actions/CinemaAction';
import './HomeMenuCinema.css'
import moment from 'moment';
import { NavLink } from 'react-router-dom';

const { TabPane } = Tabs;

export default function HomeMenuCinema() {

    const [state, setState] = useState({
        tabPosition: 'left'
    })
    const { arrCinema } = useSelector(state => state.CinemaReducer)
    const dispatch = useDispatch()
    const renderCinema = () => {
        return arrCinema.map((cinema, index) => {
            return <TabPane tab={<img src={cinema.logo} className='w-16' alt={cinema.biDanh} />} key={index} >
                <Tabs tabPosition={state.tabPosition}>
                    {cinema.lstCumRap?.map((cinemaDetail, index) => {
                        return <TabPane tab={
                            <div className='w-full h-full rounded text-xs flex'>
                                <img className='w-20 h-16 mr-2' src={cinemaDetail.hinhAnh} alt={cinemaDetail.tenCumRap} />
                                <div
                                    className='w-40 text-left mt-2'>{cinemaDetail.tenCumRap}
                                    <div className='text-red-400 mt-4'>Chi tiết</div>
                                </div>
                            </div>
                        } key={index}>
                            {cinemaDetail.danhSachPhim?.slice(0, 5).map((film, index) => {
                                return <div className='flex mb-3' key={index}>
                                    <div className='w-48 h-20 mt-1 rounded text-xs flex ml-5'>
                                        <img className='w-20 h-16 mr-2' src={film.hinhAnh} alt={film.tenPhim} onError={(e) => (e.target.onerror = null, e.target.src = 'https://motphimle.co/wp-content/uploads/2021/12/Phim-Morbius-Marvel-Ma-Ca-Rong-Morbius-2022-poster.jpg')} />
                                        <div className='w-28 text-left font-bold'>
                                            <div>{film.tenPhim}</div>
                                            <div className='text-black font-normal'>
                                                {cinemaDetail.diaChi}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-6 gap-2 ml-3 text-green-600'>
                                        {film.lstLichChieuTheoPhim?.slice(0,8).map((timePlay, index) => {
                                            return <NavLink to={`/checkout/${timePlay.maLichChieu}`} key={index}>
                                                {moment(timePlay.ngayChieuGioChieu).format('hh:mm A')}
                                            </NavLink>
                                        })}
                                    </div>
                                </div>
                            })}
                        </TabPane>
                    })}
                </Tabs>
            </TabPane>
        })
    }
    useEffect(() => {
        dispatch(getCinemaAction())
    }, [])
    return (
        <div className='container ml-36 mt-5 lg:mx-auto'>
            <Tabs tabPosition={state.tabPosition}>
                {renderCinema()}
            </Tabs>
        </div>
    )
}
