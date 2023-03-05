import { Component, PropsWithChildren } from 'react'
import { View, Button, Text, Input } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './textInput.scss'

type PageStateProps = {
  toggleInputType: () => void
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

  render () {
    const {toggleInputType} = this.props
    return (
      <View className='index flex'>
        <View onClick={toggleInputType}>icon</View>
        <View>
          <Input className='input' />
        </View>
      </View>
    )
  }
}

export default Index
