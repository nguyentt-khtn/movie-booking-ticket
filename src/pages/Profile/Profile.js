import React, { useEffect } from 'react'
import { Tabs, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { infoAccountAction, updateAccountAction } from '../../redux/actions/UserAction';
import { useFormik } from 'formik';
import moment from 'moment';
import * as yup from 'yup'

const { TabPane } = Tabs;

export default function Profile(props) {
    const dispatch = useDispatch()
    const { infoAccount } = useSelector(state => state.UserReducer)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: infoAccount.taiKhoan,
            matKhau: infoAccount.matKhau,
            email: infoAccount.email,
            soDT: infoAccount.soDT,
            hoTen: infoAccount.hoTen,
        },
        onSubmit: values => {
            values.maNhom = infoAccount.maNhom
            values.maLoaiNguoiDung = infoAccount.loaiNguoiDung === 'Khách hàng' ? 'KhachHang' : 'QuanTri'
            console.log(values)
            dispatch(updateAccountAction(values))
        },
        validationSchema: yup.object({
            taiKhoan: yup.string().required('Không được bỏ trống'),
            matKhau: yup.string().required('Không được bỏ trống').min(6, 'Quá ngắn').max(12, 'Quá dài'),
            email: yup.string().required('Không được bỏ trống').email('Email không hợp lệ'),
            soDT: yup.string().required('Không được bỏ trống'),
            hoTen: yup.string().required('Không được bỏ trống'),
        })
    });
    useEffect(() => {
        dispatch(infoAccountAction())
    }, [])
    return (
        <div className='container mx-auto mt-10 min-h-screen'>
            <Tabs tabPosition='top'>
                <TabPane tab="THÔNG TIN CÁ NHÂN" key="1">
                    <Form className='grid grid-cols-2' onSubmitCapture={formik.handleSubmit} >
                        <Form.Item label={<span style={{ minWidth: 80 }}>Email</span>} >
                            <Input name='email' style={{ maxWidth: 200 }} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                            {formik.errors.email && formik.touched.email && <div className='text-red-400 italic'>{formik.errors.email}</div>}
                        </Form.Item>
                        <Form.Item label={<span style={{ minWidth: 80 }}>Tài khoản</span>}>
                            <Input name='taiKhoan' style={{ maxWidth: 200 }} value={formik.values.taiKhoan} />
                        </Form.Item>
                        <Form.Item label={<span style={{ minWidth: 80 }}>Họ tên</span>}>
                            <Input name='hoTen' style={{ maxWidth: 200 }} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.hoTen} />
                            {formik.errors.hoTen && formik.touched.hoTen && <div className='text-red-400 italic'>{formik.errors.hoTen}</div>}
                        </Form.Item>
                        <Form.Item label={<span style={{ minWidth: 80 }}>Mật khẩu</span>}>
                            <Input name='matKhau' style={{ maxWidth: 200 }} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.matKhau} />
                            {formik.errors.matKhau && formik.touched.matKhau && <div className='text-red-400 italic'>{formik.errors.matKhau}</div>}
                        </Form.Item>
                        <Form.Item label={<span style={{ minWidth: 80 }}>Số điện thoại</span>}>
                            <Input name='soDT' style={{ maxWidth: 200 }} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.soDT} />
                            {formik.errors.soDT && formik.touched.soDT && <div className='text-red-400 italic'>{formik.errors.soDT}</div>}
                        </Form.Item>
                        <Form.Item>
                            <Button style={{ marginLeft: 95 }} type="primary" htmlType='submit'>Cập nhật</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="LỊCH SỬ ĐẶT VÉ" key="2">
                    <div style={{ marginLeft: '-20px' }} className='grid grid-cols-2'>
                        <section className="text-gray-600 body-font">
                            {infoAccount.thongTinDatVe?.map((info, index) => {
                                return <div className="container px-5 py-5 mx-auto" key={index}>
                                    <div className="flex flex-wrap -m-2">
                                        <div className="p-2 w-full">
                                            <div className="h-full flex items-center border-gray-200 border rounded-lg">
                                                <img alt="team" src={info.hinhAnh} className="w-32 bg-gray-100 object-cover object-center flex-shrink-0 mr-4" />
                                                <div className="flex-grow">
                                                    <p className="text-gray-900 title-font font-medium text-2xl">{info.tenPhim}</p>
                                                    <h2 className="text-gray-900 title-font font-medium">{info.danhSachGhe[0].tenHeThongRap}</h2>
                                                    <p className="text-gray-500">Ngày đặt: {moment(info.ngayDat).format('DD/MM/YYYY hh:mm:ss')}</p>
                                                    <div className='grid grid-cols-3 gap-2'>
                                                        {info.danhSachGhe.slice(0, 3).map((ghe, indexGhe) => {
                                                            return <span className='text-pink-400' key={indexGhe}>{ghe.tenCumRap} - Ghế {ghe.tenGhe} </span>
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </section>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}
