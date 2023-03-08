import { observable, makeAutoObservable } from 'mobx'

// const chatStore = observable({
//   audioInput: false,
//   chatList: [],
//   toggleInputType () {
//     this.audioInput = !this.audioInput
//   }
// })

class ChatStore {
  audioInput: boolean
  chatList: ChatItem[]
  constructor() {
    makeAutoObservable(this)
    this.audioInput = false
  }

  toggleInputType () {
    this.audioInput = !this.audioInput
  }
}

interface ChatItem {
  avatar: string
}

export default new ChatStore();

export const ChatStoreType =  ChatStore
