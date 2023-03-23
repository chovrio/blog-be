import React, { useContext, useEffect, useRef, useState } from 'react'
import type { InputRef } from 'antd'
import { Button, Form, Input, Popconfirm, Table } from 'antd'
import styles from './index.module.less'
import type { FormInstance } from 'antd/es/form'
import { deleteUser, getAllUser } from '@/server/user'
import SmallRegister from './SmlalRegister'
const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface Item {
  key: string
  name: string
  identity: string
  info: string
}

interface EditableRowProps {
  index: number
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof Item
  record: Item
  handleSave: (record: Item) => void
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<InputRef>(null)
  const form = useContext(EditableContext)!
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()

      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

type EditableTableProps = Parameters<typeof Table>[0]

interface DataType {
  key: React.Key
  name: string
  identity: string
  info: string
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

const Manage: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([])
  const [isShow, setIsShow] = useState<boolean>(false)
  const [f5, setF5] = useState<boolean>(false)
  const handleDelete = (key: React.Key, name: string) => {
    const newData = dataSource.filter(item => item.key !== key)
    deleteUser(name)
    setDataSource(newData)
  }
  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean
    dataIndex: string
  })[] = [
    {
      title: '名称',
      dataIndex: 'name',
      width: '20%',
      editable: true
    },
    {
      title: '身份',
      dataIndex: 'identity'
    },
    {
      title: '个人信息',
      dataIndex: 'info'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      // render: (_, record: { key: React.Key }) =>
      render: (_, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="确定删除吗？"
            cancelText="取消"
            okText="确定"
            onConfirm={() => handleDelete(record.key, record.name)}
          >
            <Button type="primary" size="small" danger>
              删除
            </Button>
          </Popconfirm>
        ) : null
    }
  ]
  const handleSave = (row: DataType) => {
    const newData = [...dataSource]
    const index = newData.findIndex(item => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row
    })
    setDataSource(newData)
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }
  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    }
  })
  useEffect(() => {
    getAllUser().then(users => {
      const us: DataType[] = []
      users.result.forEach(user => {
        us.push({
          key: user._id,
          name: user.name,
          identity: user.state === 0 ? '超级管理员' : '普通用户',
          info: user.info
        })
      })
      setDataSource(us)
    })
  }, [f5])
  return (
    <div>
      <Button
        onClick={() => setIsShow(true)}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        新增用户
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
      {isShow && (
        <>
          <SmallRegister f5={f5} setF5={setF5} setIsShow={setIsShow} />
          <div className={styles.shadow}></div>
        </>
      )}
    </div>
  )
}

export default Manage
