import React, { useRef, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm' // 划线、表、任务列表和直接url等的语法扩展
import rehypeRaw from 'rehype-raw' // 解析标签，支持html语法
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter' // 代码高亮
//高亮的主题，还有很多别的主题，可以自行选择
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { TextAreaRef } from 'antd/es/input/TextArea'
import styles from './index.module.less'
import { Button, Input, InputRef } from 'antd'
import { connect } from 'react-redux'
import { User } from '~/user'
import { publishArticle } from '@/server/article'
import useHint from '@/hooks/useHint'
const Write: React.FC<{ user: User }> = ({ user }) => {
  const { successMsg, errorMsg, contextHolder } = useHint()
  const parseRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<TextAreaRef>(null)
  const inputRef = useRef<InputRef>(null)
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
        content: text
      })
      if (res && res.code == 200) {
        successMsg('文章上传成功')
      } else {
        errorMsg('文章上传失败')
      }
    }
  }
  return (
    <div className={styles.write}>
      {contextHolder}
      <TextArea
        style={{ resize: 'none' }}
        rows={35}
        className={styles.textarea}
        ref={textRef}
        onKeyUp={input}
      />
      <div ref={parseRef} className={styles.parse}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  // eslint-disable-next-line react/no-children-prop
                  children={String(children).replace(/\n$/, '')}
                  style={tomorrow as any}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
      <Input
        ref={inputRef}
        placeholder="请输入文章标题"
        size="small"
        className={styles.title}
      />
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
