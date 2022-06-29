import { history } from "../../App"
import { quanLyPhimService } from "../../services/QuanLyPhimService"
import { quanLyRapService } from "../../services/QuanLyRapService"
import { GET_FILM, GET_FILM_DETAIL, GET_INFO_FILM } from "../constants/FilmConstant"

export const getFilmAction = (tenPhim='') => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.getFilm(tenPhim)
            dispatch({
                type:GET_FILM,
                arrFilm: result.data.content
            })
        } catch (error) {
            alert('lay danh sach phim khong thanh cong')
        }
    }
}

export const getFilmDetailAction = (idFilm) => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.getFilmDetail(idFilm)
            dispatch({
                type:GET_FILM_DETAIL,
                filmDetail: result.data.content
            })
        } catch (error) {
            alert('lay chi tiet phim khong thanh cong')
        }
    }
}

export const addNewFilmAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.addNewFilm(formData)
            alert('them phim thanh cong')
        } catch (error) {
            alert('them phim khong thanh cong')
        }
    }
}

export const getInfoFilmAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.getInfoFilm(maPhim)
            if(result.data.statusCode === 200){
                dispatch({
                    type:GET_INFO_FILM,
                    filmEdit:result.data.content
                })
            }
        } catch (error) {
            alert('lay thong tin phim khong thanh cong')
        }
    }
}

export const updateFilmAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.updateFilm(formData)
            alert('cap nhat phim thanh cong')
            dispatch(getFilmAction())
            history.push('/admin/films')
        } catch (error) {
            alert('cap nhat thong tin phim khong thanh cong')
        }
    }
}

export const deleteFilmAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.deleteFilm(maPhim)
            alert('xoa phim thanh cong')
            dispatch(getFilmAction())
        } catch (error) {
            alert('xoa thong tin phim khong thanh cong')
        }
    }
}