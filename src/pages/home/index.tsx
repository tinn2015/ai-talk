import { Component, PropsWithChildren } from "react";
import { View, Button, Text, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui";
import { LoginStore } from "@/store/login";

import "./index.scss";

type PageStateProps = {
  store: {
    loginStore: LoginStore;
  };
};

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
    loginModalOpen: boolean;
  };
}

@inject("store")
@observer
class Index extends Component<PageStateProps> {
  constructor(props) {
    super(props);
    this.state = {
      titlePosition: {
        top: 0,
      },
      loginModalOpen: false,
    };
  }
  componentDidMount() {
    let { loginModalOpen } = this.state;
    const rect = Taro.getMenuButtonBoundingClientRect();
    const { top, width, height, left, right } = rect;
    console.log("mount", rect);
    const userinfo = Taro.getStorageSync("userInfo");
    const Authorization = Taro.getStorageSync("Authorization");
    if (!Authorization || !userinfo) {
      loginModalOpen = true;
    }
    this.setState({
      titlePosition: {
        top,
        width,
        height,
        left,
        right,
      },
      loginModalOpen,
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  async checkLogin() {
    const { loginStore } = this.props.store;
    const res = await loginStore.getUserInfo();
    if (res) {
      this.setState({
        loginModalOpen: false,
      });
    }
    await loginStore.login();
  }

  router(type: string) {
    const url = `/pages/${type}/index`;
    Taro.navigateTo({
      url,
    });
  }

  render() {
    const { titlePosition, loginModalOpen } = this.state;
    return (
      <View className='home'>
        {/* <Image src='../../assets/robot-bg.png' />  */}
        <View
          className='page-title flex jc-c ai-c'
          style={`height:${titlePosition.height}px; top:${titlePosition.top}px`}
        >
          AI???????????????
        </View>
        <View className='robot-bg'></View>
        <View className='slogan-box'>
          <View className='box'>
            <View className='title'>????????????????????????</View>
            <View className='content'>
              ???????????????????????????????????????????????????????????????80%???????????????
            </View>
          </View>
        </View>
        <View className='btns flex fd-c ai-c'>
          <View
            className='to-chat c-fff flex jc-c ai-c'
            onClick={() => this.router("chat")}
          >
            ???????????????????????????
          </View>
          <View className='to-history' onClick={() => this.router("history")}>
            ????????????????????????
          </View>
        </View>
        <AtModal
          isOpened={loginModalOpen}
          // cancelText='??????'
          // confirmText='??????'
          // onClose={this.handleClose}
          // onCancel={this.handleCancel}
          // onConfirm={this.handleConfirm}
          // content='?????????????????????????????????\n\r?????????????????????????????????'
        >
          <AtModalHeader>??????/??????</AtModalHeader>
          <AtModalContent>
            <View
              onClick={() => {
                this.checkLogin();
              }}
            >
              ????????????
            </View>
          </AtModalContent>
        </AtModal>
      </View>
    );
  }
}

export default Index;
