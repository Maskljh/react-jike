import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet } from 'react-router-dom'

import { useNavigate } from 'react-router'
import { useLocation } from 'react-router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { clearUserInfo, fetchUserInfo } from '../../store/modules/user'

const { Header, Sider } = Layout  


const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {
  const navigate=useNavigate()
  const onClickForm=(values)=>{
    console.log(values.key)
    navigate(values.key)
  }

  const location=useLocation()
  console.log(location.pathname)
  const selectKey=location.pathname

  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(fetchUserInfo())
  },[dispatch])

  const userInfo=useSelector(state=>state.user.userinfo)
  console.log(userInfo)
  const useName=userInfo.name

  const confirm=()=>{
    dispatch(clearUserInfo())
    navigate("/login")
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{useName}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={confirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            onClick={onClickForm}
            mode="inline"
            theme="dark"
            // defaultSelectedKeys={['1']}
            selectedKeys={selectKey}
            items={items}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout
