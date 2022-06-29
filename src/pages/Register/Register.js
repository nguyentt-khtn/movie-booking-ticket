import React from 'react'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { history } from '../../App';
import { GROUP_ID } from '../../util/settings/config';
import * as yup from 'yup';
import { createAccountAction } from '../../redux/actions/UserAction';

export default function Register(props) {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            hoTen: '',
            maNhom: GROUP_ID.toString()
        },
        onSubmit: values => {
            values.maNhom = GROUP_ID.toString()
            dispatch(createAccountAction(values))

        },
        validationSchema: yup.object({
            taiKhoan: yup.string().required('Không được bỏ trống'),
            matKhau: yup.string().required('Không được bỏ trống').min(6, 'Quá ngắn').max(12, 'Quá dài'),
            xacNhanMatKhau: yup.string().required('Không được bỏ trống').oneOf([yup.ref("matKhau")], "Mật khẩu không đồng nhất"),
            email: yup.string().required('Không được bỏ trống').email('Email không hợp lệ'),
            soDt: yup.string().required('Không được bỏ trống'),
            hoTen: yup.string().required('Không được bỏ trống'),
        })
    });
    return (
        <form onSubmit={(event) => { event.preventDefault(); formik.handleSubmit(event) }} className="lg:w-1/2 xl:max-w-screen-sm">
            <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
                <NavLink to='/' className="cursor-pointer flex items-center">
                    <img src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png' alt='cyberlearn' />
                </NavLink>
            </div>
            <div className="mt-2 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-0 xl:px-24 xl:max-w-2xl">
                <h2 className="text-center text-2xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold">Đăng ký</h2>
                <div className="mt-8">
                    <div>
                        <div>
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Tài khoản</div>
                            <input name='taiKhoan' onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập tài khoản" />
                            {formik.errors.taiKhoan && formik.touched.taiKhoan && <p className='text-red-400 italic'>{formik.errors.taiKhoan}</p>}
                        </div>
                        <div className="mt-2">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Password</div>
                            </div>
                            <input name='matKhau' type='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập mật khẩu" />
                            {formik.errors.matKhau && formik.touched.matKhau && <p className='text-red-400 italic'>{formik.errors.matKhau}</p>}
                        </div>
                        <div className="mt-2">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Nhập lại mật khẩu</div>
                            </div>
                            <input name='xacNhanMatKhau' type='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập lại mật khẩu" />
                            {formik.errors.xacNhanMatKhau && formik.touched.xacNhanMatKhau && <p className='text-red-400 italic'>{formik.errors.xacNhanMatKhau}</p>}
                        </div>
                        <div className="mt-2">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Họ tên</div>
                            </div>
                            <input name='hoTen' onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập họ tên" />
                            {formik.errors.hoTen && formik.touched.hoTen && <p className='text-red-400 italic'>{formik.errors.hoTen}</p>}
                        </div>
                        <div className="mt-2">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Số điện thoại</div>
                            </div>
                            <input name='soDt' type='number' onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập số điện thoại" />
                            {formik.errors.soDt && formik.touched.soDt && <p className='text-red-400 italic'>{formik.errors.soDt}</p>}
                        </div>
                        <div className="mt-2">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Email</div>
                            </div>
                            <input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập email" />
                            {formik.errors.email && formik.touched.email && <p className='text-red-400 italic'>{formik.errors.email}</p>}
                        </div>

                        <div className="mt-10 flex flex-row justify-between">
                            <button type='submit' className="bg-indigo-500 text-gray-100 p-4 w-1/3 rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg">
                                Đăng ký
                            </button>
                            <button className="bg-indigo-500 text-gray-100 p-4 w-1/3 rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg" onClick={() => history.push('/login')}>
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
