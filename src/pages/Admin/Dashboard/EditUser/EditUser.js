import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, Select } from 'antd';
import { getListTypeUserAction, getListUserAction, updateUserAction } from '../../../../redux/actions/UserAction'
import { useFormik } from 'formik';
import * as yup from 'yup'
import { GROUP_ID } from '../../../../util/settings/config'

const { Option } = Select;

export default function EditUser(props) {
    const dispatch = useDispatch()
    const { listUser, listTypeUser } = useSelector(state => state.UserReducer)
    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            taiKhoan: listUser[0]?.taiKhoan,
            matKhau: listUser[0]?.matKhau,
            email: listUser[0]?.email,
            soDt: listUser[0]?.soDt,
            hoTen: listUser[0]?.hoTen,
            maLoaiNguoiDung: listUser[0]?.maLoaiNguoiDung
        },
        onSubmit: values => {
            values.maNhom = GROUP_ID
            values.soDt = values.soDt.toString()
            dispatch(updateUserAction(values))
        },
        validationSchema: yup.object({
            taiKhoan: yup.string().required('Không được bỏ trống'),
            matKhau: yup.string().required('Không được bỏ trống').min(6, 'Quá ngắn').max(12, 'Quá dài'),
            soDt: yup.string().required('Không được bỏ trống'),
            hoTen: yup.string().required('Không được bỏ trống'),
        })
    });
    useEffect(() => {
        let {id} = props.match.params
        dispatch(getListUserAction(id))
        dispatch(getListTypeUserAction())
    }, [])
    return (
        <div>
            <div className='text-4xl mb-10' >Thay đổi thông tin người dùng</div>
            <Form className='grid grid-cols-2 gap-5' onSubmitCapture={formik.handleSubmit} >
                <Form.Item label={<span style={{ minWidth: 80, marginLeft: 2 }}>Email</span>} className='px-12' >
                    <Input name='email' style={{ maxWidth: 500 }}  value={formik.values.email} />
                </Form.Item>
                <Form.Item label={<span style={{ minWidth: 80, marginLeft: 21 }}>Tài khoản</span>}>
                    <Input name='taiKhoan' style={{ maxWidth: 500 }} value={formik.values.taiKhoan} />
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
                    <Button style={{ marginLeft: 95 }} type="primary" htmlType='submit'>Lưu</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
