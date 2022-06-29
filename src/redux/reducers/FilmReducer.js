import { GET_FILM, GET_FILM_DETAIL, GET_INFO_FILM } from "../constants/FilmConstant"

const initialState = {
    arrFilm: [
        {
            "maPhim": 10147,
            "tenPhim": "Doctor Strange 2019",
            "biDanh": "doctor-strange-2019",
            "trailer": "https://www.youtube.com/watch?v=kmXjPbN-rYU",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/doctor-strange-2019_gp01.jpg",
            "moTa": "Doctor Strange: Phù thủy tối thượng là một phim của điện ảnh Hoa Kỳ dựa trên nhân vật cùng tên của hãng Marvel Comics, sản xuất bởi Marvel Studios và phân phối bởi Walt Disney Studios Motion Pictures. Đây là bộ phim thứ 14 trong Marvel Cinematic Universe.",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-03-04T00:00:00",
            "danhGia": 10,
            "hot": true,
            "dangChieu": true,
            "sapChieu": false
        },
        {
            "maPhim": 10158,
            "tenPhim": "Spider-Man: Homecoming",
            "biDanh": "spider-man-homecoming",
            "trailer": "https://www.youtube.com/watch?v=Pik8DPmrt2k",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/spider-man-homecoming_gp01.jpg",
            "moTa": "là phim siêu anh hùng năm 2019 của Mỹ dựa trên nhân vật Peter Parker của truyện tranh Marvel. Bộ phim được sản xuất bởi Columbia Pictures và Marvel Studios, và được phân phối bởi Sony Pictures. Bộ phim có ý nghĩa khởi động lại dự án Spider-Man của Marvel sau nhiều năm nhượng quyền lại cho Sony Pictures. Bộ phim là bộ phim thứ 16 trong  Vũ trụ điện ảnh Marvel (MCU). ",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-03-04T00:00:00",
            "danhGia": 10,
            "hot": true,
            "dangChieu": false,
            "sapChieu": true
        }
    ],
    filmDetail: {},
    filmEdit:{}
}

export const FilmReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_FILM: {
            state.arrFilm = action.arrFilm
            return { ...state }
        }
        case GET_FILM_DETAIL: {
            state.filmDetail = action.filmDetail
            return { ...state }
        }
        case GET_INFO_FILM: {
            state.filmEdit = action.filmEdit
            return { ...state }
        }
        default:
            return { ...state }
    }
}
