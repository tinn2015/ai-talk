export default defineAppConfig({
  pages: [
    "pages/home/index",
    "pages/chat/index",
    "pages/find/index",
    "pages/my/index",
  ],
  tabBar: {
    color: "#000000",
    list: [
      {
        pagePath: "pages/home/index",
        text: "首页",
        iconPath: "assets/tabbar/home.png",
        selectedIconPath: "assets/tabbar/home-active.png",
      },
      {
        pagePath: "pages/find/index",
        text: "发现",
        iconPath: "assets/tabbar/find.png",
        selectedIconPath: "assets/tabbar/find-active.png",
      },
      {
        pagePath: "pages/my/index",
        text: "我的",
        iconPath: "assets/tabbar/my.png",
        selectedIconPath: "assets/tabbar/my-active.png",
      },
      // {
      //   pagePath: 'pages/index/index',
      //   text: '33',
      // }
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
