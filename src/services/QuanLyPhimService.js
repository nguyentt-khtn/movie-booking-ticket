import { GROUP_ID } from "../util/settings/config";
import { baseService } from "./baseService";


export class QuanLyPhimService extends baseService {

    constructor() {
        super()
    }

    getBanner = () => {
        return this.get('api/QuanLyPhim/LayDanhSachBanner')
    }

    getFilm = (tenPhim = '') => {
        if (tenPhim.trim() !== '') {
            return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}&tenPhim=${tenPhim}`)
        }
        return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`)
    }

    addNewFilm = (formData) => {
        return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData)
    }

    getInfoFilm = (maPhim) => {
        return this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }

    updateFilm = (formData) => {
        return this.post(`api/QuanLyPhim/CapNhatPhimUpload`, formData)
    }

    deleteFilm = (maPhim) => {
        return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    }
}

export const quanLyPhimService = new QuanLyPhimService()