const vscode = require('vscode');
const util = {
  /**
   * 获取配置文件的开关
   */
  getConfigurationEnable() {
    const config = vscode.workspace.getConfiguration();
    return config.get('binance-price-watch.enable');
  },
  /**
   * 获取配置文件的监听币种
   */
  getConfigurationCoin() {
    const config = vscode.workspace.getConfiguration();
    return config.get('binance-price-watch.symbol');
  },
  /**
   * 获取配置文件的监听币种简称
   */
  getConfigurationCoinText() {
    const config = vscode.workspace.getConfiguration();
    return config.get('binance-price-watch.symbolText');
  },
  /**
   * 获取配置文件的更新时间
   */
  getConfigurationTime() {
    const config = vscode.workspace.getConfiguration();
    return config.get('binance-price-watch.updateInterval');
  }
}

module.exports = util;