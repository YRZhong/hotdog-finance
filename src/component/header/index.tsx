import React from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Menu, Badge, Avatar, Dropdown, message } from 'antd'
import { SettingOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons'
import style from './index.module.css'

const { Header } = Layout

const HeaderBar: React.FC<{ isPro: boolean }> = ({ isPro }) => {
  const userName: string = sessionStorage.getItem('token') || ''
  const { Item } = Menu
  const history = useHistory()
  const handleLogout = () => {
    sessionStorage.removeItem('token')
    history.replace('/login')
    message.info('已退出登录')
  }
  const menu = () => {
    return (
      <Menu>
        <Item>
          <SettingOutlined /> 个人设置
        </Item>
        <Item
          onClick={() => {
            handleLogout()
          }}
        >
          <LogoutOutlined /> 退出登录
        </Item>
      </Menu>
    )
  }
  const UserAvatar: React.FC<{}> = () => {
    return isPro ? (
      <Badge count={'Pro'}>
        <Avatar className={style.avatar}>{userName.slice(0, 1).toUpperCase()}</Avatar>
      </Badge>
    ) : (
      <Avatar className={style.avatar}>{userName.slice(0, 1).toUpperCase()}</Avatar>
    )
  }

  return (
    <Header className={style.header}>
      <div>
        <UserAvatar />
        <Dropdown overlay={menu} trigger={['click']}>
          <span className={style.headerUserName} onClick={(e) => e.preventDefault()}>
            {userName} <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </Header>
  )
}

export default HeaderBar
