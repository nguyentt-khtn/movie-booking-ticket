import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { GET_LIST_TYPE_USER, GET_LIST_USER, INFO_ACCOUNT, LOGIN_USER } from "../constants/UserConstant"
import {history} from '../../App'

export const userLoginAction = (user) => {
    return async dispatch => {
        try {
            const result = await quanLyNguoiDungService.loginUser(user)
            if (result.data.statusCode === 200) {
                dispatch({
                    type: LOGIN_USER,
                    userLogin: result.data.content
                })
                history.push('/home')
            }
        } catch (error) {
            alert('dang nhap khong thanh cong')
        }
    }
}

export const createAccountAction = (account) => {
    return async dispatch => {
        try {
            const result = await quanLyNguoiDungService.createAccount(account)
            if (result.data.statusCode === 200) {
                alert('dang ky thanh cong')
                history.push('/login')
            }
        } catch (error) {
            alert('dang ky tai khoan khong thanh cong')
        }
    }
}

export const infoAccountAction = () => {
    return async dispatch => {
        try {
            const result = await quanLyNguoiDungService.infoAccount()
            if (result.data.statusCode === 200) {
                dispatch({
                    type:INFO_ACCOUNT,
                    infoAccount:result.data.content
                })
            }
        } catch (error) {
            alert('lay thong tin tai khoan khong thanh cong')
        }
    }
}

export const updateAccountAction = (account) => {
    return async dispatch => {
        try {
            const result = await quanLyNguoiDungService.updateAccount(account)
            if (result.data.statusCode === 200) {
                alert('Successfully')
                dispatch(infoAccountAction())
            }
        } catch (error) {
            alert('cap nhat thong tin tai khoan khong thanh cong')
        }
    }
}

export const getListUserAction = (userFind = '') => {
    return async dispatch => {
        try {
            const result = await quanLyNguoiDungService.getListUser(userFind)
            if (result.data.statusCode === 200) {
                dispatch({
                    type: GET_LIST_USER,
                    listUser:result.data.content
                })
            }
        } catch (error) {
            alert('lay danh sach tai khoan khong thanh cong')
        }
    }
}

export const getListTypeUserAction = () => {
    return async dispatch => {
        try {
            const result = await quanLyNguoiDungService.getListTypeUser()
            if (result.data.statusCode === 200) {
                dispatch({
                    type: GET_LIST_TYPE_USER,
                    listTypeUser:result.data.content
                })
            }
        } catch (error) {
            alert('lay danh sach loai nguoi dung khong thanh cong')
        }
    }
}

export const addNewUserAction = (user) => {
    return async dispatch => {
        try {
            const result = await quanLyNguoiDungService.addNewUser(user)
            if (result.data.statusCode === 200) {
                alert('Successfully')
                dispatch(getListUserAction())
                history.push('/admin/dashboard')
            }
        } catch (error) {
            alert('them nguoi dung khong thanh cong')
        }
    }
}

export const updateUserAction = (user) => {
    return async dispatch => {
        try {
            const result = await quanLyNguoiDungService.updateUser(user)
            if (result.data.statusCode === 200) {
                alert('Successfully')
                dispatch(getListUserAction())
                history.push('/admin/dashboard')
            }
        } catch (error) {
            alert('cap nhat nguoi dung khong thanh cong')
        }
    }
}

export const deleteUserAction = (taiKhoan) => {
    return async dispatch => {
        try {
            const result = await quanLyNguoiDungService.deleteUser(taiKhoan)
            if (result.data.statusCode === 200) {
                alert('Successfully')
                dispatch(getListUserAction())
            }
        } catch (error) {
            alert('xoa nguoi dung khong thanh cong')
        }
    }
}