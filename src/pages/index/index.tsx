import { Component, PropsWithChildren } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import AudioInput from './components/audioInput/audioInput'
import TextInput from './components/textInput/textInput'
import inputStore from '../../store/input'

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

  toggleInputType () {
    inputStore.toggleInputType()
  }

  render () {
    const { audioInput } = inputStore
    return (
      <View className='index'>
        <View className='chat-box'></View>
        <View className='input-box'>
          {audioInput ? <AudioInput toggleInputType={this.toggleInputType} /> : <TextInput toggleInputType={this.toggleInputType} />}
        </View>
      </View>
    )
  }
}

export default Index
