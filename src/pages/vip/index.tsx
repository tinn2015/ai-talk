import { Component, PropsWithChildren } from "react";
import { View, Button, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { observer, inject } from "mobx-react";
import { LoginStore } from "@/store/login";
import { createOrder, getMyInfo } from "@/utils/http";

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
      products: { name: string; price: string; product_id: string }[];
    };
    activeProductId: string;
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
      activeProductId: "2",
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

  selectProduct(procduct: { name: string; price: string; product_id: string }) {
    this.setState({
      activeProductId: procduct.product_id,
    });
  }

  pay() {
    const { activeProductId } = this.state;
    createOrder({ product_id: activeProductId }).then((res) => {
      const { prepay_id } = res;
      Taro.requestPayment({
        timeStamp: `${Date.now()}`,
        nonceStr: "",
        package: prepay_id,
        signType: "MD5",
        paySign: "",
        success: (res1) => {
          console.log("success", res1);
        },
        fail: (res2) => {
          console.log("fail", res2);
        },
      });
    });
  }

  render() {
    const { myInfo, activeProductId } = this.state;
    const { isLogin, userInfo } = this.props.store.loginStore;
    const defaultProductClass =
      "product-item flex-shrink-0 flex fd-c ai-c jc-c";
    console.log("myInfo", myInfo);
    return (
      <View className='vip'>
        <View className='block1 flex jc-c'>
          <View className='no-vip'></View>
        </View>
        <View className='block2'>
          <View className='bg flex jc-a ai-fs'>
            <View className='item flex fd-c jc-fs ai-c'>
              <View className='icon1'></View>
              <View className='txt'>新用户赠送 10次/天</View>
            </View>
            <View className='item flex fd-c jc-fs ai-c'>
              <View className='icon2'></View>
              <View className='txt'>无次数限制</View>
            </View>
            <View className='item flex fd-c jc-fs ai-c'>
              <View className='icon3'></View>
              <View className='txt'>高速线路 极速访问</View>
            </View>
          </View>
        </View>
        <View className='block3'>
          <View className='block-title flex jc-fs ai-c'>
            <View className='title-prefix'></View>
            <View className='title'>开通尊贵的皇冠会员</View>
          </View>
          <View className='products flex fw-w jc-sb'>
            {myInfo.products &&
              myInfo.products.map((procduct) => (
                <View
                  onClick={() => {
                    this.selectProduct(procduct);
                  }}
                  className={
                    procduct.product_id === activeProductId
                      ? `active-product ${defaultProductClass}`
                      : defaultProductClass
                  }
                  key={procduct.product_id}
                >
                  <View className='product-name'>{procduct.name}</View>
                  <View className='product-price'>¥{procduct.price}</View>
                </View>
              ))}
          </View>
          <View
            className='pay-btn flex jc-c ai-c'
            onClick={() => {
              this.pay();
            }}
          >
            开通
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
