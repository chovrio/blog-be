import React, { useEffect, useState } from 'react'
import { Button, Popconfirm, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { deleteArticle, getAllArticle } from '@/server/article'
import { getTime } from '@/utils/getTime'

interface DataType {
  key: string
  name: string
  author: string
  time: string
  uptime: string
  tags: string[]
}

const columns: ColumnsType<DataType> = [
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author'
  },

  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === '无') color = 'red'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    )
  },
  {
    title: '创作时间',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: '更新时间',
    dataIndex: 'uptime',
    key: 'uptime'
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button
          size="small"
          type="primary"
          style={{ backgroundColor: 'green' }}
        >
          阅读
        </Button>
        <Button size="small" type="primary">
          修改
        </Button>
        <Popconfirm
          title="提示"
          cancelText="取消"
          okText="确定"
          description="确定要删除该文章"
          onConfirm={async () => {
            changeData(record.key)
            await deleteArticle(record.key)
          }}
        >
          <Button type="primary" size="small" danger>
            删除
          </Button>
        </Popconfirm>
      </Space>
    )
  }
]
let changeData: (key: string) => void
const Manage: React.FC = () => {
  const [data, setData] = useState<any[]>([])
  changeData = (key: string) => {
    const newArr = data.filter(item => item.key !== key)
    setData(newArr)
  }
  useEffect(() => {
    getAllArticle().then(res => {
      const arr: any = []
      res.result.reverse().forEach(item => {
        const obj: DataType = {
          key: item._id,
          name: item.name,
          author: item.author,
          time: getTime(item.createTime),
          uptime: getTime(item.updateTime),
          tags: item.tags ?? ['无']
        }
        arr.push(obj)
      })
      setData(arr)
    })
  }, [])
  return <Table columns={columns} dataSource={data} />
}

export default Manage
