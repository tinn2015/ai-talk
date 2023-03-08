import { Component, PropsWithChildren } from "react";
import { View, Button, Text, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";

import "./index.scss";

type PageStateProps = {};

interface Index {
  props: PageStateProps;
}

@inject("store")
@observer
class Index extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  router(type: string) {
    const url = `/pages/${type}/index`;
    Taro.navigateTo({
      url,
    });
  }

  render() {
    return (
      <View className='home'>
        {/* <Image src='../../assets/robot-bg.png' />  */}
        <View className='robot-bg'></View>
        {/* <View className='mask'></View> */}
        <View className='slogan-box'>
          <View className='box'></View>
        </View>
        <View className='btns flex fd-c ai-c'>
          <View
            className='to-chat c-fff flex jc-c ai-c'
            onClick={() => this.router("chat")}
          >
            开始奇妙的对话之旅
          </View>
          <View className='to-history' onClick={() => this.router("history")}>
            查看我的历史记录
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
