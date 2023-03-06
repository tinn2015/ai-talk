import { Component, PropsWithChildren } from 'react'
import { Provider } from 'mobx-react'
import Taro from '@tarojs/taro'
import {login} from '@/utils/http'

import counterStore from './store/counter'

import './app.scss'
import './assets/base.scss'

const store = {
  counterStore
}

class App extends Component<PropsWithChildren> {
  componentDidMount () {
    Taro.login().then((res) => {
      console.log(res)
      login({code: res.code})
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  // this.props.children 就是要渲染的页面
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
