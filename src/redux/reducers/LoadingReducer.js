import { OFF_LOADING, ON_LOADING } from "../constants/LoadingConstant"

const initialState = {
    isLoading: false
}

export const LoadingReducer = (state = initialState, action) => {
    switch (action.type) {

        case ON_LOADING: {
            state.isLoading = true
            return { ...state }
        }

        case OFF_LOADING: {
            state.isLoading = false
            return { ...state }
        }

        default:
            return { ...state }
    }
}
