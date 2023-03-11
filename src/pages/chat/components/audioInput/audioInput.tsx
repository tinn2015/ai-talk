import { Component, PropsWithChildren } from "react";
import { View, Button, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { observer, inject } from "mobx-react";
import { ChatStoreType } from "@/store/chat";

import "./audioInput.scss";

type PageStateProps = {
  store: {
    chatStore: ChatStoreType;
  };
  toggleInputType: () => void;
};

interface state {
  isTouchStart: boolean;
  recorderManager: Taro.RecorderManager | null;
}

@inject("store")
@observer
class Index extends Component<PageStateProps, state> {
  constructor(props) {
    super(props);
    this.state = {
      isTouchStart: false,
      recorderManager: null,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  touchStart() {
    // this.state.isTouchStart = true
    const recorderManager = Taro.getRecorderManager();
    // 开始录音
    const options = {
      // duration: 10000,
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 48000,
      format: "wav",
    };
    // @ts-ignore
    recorderManager.start(options);
    recorderManager.onStop((res) => {
      console.log("recorder stop", res);
      const { tempFilePath } = res;
      this.props.store.chatStore.getAudioAsr(tempFilePath);
    });
    this.setState({
      recorderManager,
      isTouchStart: true,
    });
  }

  touchEnd() {
    this.state.recorderManager?.stop();
    this.setState({
      recorderManager: null,
      isTouchStart: false,
    });
  }

  render() {
    const { toggleInputType } = this.props;
    const { isTouchStart } = this.state;
    return (
      <View className='audio-input flex jc-sb ai-c'>
        <View className='audio-icon' onClick={toggleInputType}></View>
        <View
          className='audio-btn flex jc-c ai-c'
          onTouchStart={() => {
            this.touchStart();
          }}
          onTouchEnd={() => {
            this.touchEnd();
          }}
        >
          按住说话
        </View>
        <View>{isTouchStart}</View>
        {isTouchStart && (
          <View
            className='audio-mask border-box'
            onTouchEnd={() => {
              this.touchEnd();
            }}
          />
        )}
      </View>
    );
  }
}

export default Index;
