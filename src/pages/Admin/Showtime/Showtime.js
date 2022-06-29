import React, { useEffect } from 'react';
import { Form, Select, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoCinemaBySystemAction, getSystemCinemaAction } from '../../../redux/actions/CinemaAction';
import { useFormik } from 'formik';
import moment from 'moment';
import { createShowtimeAction } from '../../../redux/actions/BookingTicketAction';

const Showtime = (props) => {
    const { cinemaSystem, infoCinema } = useSelector(state => state.CinemaReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSystemCinemaAction())
    }, [])

    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: '',
        },
        onSubmit: values => {
            dispatch(createShowtimeAction(values))
        }
    })

    const arrSystemCinema = cinemaSystem?.map((cinema, index) => {
        return { value: cinema.maHeThongRap, label: cinema.tenHeThongRap }
    })
    const arrInfoCinema = infoCinema?.map((cinema, index) => {
        return { value: cinema.maCumRap, label: cinema.tenCumRap }
    })
    const handleChangeSystemCinema = (value) => {
        dispatch(getInfoCinemaBySystemAction(value))
    }
    const handleChangeInfoCinema = (value) => {
        formik.setFieldValue('maRap', value)
    }
    const handleChangeTicketCost = (value) => {
        formik.setFieldValue('giaVe', value)
    }
    const handleChangeDatePicker = (value) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))
    }
    const handleChangeOnOk = (value) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))
    }
    return (
        <Form onSubmitCapture={formik.handleSubmit} labelCol={{ span: 4, }} wrapperCol={{ span: 14, }} layout="horizontal">
            <Form.Item label="Chọn cụm rạp">
                <Select placeholder='Chọn cụm rạp' style={{ maxWidth: '200px' }} onChange={handleChangeSystemCinema}
                    options={arrSystemCinema} defaultValue={arrSystemCinema[0]}
                />
            </Form.Item>
            <Form.Item label="Chọn rạp">
                <Select placeholder='Chọn rạp' style={{ maxWidth: '200px' }}
                    options={arrInfoCinema} onChange={handleChangeInfoCinema}
                />
            </Form.Item>
            <Form.Item label="Ngày chiếu giờ chiếu">
                <DatePicker format='DD/MM/YYYY hh:mm:ss' showTime placeholder='Chọn ngày giờ chiếu' style={{ maxWidth: '200px' }}
                onChange={handleChangeDatePicker} onOk={handleChangeOnOk} />
            </Form.Item>
            <Form.Item label="Giá vé">
                <Select placeholder='Nhập giá vé' options={[{label:'75000',value:75000},{label:'100000',value:100000}]} style={{ maxWidth: '200px' }}
                onChange={handleChangeTicketCost} />
            </Form.Item>
            <Form.Item label="Hành động">
                <button type='submit' className='bg-blue-500 px-5 py-2 text-white' >Xác nhận</button>
            </Form.Item>
        </Form>
    );
};

export default Showtime