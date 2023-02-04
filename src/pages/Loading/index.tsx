import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import styles from './index.module.less'
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 36
    }}
    spin
  />
)

const Loading: React.FC = () => (
  <div className={styles.loading}>
    <Spin indicator={antIcon} />
    <div>加载中.....</div>
  </div>
)

export default Loading
