import { Component, PropsWithChildren } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Taro from '@tarojs/taro'

import './index.scss'

type PageStateProps = {

}

interface Index {
  props: PageStateProps;
}

@inject('store')
@observer
class Index extends Component<PropsWithChildren> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  router (type: string) {
    const url = `/pages/${type}/index`
    Taro.navigateTo({
      url,
    })
  }

  render () {
    return (
      <View className='index'>
        <Button onClick={() => this.router('chat')}>开始奇妙的对话之旅</Button>
        <Button onClick={() => this.router('history')}>查看我的历史记录</Button>
      </View>
    )
  }
}

export default Index
