import { observable, makeAutoObservable } from "mobx";
import { getChat, audioAsr } from "@/utils/http";

// const chatStore = observable({
//   audioInput: false,
//   chatList: [],
//   toggleInputType () {
//     this.audioInput = !this.audioInput
//   }
// })

export class ChatStore {
  audioInput: boolean;
  chatList: ChatItem[];
  constructor() {
    makeAutoObservable(this);
    this.audioInput = true;
    this.chatList = [];
  }

  toggleInputType() {
    this.audioInput = !this.audioInput;
    console.log(1111);
  }

  async getChat(prompt: string, audioSrc: string) {
    this.chatList.push({
      avatar: "",
      content: prompt,
      isSelf: true,
      timestamp: 12121212,
      audioSrc,
    });
    const res = await getChat({ prompt });
    if (res?.data?.answer) {
      this.chatList.push({
        avatar: "",
        content: res.data.answer,
        isSelf: false,
        timestamp: 12121212,
      });
    } else {
      console.error("getChat error", res);
    }
    console.log(this.chatList);
  }

  async getAudioAsr(tempFilePath: string) {
    const res = await audioAsr({
      filePath: tempFilePath,
    }).catch((err) => {
      console.log("err", err);
    });
    console.log("audioAsr result", res);
    if (res?.data?.text) {
      this.getChat(res.data.text, res.data.text_wav);
    } else {
      console.error("audioAsr error", res);
    }
  }
}

export interface ChatItem {
  avatar: string;
  content: string;
  isSelf: boolean;
  timestamp: number;
  audioSrc?: string;
}

export default new ChatStore();

