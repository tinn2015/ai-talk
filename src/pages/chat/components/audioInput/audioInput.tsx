import { Component, PropsWithChildren } from "react";
import { View, Button, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { observer, inject } from "mobx-react";
import { ChatStore } from "@/store/chat";
import MusicWave from "@/components/MusicWave/musicWave";

import "./audioInput.scss";

type PageStateProps = {
  store: {
    chatStore: ChatStore;
  };
  toggleInputType: () => void;
};

interface state {
  isTouchStart: boolean;
  recorderManager: Taro.RecorderManager | null;
  isCancle: boolean;
}

@inject("store")
@observer
class Index extends Component<PageStateProps, state> {
  constructor(props) {
    super(props);
    this.state = {
      isTouchStart: true,
      recorderManager: null,
      isCancle: false,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  touchStart(event) {
    console.log("touchstart", event);
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
    const { isTouchStart, isCancle } = this.state;
    return (
      <View className='audio-input flex jc-sb ai-c'>
        <View className='audio-icon' onClick={toggleInputType}></View>
        <View
          className='audio-btn flex jc-c ai-c'
          onTouchStart={(event) => {
            this.touchStart(event);
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
          >
            <View className='bottom-mask flex jc-c ai-c'>
              <View className='voice-icon'></View>
            </View>
            <View className='music-wave-box'>
              <MusicWave status={isCancle}></MusicWave>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Index;
