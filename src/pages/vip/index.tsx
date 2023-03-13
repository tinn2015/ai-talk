import { Component, PropsWithChildren } from "react";
import { View, Button, Text, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
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

  render() {
    const { myInfo } = this.state;
    const { isLogin, userInfo } = this.props.store.loginStore;
    console.log("myInfo", myInfo);
    return (
      <View className='vip'>
        <View className='block1 flex jc-c'>
          <View className='no-vip'></View>
        </View>
        <View className='block2'>
          <View className='bg'></View>
        </View>
        <View className='block3'></View>
      </View>
    );
  }
}

export default Index;
