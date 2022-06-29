import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, InputNumber, Switch } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { GROUP_ID } from '../../../../util/settings/config';
import { useDispatch, useSelector } from 'react-redux';
import { addNewFilmAction, getInfoFilmAction, updateFilmAction } from '../../../../redux/actions/FilmAction';

const EditFilm = (props) => {
    const [src, setSrc] = useState('')
    const dispatch = useDispatch()
    const { filmEdit } = useSelector(state => state.FilmReducer)
    useEffect(() => {
        let { id } = props.match.params
        dispatch(getInfoFilmAction(id))
    }, [])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: filmEdit.maPhim,
            tenPhim: filmEdit.tenPhim,
            trailer: filmEdit.trailer,
            moTa: filmEdit.moTa,
            ngayKhoiChieu: filmEdit.ngayKhoiChieu,
            sapChieu: filmEdit.sapChieu,
            dangChieu: filmEdit.dangChieu,
            hot: filmEdit.hot,
            danhGia: filmEdit.danhGia,
            hinhAnh: null,
        },
        onSubmit: values => {
            values.maNhom = GROUP_ID
            let formData = new FormData()
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                } else {
                    if (values['hinhAnh'] !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name)
                    }
                }
            }
            dispatch(updateFilmAction(formData))
        },
    })
    const handleChangeDate = (value) => {
        let ngayKhoiChieu = moment(value)
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }
    const handleChangeSwitch = (name) => {
        return (value) => { formik.setFieldValue(name, value) }
    }
    const handleChangeFile = async (event) => {
        let file = event.target.files[0]
        await formik.setFieldValue('hinhAnh', file)
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setSrc(e.target.result)
        }

    }
    return (
        <Form onSubmitCapture={formik.handleSubmit} labelCol={{ span: 4, }} wrapperCol={{ span: 14, }} layout="horizontal">
            <Form.Item label="Tên phim">
                <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDate} defaultValue={moment(formik.values.ngayKhoiChieu, 'DD/MM/YYYY')} />
            </Form.Item>
            <Form.Item label="Sắp chiếu">
                <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
            </Form.Item>
            <Form.Item label="Đang chiếu">
                <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
            </Form.Item>
            <Form.Item label="Hot">
                <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
            </Form.Item>
            <Form.Item label="Đánh giá">
                <InputNumber name='danhGia' max='10' min='0' onChange={handleChangeSwitch('danhGia')} value={formik.values.danhGia} />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <input type='file' name='hinhAnh' onChange={handleChangeFile} />
                <br />
                <img src={src === '' ? filmEdit.hinhAnh : src} alt='123' width={100} height={100} />
            </Form.Item>
            <Form.Item label="Hành động">
                <button type='submit' className='bg-blue-600 text-white p-2 w-32'>Cập nhật</button>
            </Form.Item>
        </Form>
    );
};

export default EditFilm


