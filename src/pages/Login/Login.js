import React from 'react'
import {useFormik} from 'formik'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoginAction } from '../../redux/actions/UserAction';
import { history } from '../../App';

export default function Login(props) {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
          taiKhoan: '',
          matKhau: ''
        },
        onSubmit: values => {
        //   alert(JSON.stringify(values, null, 2));
            dispatch(userLoginAction(values))
            console.log(values)
        },
      });
    return (
        <form onSubmit={(event)=>{event.preventDefault();formik.handleSubmit(event)}} className="lg:w-1/2 xl:max-w-screen-sm">
            <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
                <NavLink to='/' className="cursor-pointer flex items-center">
                    <img src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png' alt='cyberlearn' />
                </NavLink>
            </div>
            <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold">Đăng nhập</h2>
                <div className="mt-12">
                    <div>
                        <div>
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Tài khoản</div>
                            <input name='taiKhoan' onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"  placeholder="Nhập tài khoản" />
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    Password
                                </div>
                                <div>
                                    <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                  cursor-pointer">
                                        Quên mật khẩu?
                                    </a>
                                </div>
                            </div>
                            <input name='matKhau' type='password' onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"  placeholder="Nhập mật khẩu" />
                        </div>
                        <div className="mt-10">
                            <button type='submit' className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg">
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                    <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                        Bạn có tài khoản chưa ? <NavLink to='/register' className="cursor-pointer text-indigo-600 hover:text-indigo-800">Đăng ký</NavLink>
                    </div>
                </div>
            </div>
        </form>

    )
}
