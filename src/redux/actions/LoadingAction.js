import { OFF_LOADING, ON_LOADING } from "../constants/LoadingConstant"

export const onLoadingAction = () => {
    return {
        type:ON_LOADING
    }
}

export const offLoadingAction = () => {
    return {
        type:OFF_LOADING
    }
}