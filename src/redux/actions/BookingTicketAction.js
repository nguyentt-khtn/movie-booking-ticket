import { quanLyDatVeService } from "../../services/QuanLyDatVeService"
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { BOOKING_SEAT, BOOKING_TICKET_DONE, GET_TICKET_ROOM, HISTORY_BOOKING, SWITCH_TAB } from "../constants/BookingTicketConstant"
import { offLoadingAction, onLoadingAction } from "./LoadingAction"


export const getTicketRoomAction = (id) => {
    return async dispacth => {
        try {
            const result = await quanLyDatVeService.getTicketRoom(id)
            if (result.data.statusCode === 200) {
                dispacth({
                    type: GET_TICKET_ROOM,
                    arrDetailRoom: result.data.content
                })
            }
        } catch (error) {
            alert('lay thong tin phong ve khong thanh cong')
        }
    }
}

export const bookingSeatAction = (seatBooked) => {
    return {
        type: BOOKING_SEAT,
        seatBooked: seatBooked
    }
}

export const bookingTicketAction = (data) => {
    return async dispatch => {
        
        try {
            dispatch(onLoadingAction())
            const result = await quanLyDatVeService.bookingTicket(data)
            await dispatch(getTicketRoomAction(data.maLichChieu))
            await dispatch({type:BOOKING_TICKET_DONE})
            await dispatch(offLoadingAction())
            dispatch(switchTabAction('2'))
            
        } catch (error) {
            dispatch(offLoadingAction())
            alert('danh ve khong thanh cong')
        }
    }
}

export const getHistoryBookingAction = () => {
    return async dispacth => {
        try {
            const result = await quanLyNguoiDungService.getHistoryBooking()
            if (result.data.statusCode === 200) {
                dispacth({
                    type: HISTORY_BOOKING,
                    historyBooking: result.data.content
                })
            }
        } catch (error) {
            alert('lay thong tin dat ve khong thanh cong')
        }
    }
}

export const createShowtimeAction = (showtime) => {
    return async dispacth => {
        try {
            const result = await quanLyDatVeService.createShowtime(showtime)
            if (result.data.statusCode === 200) {
                alert('tao lich chieu thanh cong')
            }
        } catch (error) {
            alert('tao lich chieu khong thanh cong')
        }
    }
}

export const switchTabAction = (tabId) =>{
    return{
        type:SWITCH_TAB,
        tabId
    }
}