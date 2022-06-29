import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App'
import { TOKEN, USER_LOGIN } from '../../../../util/settings/config'

export default function Header() {
    const { userLogin } = useSelector(state => state.UserReducer)
    const renderUserIcon = () => {
        if (_.isEmpty(userLogin)) {
            return <button onClick={() => history.push('/login')} className="self-center px-8 py-3 rounded">Sign in</button>
        }
        return <div className='flex flex-row'>
            <div className='flex flex-row  border-pink-400' style={{ cursor: 'pointer' }}>
                <div className='border p-1 rounded-xl flex flex-row mr-2' onClick={() => { history.push('/profile') }}>
                    <div className='w-5 h-5 rounded-xl bg-gray-300 mr-2 text-black text-center'>{userLogin?.taiKhoan.slice(0, 1)}</div>
                    <div>{userLogin?.taiKhoan}</div>
                </div>
            </div>
        </div>
    }
    const renderSignupIcon = () => {
        if (_.isEmpty(userLogin)) {
            return <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900" onClick={() => { history.push('/register') }}>Sign up</button>
        }
        return <button className='mr-5 text-red-500' onClick={() => {
            localStorage.removeItem(USER_LOGIN)
            localStorage.removeItem(TOKEN)
            history.push('/home')
            window.location.reload()
        }}>Đăng xuất</button>
    }
    return (
        <header className="p-4 dark:bg-coolGray-800 dark:text-coolGray-100 bg-black text-white w-full z-10">
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink to='/' rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
                    <img className="logo-img-sticky site-logo-img-sticky" src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="CyberLearn - Học lập trình trực tuyến" title="Học lập trình rành nghề" />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink rel="noopener noreferrer" to="/home" activeClassName='border-b-2 border-white' className="flex items-center px-4 -mb-1 dark:border-transparent dark:text-violet-400 dark:border-violet-400">Home</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink rel="noopener noreferrer" to="/contact" activeClassName='border-b-2 border-white' className="flex items-center px-4 -mb-1 dark:border-transparent">Contact</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink rel="noopener noreferrer" to="/news" activeClassName='border-b-2 border-white' className="flex items-center px-4 -mb-1  dark:border-transparent">News</NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderUserIcon()}
                    {renderSignupIcon()}
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>

    )
}
