import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTicketRoomAction, bookingSeatAction, bookingTicketAction, getHistoryBookingAction, switchTabAction } from '../../redux/actions/BookingTicketAction'
import styleCheckout from './Checkout.module.css'
import moment from 'moment'
import _ from 'lodash'
import './Checkout.css'
import { TOKEN, USER_LOGIN } from '../../util/settings/config'
import { Tabs } from 'antd';
import { HomeTwoTone } from '@ant-design/icons'
import { history } from '../../App'

function Checkout(props) {
    const { userLogin } = useSelector(state => state.UserReducer)
    const { arrDetailRoom, listSeatCheck } = useSelector(state => state.BookingTicketReducer)
    let { thongTinPhim, danhSachGhe } = arrDetailRoom
    let thisUser = JSON.parse(localStorage.getItem(USER_LOGIN))
    const dispatch = useDispatch()
    useEffect(() => {
        let { id } = props.match.params
        dispatch(getTicketRoomAction(id))
    }, [])
    useEffect(() => {
        return () => {
            dispatch(switchTabAction("1"))
        }
    }, [])
    const renderSeat = () => {
        return danhSachGhe?.map((seat, index) => {
            let classSeatVip = seat.loaiGhe === 'Thuong' ? '' : 'seatVip'
            let classBooked = seat.daDat ? 'seatBooked' : ''
            let seatId = listSeatCheck?.findIndex(item => item.maGhe === seat.maGhe)
            let classBooking = (seatId !== -1) ? 'seatBooking' : ''
            let classUserBooked = thisUser.taiKhoan === seat.taiKhoanNguoiDat ? 'seatUserBooked' : ''
            return <span key={index}>
                < button className={`seat ${classSeatVip} ${classBooked} ${classBooking} ${classUserBooked}`} disabled={seat.daDat} onClick={() => {
                    dispatch(bookingSeatAction(seat))
                }} > {seat.daDat && classUserBooked === '' ? 'X' : seat.stt}</button >
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </span>
        })
    }
    return (
        <div>
            <div className='grid grid-cols-12'>
                <div className='col-span-9'>
                    <div className='flex flex-col items-center mt-5'>
                        <div className='bg-black h-3 w-4/5 mb-2'></div>
                        <div className={`${styleCheckout['trapezoid']} text-center`}><span className='text-black'>Màn hình</span></div>
                        <div>{renderSeat()}</div>
                    </div>
                </div>
                <div className='col-span-2'>
                    <h3 className='text-center text-4xl text-green-600'>{listSeatCheck?.reduce((total, seat, index) => {
                        return total += seat.giaVe
                    }, 0).toLocaleString()}đ</h3>
                    <hr />
                    <div className='mt-2'>
                        <h3>{thongTinPhim?.tenPhim}</h3>
                        <div>{thongTinPhim?.diaChi}</div>
                        <p>Ngày chiếu: {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}</p>
                    </div>
                    <hr />
                    <div className='mt-2 grid grid-cols-6'>
                        <p className='text-orange-600 col-span-1'>Ghế</p>
                        <p className='col-span-5 w-full break-all'>
                            {_.sortBy(listSeatCheck, ['stt'])?.map((seat, index) => {
                                return <span key={index} className='text-green-500 mr-1 text-xl'>{seat.stt}</span>
                            })}
                        </p>
                    </div>
                    <hr />
                    <div className='leading-3 mt-2'>
                        <p>Email</p>
                        <p>{userLogin?.email}</p>
                    </div>
                    <hr />
                    <div className='leading-3 mt-2'>
                        <p>Phone</p>
                        <p>{userLogin?.soDT}</p>
                    </div>
                    <hr />
                    <div>
                        <button className='seatBooked seat scale-75 translate-y-2'></button><span className='text-2xl'>Ghế đã đặt</span><br />
                        <button className='seatBooking seat scale-75 translate-y-2'></button><span className='text-2xl'>Ghế bạn đang đặt</span><br />
                        <button className='seat seatVip bg-gray-400 scale-75 translate-y-2'></button><span className='text-2xl'>Ghế Vip</span><br />
                        <button className='seat seatBooked seatUserBooked scale-75 translate-y-2'></button><span className='text-2xl'>Ghế bạn đã đặt</span>
                    </div>
                    <div className='h-full flex items-start mt-4'>
                        <div className='bg-orange-400 w-full py-2 text-2xl text-center rounded' style={{ cursor: 'pointer' }} onClick={() => {
                            let maLichChieu = ''
                            let danhSachVe = []
                            maLichChieu = thongTinPhim?.maLichChieu
                            danhSachVe = listSeatCheck
                            let data = {
                                maLichChieu: maLichChieu,
                                danhSachVe: danhSachVe
                            }
                            dispatch(bookingTicketAction(data))
                        }}>ĐẶT VÉ</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const { TabPane } = Tabs;

export default function (props) {
    const { switchTab } = useSelector(state => state.BookingTicketReducer)
    const { userLogin } = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()
    const extraTab = () => {
        if (_.isEmpty(userLogin)) {
            return ''
        }
        return <span className='flex flex-row'>
            <div className='flex flex-row  border-pink-400' style={{ cursor: 'pointer' }}>
                <div className='border p-1 rounded-xl flex flex-row mr-2' onClick={() => { history.push('/profile') }}>
                    <div className='w-5 h-5 rounded-xl bg-gray-300 mr-2 text-black text-center'>{userLogin?.taiKhoan.slice(0, 1)}</div>
                    <div>{userLogin?.taiKhoan}</div>
                </div>
                <button className='mr-5 text-red-500' onClick={()=>{
                    localStorage.removeItem(USER_LOGIN)
                    localStorage.removeItem(TOKEN)
                    history.push('/home')
                    window.location.reload()
                }}>
                    Đăng xuất</button>
            </div>

        </span>
    }
    const callback = (key) => {
        dispatch(switchTabAction(key))
    }
    return <div className='ml-10'>
        <Tabs tabBarExtraContent={extraTab()} activeKey={switchTab} defaultActiveKey={"1"} onChange={callback}>
            <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
                <Checkout {...props} />
            </TabPane>
            <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
                <ResultBooking {...props} />
            </TabPane>
            <TabPane tab={<HomeTwoTone style={{ transform: 'scale(2)', marginLeft: '12px', marginBottom: '5px' }} onClick={() => { history.push('/home') }} />} key="3">
            </TabPane>
        </Tabs>

    </div>
}

function ResultBooking(props) {
    const dispatch = useDispatch()
    const { historyBooking } = useSelector(state => state.BookingTicketReducer)
    useEffect(() => {
        dispatch(getHistoryBookingAction())
    }, [])
    const { thongTinDatVe } = historyBooking
    return <div>
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Lịch sử đặt vé của bạn</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Cám ơn bạn đã lựa chọn hệ thống của chúng tôi!</p>
                </div>
                <div className="flex flex-wrap -m-2">
                    {thongTinDatVe?.map((thongTin, index) => {
                        let firstItem = _.first(thongTin.danhSachGhe)
                        return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                                <img alt={thongTin.tenPhim} className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={thongTin.hinhAnh} />
                                <div className="flex-grow">
                                    <h2 className="text-gray-900 title-font font-medium">{thongTin.tenPhim}</h2>
                                    <p className="text-gray-500">{moment(thongTin.ngayDat).format('hh:mm DD:MM:YYYY')}</p>
                                    <p className="text-gray-500">Địa điểm: {firstItem.tenHeThongRap}</p>
                                    <p className="text-gray-500">Tên rạp: {firstItem.tenRap}- Ghế: {firstItem.tenGhe}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </section>

    </div>
}
