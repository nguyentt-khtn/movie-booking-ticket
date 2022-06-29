import { BOOKING_SEAT, BOOKING_TICKET_DONE, GET_TICKET_ROOM, HISTORY_BOOKING, SWITCH_TAB } from "../constants/BookingTicketConstant"

const initialState = {
    arrDetailRoom: {},
    listSeatCheck: [],
    historyBooking:{},
    switchTab:'1'
}

export const BookingTicketReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_TICKET_ROOM: {
            state.arrDetailRoom = action.arrDetailRoom
            return { ...state }
        }

        case BOOKING_SEAT: {
            let tempListSeat = [...state.listSeatCheck]
            let { seatBooked } = action
            let index = tempListSeat.findIndex(item => item.maGhe === seatBooked.maGhe)
            if (index !== -1) {
                tempListSeat.splice(index, 1)
            } else {
                tempListSeat.push(seatBooked)
            }
            return { ...state, listSeatCheck: tempListSeat }
        }

        case BOOKING_TICKET_DONE:{
            state.listSeatCheck = []
            return {...state}
        }

        case HISTORY_BOOKING:{
            state.historyBooking = action.historyBooking
            return {...state}   
        }
        case SWITCH_TAB:{
            state.switchTab = action.tabId
            return {...state}
        }
        default:
            return { ...state }
    }
}
