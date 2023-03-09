import { Component, PropsWithChildren } from "react";
import { Provider } from "mobx-react";
import Taro from "@tarojs/taro";

import counterStore from "./store/counter";
import chatStore from "./store/chat";
import loginStore from "./store/login";

import "./app.scss";
import "./assets/base.scss";

const store = {
  counterStore,
  loginStore,
  chatStore,
};

class App extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  // this.props.children 就是要渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
