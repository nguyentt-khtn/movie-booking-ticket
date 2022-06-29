import { GROUP_ID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyRapService extends baseService{

    constructor(){
        super()
    }

    getCinema = () => {
        return this.get(`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`)
    }
    
    getFilmDetail = (idFilm) => {
        return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idFilm}`)
    }
    
    getSystemCinema = () => {
        return this.get(`api/QuanLyRap/LayThongTinHeThongRap`)
    }
    
    getInfoCinemaBySystem = (idCinema) => {
        return this.get(`api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${idCinema}`)
    }
}

export const quanLyRapService = new QuanLyRapService()