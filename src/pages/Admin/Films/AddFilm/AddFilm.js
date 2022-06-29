import React, { useState } from 'react';
import { Form, Input, Button, Select, Cascader, DatePicker, InputNumber, TreeSelect, Switch, } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { GROUP_ID } from '../../../../util/settings/config';
import { useDispatch } from 'react-redux';
import { addNewFilmAction } from '../../../../redux/actions/FilmAction';

const AddFilm = () => {
    const [src, setSrc] = useState('')
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            sapChieu: false,
            dangChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
        },
        onSubmit: values => {
            values.maNhom = GROUP_ID
            let formData = new FormData()
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                }else{
                    formData.append('File', values.hinhAnh, values.hinhAnh.name)
                }

            }
            dispatch(addNewFilmAction(formData))
        },
    })
    const handleChangeDate = (value) => {
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }
    const handleChangeSwitch = (name) => {
        return (value) => { formik.setFieldValue(name, value) }
    }
    const handleChangeFile = (event) => {
        let file = event.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setSrc(e.target.result)
        }
        formik.setFieldValue('hinhAnh', file)
    }
    return (
        <Form onSubmitCapture={formik.handleSubmit} labelCol={{ span: 4, }} wrapperCol={{ span: 14, }} layout="horizontal">
            <Form.Item label="Tên phim">
                <Input name='tenPhim' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name='moTa' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDate} />
            </Form.Item>
            <Form.Item label="Sắp chiếu">
                <Switch onChange={handleChangeSwitch('sapChieu')} />
            </Form.Item>
            <Form.Item label="Đang chiếu">
                <Switch onChange={handleChangeSwitch('dangChieu')} />
            </Form.Item>
            <Form.Item label="Hot">
                <Switch onChange={handleChangeSwitch('hot')} />
            </Form.Item>
            <Form.Item label="Đánh giá">
                <InputNumber name='danhGia' max='10' min='0' onChange={handleChangeSwitch('danhGia')} />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <input type='file' name='hinhAnh' onChange={handleChangeFile} />
                <br />
                <img src={src} alt='123' width={100} height={100} />
            </Form.Item>
            <Form.Item label="Hành động">
                <button type='submit'>Thêm</button>
            </Form.Item>
        </Form>
    );
};

export default AddFilm


