import { observable } from 'mobx'

const inputStore = observable({
  audioInput: false,
  toggleInputType () {
    this.audioInput = !this.audioInput
  }
})
 
export default inputStore
