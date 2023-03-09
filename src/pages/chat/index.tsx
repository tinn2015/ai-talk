import { Component, PropsWithChildren } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import AudioInput from './components/audioInput/audioInput'
import TextInput from './components/textInput/textInput'
import{ChatStoreType} from '@/store/chat'


import './index.scss'

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
  componentDidMount () { 
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  toggleInputType () {
    const {chatStore} = this.props.store
    chatStore.toggleInputType()
  }

  render () {
    const { audioInput, chatList } = this.props.store.chatStore
    console.log('audioInput index', audioInput)
    return (
      <View className='index'>
        <View className='chat-box'>
          {
            chatList.map(chatItem => {
              return <View>{chatItem.content}</View>
            })
          }
        </View>
        <View className='input-box'>
          {audioInput ? <AudioInput toggleInputType={() => {this.toggleInputType()}} /> : <TextInput toggleInputType={() => {this.toggleInputType()}} />}
        </View>
      </View>
    )
  }
}

export default Index
