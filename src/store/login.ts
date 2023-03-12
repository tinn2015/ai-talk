import { makeAutoObservable } from "mobx";
import Taro from "@tarojs/taro";

import { login } from "@/utils/http";

export class LoginStore {
  isLogin: boolean;
  userInfo: {
    avatarUrl: string;
    nickName: string;
  };
  constructor() {
    makeAutoObservable(this);
    this.isLogin = false;
  }
  login() {
    return new Promise((resolve, reject) => {
      Taro.login()
        .then(async (res) => {
          const result = await login({ code: res.code });
          if (result.data && result.data.authorization) {
            Taro.setStorageSync("Authorization", result.data.authorization);
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
  }
  async getUserInfo() {
    return new Promise((resolve, reject) => {
      // 获取授权状态
      Taro.getUserProfile({
        desc: "用于完善会员信息",
        success: (res) => {
          console.log("用户信息", res);
          this.userInfo = res.userInfo;
          Taro.setStorageSync("userInfo", res.userInfo);
          resolve(true);
        },
        fail: (err) => {
          console.log("用户信息 err", err);
          reject(false);
        },
      });
    });
    // console.log(authSetting);
  }
}

export default new LoginStore();
