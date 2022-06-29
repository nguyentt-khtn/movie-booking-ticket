
import React from 'react'
import { useSelector } from 'react-redux'

export default function Loading(props) {
    const { isLoading } = useSelector(state => state.LoadingReducer)
    if (isLoading) {
        return (
            <div style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className='text-center text-white text-4xl'>Loading...</div>
            </div>
        )
    } else {
        return
    }

}
