import { Component, PropsWithChildren } from "react";
import { View, Button, Text, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";
import { LoginStore } from "@/store/login";
import { getMyInfo } from "@/utils/http";

import "./index.scss";

type PageStateProps = {
  store: {
    loginStore: LoginStore;
  };
};

interface Index {
  props: PageStateProps;
  state: {
    myInfo: {
      expiry: string;
      customer_service_qr: string;
      free_times: number;
      isvip: boolean;
    };
  };
}

@inject("store")
@observer
class Index extends Component<PageStateProps> {
  constructor(props) {
    super(props);
    this.state = {
      myInfo: {
        expiry: "",
        customer_service_qr: "",
        free_times: 10,
        isvip: false,
      },
    };
  }
  async componentDidMount() {
    const myInfo = await getMyInfo();
    myInfo &&
      this.setState({
        myInfo,
      });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  routerToVip() {
    Taro.navigateTo({
      url: "/pages/vip/index",
    });
  }

  render() {
    const { myInfo } = this.state;
    const { isLogin, userInfo } = this.props.store.loginStore;
    console.log("myInfo", myInfo);
    return (
      <View className='my'>
        <View className='userinfo'>
          <View className='flex jc-fs ai-c'>
            <Image className='avatar' src={userInfo.avatarUrl} />
            {myInfo.isvip && <View className='vip-badge'></View>}
            <View className='info'>
              <View className='nickname'>{userInfo.nickName}</View>
              <View className='tip'>
                {myInfo.isvip
                  ? `皇冠会员，无次数限制`
                  : `普通用户，${myInfo.free_times}次/日`}
              </View>
            </View>
          </View>
        </View>
        <View className='vip-block flex jc-c ai-c'>
          <View className='vip-bg'>
            <View className='vip-label'>
              {myInfo.isvip ? `` : `皇冠VIP解锁更多权益`}
            </View>
            {myInfo.isvip ? (
              <View
                className='vip-btn flex jc-c ai-c'
                onClick={() => {
                  this.routerToVip();
                }}
              >
                前往续费
              </View>
            ) : (
              <View
                className='vip-btn flex jc-c ai-c'
                onClick={() => {
                  this.routerToVip();
                }}
              >
                前往开通
              </View>
            )}
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
