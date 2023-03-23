import { uploadActor } from '@/server/user'
import { Avatar } from 'antd'
import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { User } from '~/user'
import styles from './index.module.less'
const Info: React.FC<{ user: User }> = ({ user }) => {
  const { avactor, info, name } = user
  const fileRef = useRef<HTMLInputElement>(null)
  const changeAvactor = async () => {
    fileRef.current?.click()
  }
  const upload = async () => {
    const formdata = new FormData()
    formdata.set('file', JSON.stringify(fileRef.current?.files))
    const res = await uploadActor(formdata)
  }
  return (
    <div className={styles.Info}>
      <Avatar
        className={styles.avatar}
        shape="square"
        size={100}
        src={avactor}
        alt={'用户头像'}
        onClick={changeAvactor}
      />
      <div className={styles.name}>用户名：{name}</div>
      <div className={styles.info}>个人信息:{info}</div>
      <input
        ref={fileRef}
        style={{ display: 'none' }}
        accept=".png,.jpg,.jpeg"
        onChange={upload}
        type="file"
      />
    </div>
  )
}
const mapStateToProps = (state: any) => ({
  user: state.user
})
export default connect(mapStateToProps)(Info)
