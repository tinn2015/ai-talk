import { Component, PropsWithChildren } from 'react'
import { View, Button, Text, Input, TaroEvent } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import {ChatStoreType} from '@/store/chat'

import './textInput.scss'

type PageStateProps = {
  store: {
    chatStore: ChatStoreType
  }
}

interface Index {
  props: PageStateProps;
}

@inject('store')
@observer
class Index extends Component<PageStateProps> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getInputValue (e:TaroEvent<EventTarget>) {
    const value = e.detail.value
    console.log(value)
  }

  textSend () {
    console.log(this.props.store.chatStore.inputType)
  }

  render () {
    const {toggleInputType} = this.props
    return (
      <View className='index flex'>
        <View onClick={toggleInputType}>icon</View>
        <View>
          <Input type='text' className='input' onInput={(e) => {this.getInputValue(e)}} />
        </View>
        <Button onClick={() => {this.textSend()}}>发送</Button>
      </View>
    )
  }
}

export default Index
