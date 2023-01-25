import React from 'react'
import logo from '/vite.svg'
import styles from './index.module.less'
const Logo: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="" />
      {!collapsed && <div className={styles.title}>后台管理系统</div>}
    </div>
  )
}

export default Logo
