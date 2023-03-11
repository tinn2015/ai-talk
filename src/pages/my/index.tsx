import { Component, PropsWithChildren } from "react";
import { View, Button, Text } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { LoginStore } from "@/store/login";

import "./index.scss";

type PageStateProps = {
  store: {
    loginStore: LoginStore;
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

  render() {
    const { isLogin } = this.props.store.loginStore;
    console.log("isLogin", isLogin);
    return (
      <View className='my'>
        <View className='userinfo'>
          {isLogin ? (
            <View>
              <View className='default-avatar'></View>
              <View>username</View>
            </View>
          ) : (
            <View>
              <View className='avatar'></View>
              <View>登录/注册</View>
            </View>
          )}
        </View>
        <View className='vip-block flex jc-c ai-c'>
          <View className='vip-bg'>
            <View className='vip-label'>皇冠VIP解锁更多权益</View>
            <View className='vip-btn flex jc-c ai-c'>前往开通</View>
          </View>
        </View>
        <View className='services flex jc-c'>
          <View className='service-block'>
            <View className='service-title'>服务与工具</View>
            <View className='service-item flex jc-sb ai-c'>
              <View className='flex jc-c ai-c'>
                <View className='service-icon tool1'></View>
                <View className='service-label'>邀请奖励</View>
              </View>
              <View className='service-arrow'></View>
            </View>
            <View className='service-item flex jc-sb ai-c'>
              <View className='flex jc-c ai-c'>
                <View className='service-icon tool2'></View>
                <View className='service-label'>联系客服</View>
              </View>
              <View className='service-arrow'></View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
