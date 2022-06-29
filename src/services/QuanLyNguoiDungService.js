import { extend } from "lodash";
import { GROUP_ID } from "../util/settings/config";
import { baseService } from "./baseService";


export class QuanLyNguoiDungService extends baseService {

    constructor() {
        super()
    }

    loginUser = (user) => {
        return this.post(`api/QuanLyNguoiDung/DangNhap`, user)
    }

    getHistoryBooking = () => {
        return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }

    createAccount = (account) => {
        return this.post(`api/QuanLyNguoiDung/DangKy`, account)
    }

    infoAccount = () => {
        return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }

    updateAccount = (account) => {
        return this.put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, account)
    }

    getListUser = (userFind = '') => {
        if (userFind.trim() !== '') {
            return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${userFind}`)
        }
        return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`)
    }

    getListTypeUser = () => {
        return this.get(`api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
    }

    addNewUser = (user) => {
        return this.post(`api/QuanLyNguoiDung/ThemNguoiDung`, user)
    }

    updateUser = (user) => {
        return this.post(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, user)
    }

    deleteUser = (taiKhoan) => {
        return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService()