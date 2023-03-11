import React, { memo } from 'react'
import {
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('系统总览', 'system', <PieChartOutlined />),
  getItem('动态埋点', 'basepoint', <DesktopOutlined />),
  getItem('文章', 'article', <ContainerOutlined />, [
    getItem('写文章', 'article/write'),
    getItem('文章管理', 'article/manage'),
    getItem('富文本编辑器', 'article/editor')
  ]),

  getItem('用户管理', 'sub1', <MailOutlined />, [
    getItem('用户信息', 'user/info'),
    getItem('管理用户', 'user/manage')
  ])
]
const Aside: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const navigator = useNavigate()
  const width = collapsed ? 80 : 200
  return (
    <div className={styles.layout} style={{ width }}>
      <Menu
        className={styles.menu}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        // inlineCollapsed={collapsed}
        items={items}
        onClick={e => navigator(e.key)}
      />
    </div>
  )
}

export default memo(Aside)
