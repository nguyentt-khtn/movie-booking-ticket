import React, { Fragment } from 'react'
import { Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, FileOutlined, UserOutlined, FileAddOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { TOKEN, USER_LOGIN } from '../../util/settings/config';
import { history } from '../../App';
import _ from 'lodash';
import SubMenu from 'antd/lib/menu/SubMenu';

const { Header, Content, Sider } = Layout;

export default function AdminTemplate(props) {

    let thisUser = JSON.parse(localStorage.getItem(USER_LOGIN))

    if (!localStorage.getItem(USER_LOGIN)) {
        alert('ban khong co quyen truy cap')
        return history.push('/')
    }

    if (thisUser.maLoaiNguoiDung !== "QuanTri") {
        alert('ban khong co quyen truy cap')
        return history.push('/')
    }

    const { Component, ...restRoute } = props
    const extraTab = () => {
        if (_.isEmpty(thisUser)) {
            return ''
        }
        return <div className='flex flex-row w-full justify-end'>
            <div className='flex flex-row border-pink-400' style={{ cursor: 'pointer' }}>
                <div className='items-center flex flex-row mr-3' onClick={() => { history.push('/profile') }}>
                    <p className='w-5 h-5 justify-center items-center flex flex-row rounded-xl bg-gray-300 mr-1 text-black text-center'>{thisUser?.taiKhoan.slice(0, 1)}</p>
                    <span className='text-white mb-4'>{thisUser?.taiKhoan}</span>
                </div>
                <button className='mr-5 text-red-500 mb-4' onClick={() => {
                    localStorage.removeItem(USER_LOGIN)
                    localStorage.removeItem(TOKEN)
                    history.push('/')
                    window.location.reload()
                }}>
                    Đăng xuất</button>
            </div>

        </div>
    }
    return (
        <Route {...restRoute} render={(propsRoute) => {
            return <Fragment>
                <Layout style={{ minHeight: '100vh', }}>
                    <Sider>
                        <NavLink to='/home' className="logo">
                            <img style={{ transform: 'scale(0.75)', marginTop: '4px' }} className="logo-img-sticky site-logo-img-sticky" src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="CyberLearn - Học lập trình trực tuyến" title="Học lập trình rành nghề" />
                        </NavLink>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key='1' icon={<UserOutlined />}  >
                                <NavLink to='/admin/dashboard'>Dashboard</NavLink>
                            </Menu.Item>
                            <SubMenu key='sub1' icon={<FileOutlined />} title='Films' >
                                <Menu.Item key='10' icon={<FileOutlined />} >
                                    <NavLink to='/admin/films'>Film Info</NavLink>
                                </Menu.Item>
                                <Menu.Item key='11' icon={<FileAddOutlined />} >
                                    <NavLink to='/admin/films/addfilm'>Add film</NavLink>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key='3' icon={<DesktopOutlined />} >
                                <NavLink to='/admin/showtime'>Showtime</NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background">
                            {extraTab()}
                        </Header>
                        <Content style={{ margin: '0 16px', }}>

                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360, }}>
                                <Component {...propsRoute} />
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Fragment>
        }} />
    )
}