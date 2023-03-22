import React, { Component } from 'react'
import { Tooltip, Icon, Table, Tag, Popconfirm, message } from 'antd'
class TestIndex extends Component {
    constructor(props) {
        super(props)
    }
    state = {}
    confirm = () => {
        message.info('Clicked on Yes.')
    }
    render() {
        const description = 'description'
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age'
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address'
            },
            {
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                render: (_, { tags }) => (
                    <>
                        {tags.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green'
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
                title: 'Action',
                key: 'action',
                render: (_, record) => (
                    <div>
                        <a>Invite {record.name}</a>
                        <a>Delete</a>
                    </div>
                )
            },
            {
                title: '操作',
                key: 'edit',
                render: (_, record) => (
                    <div>
                        <Tooltip title='Delete'>
                            <Popconfirm
                                placement='top'
                                title={'提示'}
                                description={'description'}
                                onConfirm={this.confirm}
                                okText='Yes'
                                cancelText='No'>
                                <Icon type='delete' />
                            </Popconfirm>
                        </Tooltip>
                        <Tooltip title='Edit'>
                            <Icon style={{ marginLeft: '20px' }} type='edit' />
                        </Tooltip>
                    </div>
                )
            }
        ]

        const data = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer']
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser']
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sydney No. 1 Lake Park',
                tags: ['cool', 'teacher']
            }
        ]
        return (
            <div className='base-style'>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}

export default TestIndex
