import Taro, { Method } from "@tarojs/taro";

interface UploadAudioOptions {
  filePath: string;
  data: Record<string, string>;
}

const baseUrl = "https://api.itso123.com/v2";

// 登录
export const login = (options) => {
  const url = baseUrl + "/chatbot/me/login";
  return _request({ url, method: "POST" }, options);
};

// 完成对话
export const getChat = (options) => {
  const url = baseUrl + "/chatbot/dialog/completions";
  return _request({ url, method: "POST" }, options);
};

// 获取我的信息
export const getMyInfo = (options) => {
  const url = baseUrl + "/chatbot/me/getdata";
  return _request({ url, method: "GET" }, options);
};

// 完成我的历史对话
export const getMyHistory = (options) => {
  const url = baseUrl + "/chatbot/history/getdata";
  return _request({ url, method: "GET" }, options);
};

// 发现对话
export const findChat = (options) => {
  const url = baseUrl + "/chatbot/history/getdata";
  return _request({ url, method: "GET" }, options);
};

// 发现清单
export const getList = (options) => {
  const url = baseUrl + "/chatbot/discovery/getlist";
  return _request({ url, method: "GET" }, options);
};

// 语音识别
export const audioAsr = (options: UploadAudioOptions) => {
  return new Promise((resolve, reject) => {
    const url = baseUrl + "/chatbot/dialog/asr";
    Taro.uploadFile({
      url,
      filePath: options.filePath,
      name: "recfile",
      header: {
        "Content-type": "multiply/form-data",
        Authorization: Taro.getStorageSync("Authorization"),
      },
      // formData: options.data,
      success: (res) => resolve(res),
      fail: (err) => reject(err),
    });
  });
};

function _request(config: { url: string; method: Method }, options: any) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: config.url,
      data: options,
      method: config.method || "GET",
      header: {
        "content-type": "application/json",
        Authorization: Taro.getStorageSync("Authorization"),
      },
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
