import { TOKEN, USER_LOGIN } from "../../util/settings/config"
import { GET_LIST_TYPE_USER, GET_LIST_USER, INFO_ACCOUNT, LOGIN_USER } from "../constants/UserConstant"

let user = {}
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
    userLogin: user,
    infoAccount:[],
    listUser:[],
    listTypeUser:[]
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_USER: {
            state.userLogin = action.userLogin
            localStorage.setItem(USER_LOGIN, JSON.stringify(action.userLogin))
            localStorage.setItem(TOKEN,action.userLogin.accessToken)
            return { ...state }
        }

        case INFO_ACCOUNT: {
            state.infoAccount = action.infoAccount
            return { ...state }
        }

        case GET_LIST_USER: {
            state.listUser = action.listUser
            return { ...state }
        }

        case GET_LIST_TYPE_USER: {
            state.listTypeUser = action.listTypeUser
            return { ...state }
        }
        default:
            return { ...state }
    }
}
