import { Component, PropsWithChildren } from 'react'
import { View, Button, Text, Input, TaroEvent } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import {ChatStoreType} from '@/store/chat'

import './textInput.scss'

type PageStateProps = {
  store: {
    chatStore: ChatStoreType
  }
  toggleInputType: () => void
}

interface Index {
  props: PageStateProps;
  state: {
    value: string
  }
}

@inject('store')
@observer
class Index extends Component<PageStateProps> {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getInputValue (e:TaroEvent<EventTarget>) {
    const value = e.detail.value
    this.setState({
      value
    })
  }

  textSend () {
    const {value} = this.state
    const { chatStore } = this.props.store
    console.log(value)
    chatStore.getChat(value)
  }

  render () {
    return (
      <View className='index flex'>
        <View onClick={this.props.toggleInputType}>icon</View>
        <View>
          <Input type='text' className='input' onInput={(e) => {this.getInputValue(e)}} />
        </View>
        <Button onClick={() => {this.textSend()}}>发送</Button>
      </View>
    )
  }
}

export default Index
