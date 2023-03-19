import { Component, PropsWithChildren } from "react";
import { View, Button, Text } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { getList } from "@/utils/http";

import "./index.scss";

type PageStateProps = {
  store: {
    counterStore: {
      counter: number;
      increment: Function;
      decrement: Function;
      incrementAsync: Function;
    };
  };
};

interface Index {
  props: PageStateProps;
  state: {
    list: FindList[];
  };
}

interface FindList {
  id: string;
  title: string;
  read: number;
}

@inject("store")
@observer
class Index extends Component<PageStateProps> {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  async componentDidMount() {
    const list = await getList();
    this.setState({
      list,
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { list } = this.state;
    return (
      <View className='find'>
        {list.length > 0 &&
          list.map((item: FindList) => {
            return (
              <View className='find-item' key={item.id}>
                {item.title}
              </View>
            );
          })}
      </View>
    );
  }
}

export default Index;
