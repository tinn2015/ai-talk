import { Component, PropsWithChildren } from "react";
import { View, Button, Text, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";

import "./index.scss";

type PageStateProps = {};

interface Index {
  props: PageStateProps;
  state: {
    titlePosition: {
      top: number;
      left: number;
      width: number;
      height: number;
      right: number;
    };
  };
}

@inject("store")
@observer
class Index extends Component<PropsWithChildren> {
  constructor(props) {
    super(props);
    this.state = {
      titlePosition: {
        top: 0,
      },
    };
  }
  componentDidMount() {
    const rect = Taro.getMenuButtonBoundingClientRect();
    const { top, width, height, left, right } = rect;
    console.log("mount", rect);
    this.setState({
      titlePosition: {
        top,
        width,
        height,
        left,
        right,
      },
    });
  }

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
    const { titlePosition } = this.state;
    return (
      <View className='home'>
        {/* <Image src='../../assets/robot-bg.png' />  */}
        <View
          className='page-title flex jc-c ai-c'
          style={`height:${titlePosition.height}px; top:${titlePosition.top}px`}
        >
          AI问答机器人
        </View>
        <View className='robot-bg'></View>
        <View className='slogan-box'>
          <View className='box'>
            <View className='title'>更快的问答机器人</View>
            <View className='content'>
              回答你的问题时，返回给你的结果更加迅速，超80%选用此模式
            </View>
          </View>
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
