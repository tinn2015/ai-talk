import { Component, PropsWithChildren } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import loginStore from '@/store/login'

import './index.scss'

type PageStateProps = {

}

interface Index {
  props: PageStateProps;
}

@observer
class Index extends Component<PropsWithChildren> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Button onClick={() => {loginStore.login()}}>login</Button>
        <Button onTouchStart={() => {console.log('touch start')}} onTouchEnd={() => {console.log('touch end')}}>touch</Button>
      </View>
    )
  }
}

export default Index
