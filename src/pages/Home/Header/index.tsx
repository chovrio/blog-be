import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import Avactor from './Avactor'
import styles from './index.module.less'
const { Header: AntHeader } = Layout
const Header: React.FC<{
  collapsed: boolean
  setCollapsed: (boo: boolean) => void
  name: string
}> = ({ collapsed, setCollapsed, name }) => {
  return (
    <AntHeader
      className={styles.header}
      style={{ padding: 0, backgroundColor: 'white', height: 50 }}
    >
      <div className={styles.btn}>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed)
          }
        )}
        <Avactor />
      </div>
    </AntHeader>
  )
}
const mapStateToProps = (state: any) => ({
  name: state.user.name
})
export default connect(mapStateToProps)(Header)
