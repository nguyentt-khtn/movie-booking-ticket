import React from 'react'
import MultipleRow from '../../components/ReactSlick/MultipleRow'
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel'
import HomeMenuCinema from './HomeMenuCinema'

export default function Home() {
    return (
        <div>
            <HomeCarousel />
            <MultipleRow />
            <HomeMenuCinema />
        </div>
    )
}
