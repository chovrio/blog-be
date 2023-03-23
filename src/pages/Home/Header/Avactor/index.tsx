import React from 'react'
import { Avatar, MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import { connect } from 'react-redux'
import styles from './index.module.less'
import { User } from '~/user'
import { useNavigate } from 'react-router-dom'
const Avactor: React.FC<{ user: User }> = props => {
  const { user } = props
  const navigator = useNavigate()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <div onClick={() => navigator('/home/user/info')}>个人信息</div>
    },
    {
      key: '2',
      label: (
        <div onClick={() => navigator('/home/article/manage')}>文章管理</div>
      )
    },
    {
      key: '4',
      danger: true,
      label: <div onClick={logout}>退出登录</div>
    }
  ]
  function logout() {
    localStorage.removeItem('token')
    navigator('/login')
  }
  return (
    <Dropdown className={styles.avactor} menu={{ items }}>
      <a onClick={e => e.preventDefault()}>
        <Space className={styles.img}>
          <Avatar size="large" src={user.avactor} />
        </Space>
        <span className={styles.name}>{user.name}</span>
      </a>
    </Dropdown>
  )
}
const mapStateToProps = (state: any) => ({
  user: state.user
})
export default connect(mapStateToProps)(Avactor)
