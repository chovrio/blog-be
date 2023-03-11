import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import styles from './index.module.less'
import { Button, Select, Tag } from 'antd'
import { CustomTagProps } from 'rc-select/lib/BaseSelect'
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
function MyEditor() {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null) // TS 语法
  // const [editor, setEditor] = useState(null)                   // JS 语法

  // 编辑器内容
  const [html, setHtml] = useState('<p>hello</p>')
  const [tags, setTags] = useState<string[]>([])
  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml('<p>hello world</p>')
    }, 1500)
  }, [])
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {} // TS 语法
  // const toolbarConfig = { }                        // JS 语法
  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    // const editorConfig = {                         // JS 语法
    placeholder: '请输入内容...'
  }
  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])
  const publish = () => {
    console.log(html)
  }
  return (
    <>
      <div className={styles.select}>
        <div style={{ width: '100px', color: 'red' }}>选择标签：</div>
        <Select
          className={styles.option}
          mode="multiple"
          showArrow
          tagRender={tagRender}
          defaultValue={[]}
          style={{ width: '100%' }}
          options={options}
          onChange={e => setTags(e)}
        />
      </div>
      <div
        className={styles.editor}
        style={{ border: '1px solid #ccc', zIndex: 100 }}
      >
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={editor => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
      <Button onClick={publish} type="primary">
        提交
      </Button>
    </>
  )
}
export default MyEditor
