import React, { useState } from 'react'
import { Layout } from 'antd'
import Aside from './Aside'
import styles from './index.module.less'
import Logo from './Logo'
import Header from './Header'
import Main from './Main'
const { Sider } = Layout
const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout className={styles.home}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Logo collapsed={collapsed} />
        <Aside collapsed={collapsed} />
      </Sider>
      <Layout className="site-layout">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Main />
      </Layout>
    </Layout>
  )
}
export default Home
