import React, { useCallback, useRef, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import type { TextAreaRef } from 'antd/es/input/TextArea'
import type { InputRef } from 'antd'
import styles from './index.module.less'
import { Button, Input } from 'antd'
import { connect } from 'react-redux'
import 'github-markdown-css'
import type { User } from '~/user'
import { publishArticle } from '@/server/article'
import useHint from '@/hooks/useHint'
import { Select, Tag } from 'antd'
import type { CustomTagProps } from 'rc-select/lib/BaseSelect'
import MarkDown from '../components/MarkDown'
const options = [
  { value: 'life' },
  { value: 'code' },
  { value: '心得' },
  { value: '想法?' }
]

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props
  const colors = ['gold', 'lime', 'green', 'cyan']
  const index = options.findIndex(item => item.value === value)
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    <Tag
      color={colors[index]}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  )
}
const Write: React.FC<{ user: User }> = ({ user }) => {
  const { errorMsg } = useHint()
  const parseRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<TextAreaRef>(null)
  const inputRef = useRef<InputRef>(null)
  const [tags, setTags] = useState<string[]>([])
  const [text, setText] = useState<string>('')
  const input = () => {
    if (parseRef.current) {
      setText(textRef.current?.resizableTextArea?.textArea.value || '')
    }
  }
  const publish = async () => {
    if (text.length === 0) {
      errorMsg('文章得有内容')
    } else if (!inputRef.current?.input?.value) {
      errorMsg('请输入文章标题')
    } else {
      const res = await publishArticle({
        title: inputRef.current.input.value,
        content: text,
        tags
      })
      if (res && res.code == 200) {
        if (textRef.current?.resizableTextArea?.textArea.value) {
          textRef.current.resizableTextArea.textArea.value = ''
        }
        inputRef.current.input.value = ''
      }
    }
  }
  return (
    <div className={styles.write}>
      {/* <MyEditor /> */}
      <TextArea
        style={{ resize: 'none' }}
        rows={35}
        className={styles.textarea}
        ref={textRef}
        onKeyUp={input}
      />
      <div ref={parseRef} className={styles.parse}>
        <MarkDown text={text} />
      </div>
      <Input
        ref={inputRef}
        placeholder="请输入文章标题"
        size="small"
        className={styles.title}
      />
      <div className={styles.select}>
        <div style={{ width: '100px', color: 'red' }}>选择标签：</div>
        <Select
          mode="multiple"
          showArrow
          tagRender={tagRender}
          defaultValue={[]}
          style={{ width: '100%' }}
          options={options}
          onChange={e => setTags(e)}
        />
      </div>
      <Button onClick={publish} className={styles.btn} type="primary">
        发布
      </Button>
    </div>
  )
}
const mapStateToProps = (state: any) => ({
  user: state.user
})
export default connect(mapStateToProps)(Write)
