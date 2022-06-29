import { baseService } from "./baseService";


export class QuanLyDatVeService extends baseService{
    constructor(){
        super()
    }

    getTicketRoom = (id) => {
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`)
    }

    bookingTicket = (data) => {
        return this.post(`api/QuanLyDatVe/DatVe`, data)
    }

    createShowtime = (showtime) => {
        return this.post(`/api/QuanLyDatVe/TaoLichChieu`, showtime)
    }
}

export const quanLyDatVeService = new QuanLyDatVeService()