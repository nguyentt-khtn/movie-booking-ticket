import React, { useEffect } from 'react'
import { Form, Input, Button, Select } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { addNewUserAction, getListTypeUserAction } from '../../../../redux/actions/UserAction';
import { GROUP_ID } from '../../../../util/settings/config';

const { Option } = Select;

export default function AddUser(props) {
    const { listTypeUser } = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()
    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            hoTen: '',
            maLoaiNguoiDung: listTypeUser[0]?.maLoaiNguoiDung
        },
        onSubmit: values => {
            values.maNhom = GROUP_ID
            values.soDt = values.soDt.toString()
            dispatch(addNewUserAction(values))
        },
        validationSchema: yup.object({
            taiKhoan: yup.string().required('Không được bỏ trống'),
            matKhau: yup.string().required('Không được bỏ trống').min(6, 'Quá ngắn').max(12, 'Quá dài'),
            email: yup.string().required('Không được bỏ trống').email('Email không hợp lệ'),
            soDt: yup.string().required('Không được bỏ trống'),
            hoTen: yup.string().required('Không được bỏ trống'),
        })
    });
    useEffect(() => {
        dispatch(getListTypeUserAction())
    }, [])
    return (
        <div>
            <div className='text-4xl mb-10' >Thêm người dùng</div>
            <Form className='grid grid-cols-2 gap-5' onSubmitCapture={formik.handleSubmit} >
                <Form.Item label={<span style={{ minWidth: 80, marginLeft: 2 }}>Email</span>} className='px-12' >
                    <Input name='email' style={{ maxWidth: 500 }} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                    {formik.errors.email && formik.touched.email && <div className='text-red-400 italic'>{formik.errors.email}</div>}
                </Form.Item>
                <Form.Item label={<span style={{ minWidth: 80, marginLeft: 21 }}>Tài khoản</span>}>
                    <Input name='taiKhoan' style={{ maxWidth: 500 }} value={formik.values.taiKhoan} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.taiKhoan && formik.touched.taiKhoan && <div className='text-red-400 italic'>{formik.errors.taiKhoan}</div>}
                </Form.Item>
                <Form.Item label={<span style={{ minWidth: 80, marginLeft: 2 }}>Họ tên</span>}>
                    <Input name='hoTen' style={{ maxWidth: 500 }} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.hoTen} />
                    {formik.errors.hoTen && formik.touched.hoTen && <div className='text-red-400 italic'>{formik.errors.hoTen}</div>}
                </Form.Item>
                <Form.Item label={<span style={{ minWidth: 80, marginLeft: 21 }}>Mật khẩu</span>}>
                    <Input name='matKhau' style={{ maxWidth: 500 }} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.matKhau} />
                    {formik.errors.matKhau && formik.touched.matKhau && <div className='text-red-400 italic'>{formik.errors.matKhau}</div>}
                </Form.Item>
                <Form.Item label={<span style={{ minWidth: 80 }}>Số điện thoại</span>}>
                    <Input name='soDt' type='number' style={{ maxWidth: 500 }} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.soDt} />
                    {formik.errors.soDt && formik.touched.soDt && <div className='text-red-400 italic'>{formik.errors.soDt}</div>}
                </Form.Item>
                <Form.Item label='Loại người dùng'>
                    <Select value={formik.values.maLoaiNguoiDung} style={{ maxWidth: 500 }} onChange={(value)=>{formik.setFieldValue('maLoaiNguoiDung', value)}} >
                        {listTypeUser?.map((type, index) => {
                            return <Option key={index} value={type.maLoaiNguoiDung}>{type.tenLoai}</Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button style={{ marginLeft: 95 }} type="primary" htmlType='submit'>Thêm người dùng</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
