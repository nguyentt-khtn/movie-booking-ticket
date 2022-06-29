import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styleSlick from './MultipleRow.module.css'
import { useDispatch, useSelector } from "react-redux";
import CardFilm from "../Film/CardFilm";
import { getFilmAction } from "../../redux/actions/FilmAction";

const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "20px",
    slidesToShow: 3,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
};

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-next']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}
export default function MultipleRow(props) {

    const { arrFilm } = useSelector(state => state.FilmReducer)
    const [statusFilm, setStatusFilm] = useState('')
    const renderFilm = () => {
        if (statusFilm !== '') {
            return arrFilm.filter(item => item[`${statusFilm}`] === true).map((film, index) => {
                return <div key={index} className={`${styleSlick['width-item']} my-4 `}>
                    <CardFilm film={film} />
                </div>
            })
        }else{
            return arrFilm.map((film, index) => {
                return <div key={index} className={`${styleSlick['width-item']} my-4 `}>
                    <CardFilm film={film} />
                </div>
            })
        }
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFilmAction())
    }, [])

    return (
        <div className="container mx-auto w-3/4">
            <div className="mt-6">
                <button className={`px-12 mr-2 py-3 font-semibold border bg-white border-gray-800 rounded ${statusFilm === 'dangChieu' ? styleSlick['dangChieu'] : ''}`} onClick={() => {
                    setStatusFilm('dangChieu')
                }}>Phim đang chiếu</button>
                <button className={`px-12 py-3 font-semibold border bg-white border-gray-800 rounded ${statusFilm === 'sapChieu' ? styleSlick['sapChieu'] : ''}`} onClick={() => {
                    setStatusFilm('sapChieu')
                }}>Phim sắp chiếu</button>
            </div>

            <Slider {...settings}>
                {renderFilm()}
            </Slider>
        </div>
    );

}
