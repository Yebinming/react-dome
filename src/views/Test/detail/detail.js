import React, { Component } from 'react'
import { Button, Tooltip, Icon, Radio, Form, Input, Select, message, DatePicker, AutoComplete } from 'antd'

import '@/style/view-style/test.scss'

class TestDetail extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        autoCompleteResult: []
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            console.log(fieldsValue)
            if (err) return
            const values = {
                ...fieldsValue,
                'date-picker': fieldsValue['date-picker'] ? fieldsValue['date-picker'].format('YYYY-MM-DD') : ''
            }
            console.log(values)
            message.info('你很棒哦,这么快就填好了!')
        })
    }
    handleWebsiteChange = value => {
        let autoCompleteResult
        if (!value) {
            autoCompleteResult = []
        } else {
            autoCompleteResult = ['@google.com', '@163.com', '@qq.com'].map(domain => `${value}${domain}`)
        }
        this.setState({ autoCompleteResult })
    }
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致!')
        } else {
            callback()
        }
    }
    handleConfirmBlur = e => {
        const { value } = e.target
        this.setState({ confirmDirty: this.state.confirmDirty || !!value })
    }
    componentDidMount() {
        console.log(this.props.form)
    }
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form
        const AutoCompleteOption = AutoComplete.Option

        const formItemLayout = {
            labelCol: {
                xs: { span: 16 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 16 },
                sm: { span: 10 }
            }
        }
        const websiteOptions = this.state.autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ))

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item
                    label={
                        <span>
                            用户名&nbsp;
                            <Tooltip title='可以尽量好听点，真的!'>
                                <Icon type='question-circle-o' />
                            </Tooltip>
                        </span>
                    }>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名' }]
                    })(<Input placeholder='请输入用户名' />)}
                </Form.Item>
                <Form.Item label='性别'>
                    {getFieldDecorator('sex', {
                        rules: [{ required: true, message: '请选择性别' }]
                    })(
                        <Radio.Group>
                            <Radio value='man'>男</Radio>
                            <Radio value='women'>女</Radio>
                            <Radio value='unknow'>不详</Radio>
                        </Radio.Group>
                    )}
                </Form.Item>
                <Form.Item label='出生年月'>
                    {getFieldDecorator('date-picker', {
                        rules: [{ type: 'object', required: true, message: '请选择日期' }]
                    })(<DatePicker style={{ width: '100%' }} placeholder='请选择日期' />)}
                </Form.Item>

                <Form.Item label='邮箱'>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: '请输入正确的邮箱!'
                            },
                            {
                                required: true,
                                message: '请输入邮箱'
                            }
                        ]
                    })(
                        <AutoComplete
                            dataSource={websiteOptions}
                            onChange={this.handleWebsiteChange}
                            placeholder='请输入邮箱'>
                            <Input />
                        </AutoComplete>
                    )}
                </Form.Item>
                <Form.Item label='密码' hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请输入密码!'
                            },
                            {
                                validator: this.validateToNextPassword
                            }
                        ]
                    })(<Input.Password placeholder='请输入密码' />)}
                </Form.Item>
                <Form.Item label='确认密码' hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: '请确认密码!'
                            },
                            {
                                validator: this.compareToFirstPassword
                            }
                        ]
                    })(<Input.Password onBlur={this.handleConfirmBlur} placeholder='请确认密码' />)}
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(TestDetail)
