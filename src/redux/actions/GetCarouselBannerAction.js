import { quanLyPhimService } from "../../services/QuanLyPhimService"
import { GET_CAROUSEL_BANNER } from "../constants/CarouselConstant"


export const getCarouselBannerAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.getBanner()
            dispatch({
                type:GET_CAROUSEL_BANNER,
                arrBanner: result.data.content
            })
        } catch (error) {
            alert('lay banner khong thanh cong')
        }
    }
}
