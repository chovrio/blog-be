import React from 'react'
import { Button, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { getAllArticle } from '@/server/article'

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
        <Button size="small" type="primary" danger>
          删除
        </Button>
      </Space>
    )
  }
]
getAllArticle().then(res => {
  res.result.forEach(item => {
    const obj: DataType = {
      key: item._id,
      name: item.name,
      author: item.author,
      time: item.createTime as unknown as string,
      uptime: item.updateTime as unknown as string,
      tags: item.tags ?? ['无']
    }
    data.push(obj)
  })
})
const data: DataType[] = []
const Manage: React.FC = () => {
  return <Table columns={columns} dataSource={data} />
}

export default Manage
