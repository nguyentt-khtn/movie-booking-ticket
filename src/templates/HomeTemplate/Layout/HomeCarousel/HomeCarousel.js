import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getCarouselBannerAction } from '../../../../redux/actions/GetCarouselBannerAction';
import './HomeCarousel.css'

const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    backgroundSize: '100%'
};

export default function HomeCarousel() {

    const { arrBanner } = useSelector(state => state.CarouselReducer)
    const dispatch = useDispatch()
    const renderBanner = () => {
        return arrBanner?.map((banner, index) => {
            return <div key={index}>
                <div style={{ ...contentStyle, backgroundRepeat: 'no-repeat', backgroundImage: `url(${banner.hinhAnh})` }}>
                    <img className='opacity-0' src={banner.hinhAnh} alt={banner.hinhAnh} />
                </div>
            </div>
        })
    }
    useEffect(() => {
        dispatch(getCarouselBannerAction())
    }, [])

    return (
        <div>
            <Carousel autoplay>
                {renderBanner()}
            </Carousel>
        </div>

    )
}
