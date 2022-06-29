import { GET_ALL_CINEMA, GET_CINEMA_SYSTEM, GET_INFO_CINEMA_BY_SYSTEM } from "../constants/CinemaConstant"

const initialState = {
    arrCinema: [
        {
            "maHeThongRap": "BHDStar",
            "tenHeThongRap": "BHD Star Cineplex",
            "biDanh": "bhd-star-cineplex",
            "logo": "http://movieapi.cyberlearn.vn/hinhanh/bhd-star-cineplex.png"
        },
        {
            "maHeThongRap": "CGV",
            "tenHeThongRap": "cgv",
            "biDanh": "cgv",
            "logo": "http://movieapi.cyberlearn.vn/hinhanh/cgv.png"
        }
    ],
    cinemaSystem:[],
    infoCinema:[]
}

export const CinemaReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_CINEMA: {
            state.arrCinema = action.arrCinema
            return { ...state }
        }

        case GET_CINEMA_SYSTEM: {
            state.cinemaSystem = action.cinemaSystem
            return { ...state }
        }

        case GET_INFO_CINEMA_BY_SYSTEM: {
            state.infoCinema = action.infoCinema
            return { ...state }
        }

        default:
            return { ...state }
    }
}
