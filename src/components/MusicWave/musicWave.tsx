import { Component, PropsWithChildren } from "react";
import { View, Button, Text, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";

import "./musicWave.scss";

type PageStateProps = {
  status: boolean;
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
      <View
        className={`music-wave flex music ai-c jc-c ${
          this.props.status ? "is-cancle" : ""
        }`}
      >
        <View className='item one'></View>
        <View className='item two'></View>
        <View className='item three'></View>
        <View className='item four'></View>
        <View className='item five'></View>
        <View className='item six'></View>
        <View className='item seven'></View>
      </View>
    );
  }
}

export default Index;
