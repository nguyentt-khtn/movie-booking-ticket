import React, { useEffect } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import { ProgressCircle } from 'react-simple-circle-rating';
import '@tsamantanis/react-glassmorphism/dist/index.css'
import { useDispatch, useSelector } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';
import { getFilmDetailAction } from '../../redux/actions/FilmAction';
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom';

const { TabPane } = Tabs;


export default function FilmDetail(props) {
    const { filmDetail } = useSelector(state => state.FilmReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        let idFilm = props.match.params.id
        dispatch(getFilmDetailAction(idFilm))
    }, [])
    return (
        <div style={{ minHeight: '100vh', backgroundImage: `url(${filmDetail?.hinhAnh})`, backgroundSize: '100%', backgroundPosition: 'fixed' }}>
            <CustomCard
                style={{ minHeight: '100vh' }}
                effectColor="#C780FF" // required
                color="#14AEFF" // default color is white
                blur={10} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <div className='grid grid-cols-12'>
                    <div className='col-start-4 col-span-5'>
                        <div className='grid grid-cols-3' style={{ marginTop: '8%' }}>
                            <img className='col-span-1 w-full' src={filmDetail?.hinhAnh} alt='123' />
                            <div className='col-span-2 text-white ml-4' style={{ marginTop: '8%' }}>
                                <p>Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                <p className='text-2xl font-bold'>{filmDetail?.tenPhim}</p>
                                <p>{filmDetail?.moTa}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3 mx-auto' style={{ marginTop: '30%' }}>
                        <ProgressCircle percentage={filmDetail?.danhGia * 10} size={90} />
                        <h1 className='text-center mt-2 text-2xl text-white'>Đánh giá</h1>
                        <StarRatingComponent
                            className='text-3xl'
                            name="rate"
                            starCount={10}
                            value={filmDetail?.danhGia}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-12 '>
                    <div className='col-start-4 col-span-5 bg-gray-200 px-5 h-full'>
                        <Tabs tabPosition='top'>
                            <TabPane tab="Lịch chiếu" key="1" >
                                <div className='grid grid-cols-12'>
                                    <div className='col-span-12'>
                                        <Tabs tabPosition={'left'}>
                                            {filmDetail.heThongRapChieu?.map((item, index) => {
                                                return <TabPane tab={<img className='w-20 md:w-9' src={item.logo} alt={item.maHeThongRap} />} key={index}>
                                                    {item.cumRapChieu?.map((cumRap, index) => {
                                                        return <div key={index} >
                                                            <div className='mb-3 mt-1 mx-2 md:mt-0 flex w-full'>
                                                                <img className='w-20 md:w-12 md:h-12' src={cumRap.hinhAnh} alt={cumRap.tenCumRap} />
                                                                <div className='ml-2 mt-2 md:mt-0 font-bold w-80'>
                                                                    {cumRap.tenCumRap}
                                                                    <div className='font-thin w-80'>
                                                                        {cumRap.diaChi}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='grid grid-cols-4 mb-3 ml-2'>
                                                                {cumRap.lichChieuPhim?.slice(0,8).map((lich, index) => {
                                                                    return <NavLink to={`/checkout/${lich.maLichChieu}`} className='col-span-1' key={index}>
                                                                        {moment(lich.ngayChieuGioChieu).format('hh:mm A DD.MM.YYYY')}
                                                                    </NavLink>
                                                                })}
                                                            </div>
                                                        </div>
                                                    })}
                                                </TabPane>
                                            })}
                                        </Tabs>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="Thông tin" key="2">
                                Thông tin
                            </TabPane>
                            <TabPane tab="Đánh giá" key="3">
                                Đánh giá
                            </TabPane>
                        </Tabs>
                    </div>


                </div>
            </CustomCard>

        </div>
    )
}