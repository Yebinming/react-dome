import React, { Component } from 'react'
import { Breadcrumb } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import menu from '../../containers/menu'
class CustomBreadcrumb extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [] // arr={['通用', '按钮']
        }
    }
    componentDidMount() {
        this.toMenu()
        this.props.history.listen((location, action) => {
            this.toMenu()
        })
    }
    // 防止出现内存泄漏的情况
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }
    toMenu() {
        let arr = []
        menu.forEach(v => {
            if (v['subs']) {
                v.subs.forEach(v2 => {
                    let key = '#' + v2.key
                    if (key === window.location.hash) {
                        arr.push(v.title, v2.title)
                    }
                })
            } else {
                let key = '#' + v.key
                if (key === window.location.hash && v.key !== '/index') {
                    arr.push(v.title)
                }
            }
        })
        this.setState({
            list: arr
        })
    }
    render() {
        return (
            <Breadcrumb style={{ marginBottom: 16 }}>
                <Breadcrumb.Item>
                    <Link to='/index'>首页</Link>
                </Breadcrumb.Item>
                {this.state.list &&
                    this.state.list.map(res => {
                        if (typeof res === 'object') {
                            return (
                                <Breadcrumb.Item key={res.path}>
                                    <Link to={res.path}>{res.title}</Link>
                                </Breadcrumb.Item>
                            )
                        } else {
                            return <Breadcrumb.Item key={res}>{res}</Breadcrumb.Item>
                        }
                    })}
            </Breadcrumb>
        )
    }
}

export default withRouter(CustomBreadcrumb)
