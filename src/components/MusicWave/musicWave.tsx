import { Component, PropsWithChildren } from "react";
import { View, Button, Text, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";

import "./musicWave.scss";

type PageStateProps = {
};

interface Index {
  props: PageStateProps;
}

@inject("store")
@observer
class Index extends Component<PageStateProps> {
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='music-wave flex'>
        <View className='item one music'></View> 
        <View className='item two music'></View>
        <View className='item three music'></View>
        <View className='item four music'></View> 
        <View className='item five music'></View> 
        <View className='item six music'></View> 
        <View className='item seven music'></View>      
      </View>
    );
  }
}

export default Index;
