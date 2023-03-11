import { Component, PropsWithChildren } from "react";
import { View, Button, Text, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import AudioInput from "./components/audioInput/audioInput";
import TextInput from "./components/textInput/textInput";
import { ChatStoreType, ChatItem } from "@/store/chat";

import "./index.scss";

type PageStateProps = {
  store: {
    chatStore: ChatStoreType;
  };
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

  toggleInputType() {
    const { chatStore } = this.props.store;
    chatStore.toggleInputType();
  }

  getChatItem(chatItem: ChatItem) {
    return (
      <View
        className={
          chatItem.isSelf
            ? `flex fd-rr jc-fs ai-fs chat-item`
            : ` flex jc-fe ai-fs chat-item`
        }
      >
        <Image
          className='chat-avatar'
          src='../../assets/images/my-avatar.png'
        />
        {/* <View
          className='chat-avatar'
          style='background-image: url(../../assets/images/my-avatar.png)'
        ></View> */}
        <View
          className={
            chatItem.isSelf
              ? "chat-content-self mr16"
              : "chat-content-robot ml16"
          }
        >
          {chatItem.content}
        </View>
      </View>
    );
  }

  render() {
    const { audioInput, chatList } = this.props.store.chatStore;
    console.log("audioInput index", audioInput);
    return (
      <View className='index'>
        <View className='chat-box'>
          {chatList.map((chatItem) => {
            return this.getChatItem(chatItem);
          })}
        </View>
        <View className='input-box'>
          {audioInput ? (
            <AudioInput
              toggleInputType={() => {
                this.toggleInputType();
              }}
              store={{
                chatStore: this.props.store.chatStore,
              }}
            />
          ) : (
            <TextInput
              toggleInputType={() => {
                this.toggleInputType();
              }}
              store={{
                chatStore: this.props.store.chatStore,
              }}
            />
          )}
        </View>
      </View>
    );
  }
}

export default Index;
