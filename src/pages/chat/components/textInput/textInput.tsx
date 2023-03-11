import { Component, PropsWithChildren } from "react";
import { View, Button, Text, Input, TaroEvent } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { ChatStoreType } from "@/store/chat";

import "./textInput.scss";

type PageStateProps = {
  store: {
    chatStore: ChatStoreType;
  };
  toggleInputType: () => void;
};

interface Index {
  props: PageStateProps;
  state: {
    value: string;
  };
}

@inject("store")
@observer
class Index extends Component<PageStateProps> {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getInputValue(e: TaroEvent<EventTarget>) {
    const value = e.detail.value;
    this.setState({
      value,
    });
  }

  textSend() {
    const { value } = this.state;
    const { chatStore } = this.props?.store;
    console.log(value);
    chatStore && chatStore.getChat(value);
    this.setState({
      value: "",
    });
  }

  render() {
    const { value } = this.state;
    return (
      <View className='text-input flex jc-c ai-c'>
        <View className='text-icon' onClick={this.props.toggleInputType}></View>
        <View className='text-input-box'>
          <Input
            type='text'
            className='input'
            value={value}
            onInput={(e) => {
              this.getInputValue(e);
            }}
          />
        </View>
        <View
          className='text-send flex jc-c ai-c'
          onClick={() => {
            this.textSend();
          }}
        >
          发送
        </View>
      </View>
    );
  }
}

export default Index;
