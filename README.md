# binance-price-watch
VS Code配置状态栏查看 币安合约 实时最新价格

## 配置:
修改用户配置，添加你所需要监控的币安合约价格
```
  /* 
   * 说明：配置需要监控的数字货币 
   * 规则：btc(比特币) + usdt(交易对) = btcusdt
   */
  "binance-contract-price.symbol": "btcusdt", 
  /* 
   * 说明：配置需要监控的数字货币简称 比特币|btc 或任意字符
   */
  "binance-contract-price.symbolText": "比特币", 
  /*
   * 说明：轮询请求API时间
   * 单位：毫秒
   */
  "binance-contract-price.updateInterval": 3000
```