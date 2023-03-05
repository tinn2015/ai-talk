export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/find/index',
    'pages/my/index',
  ],
  tabBar: {
    color: '#000000',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/tabbar/default.png',
        selectedIconPath: 'assets/tabbar/active.png'
      },
      {
        pagePath: 'pages/find/index',
        text: '发现',
        iconPath: 'assets/tabbar/default.png',
        selectedIconPath: 'assets/tabbar/active.png'
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: 'assets/tabbar/default.png',
        selectedIconPath: 'assets/tabbar/active.png'
      },
      // {
      //   pagePath: 'pages/index/index',
      //   text: '33',
      // }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
