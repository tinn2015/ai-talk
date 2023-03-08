import { observable } from "mobx";
import Taro from "@tarojs/taro";
import { login } from "@/utils/http";

const loginStore = observable({
  isLogin: false,
  userInfo: {},
  login() {
    return new Promise((resolve, reject) => {
      Taro.login()
        .then(async (res) => {
          const result = await login({ code: res.code });
					debugger
          if (result.data && result.data.authorization) {
            Taro.setStorageSync("authorization", result.data.authorization);
            resolve(true);
          } else {
            reject(false);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  async getUserInfo() {
    // 获取授权状态
    // const authSetting = await Taro.getSetting();
    Taro.getUserProfile({
			desc: "用于完善会员信息",
			success: (res) => {
				console.log("用户信息", res);
			},
			fail: (err) => {
				console.log("用户信息 err", err);
			},
		});
    // console.log(authSetting);
  },
});

export default loginStore;
