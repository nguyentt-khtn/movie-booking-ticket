import { quanLyRapService } from "../../services/QuanLyRapService"
import { GET_ALL_CINEMA, GET_CINEMA_SYSTEM, GET_INFO_CINEMA_BY_SYSTEM } from "../constants/CinemaConstant"

export const getCinemaAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.getCinema()
            dispatch({
                type:GET_ALL_CINEMA,
                arrCinema: result.data.content
            })
        } catch (error) {
            alert('lay thong tin rap chieu khong thanh cong')
        }
    }
}

export const getSystemCinemaAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.getSystemCinema()
            dispatch({
                type:GET_CINEMA_SYSTEM,
                cinemaSystem: result.data.content
            })
        } catch (error) {
            alert('lay thong tin rap chieu khong thanh cong')
        }
    }
}

export const getInfoCinemaBySystemAction = (idCinema) => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.getInfoCinemaBySystem(idCinema)
            dispatch({
                type:GET_INFO_CINEMA_BY_SYSTEM,
                infoCinema: result.data.content
            })
        } catch (error) {
            alert('lay thong tin rap chieu khong thanh cong')
        }
    }
}
