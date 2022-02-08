const vscode = require('vscode');
const util = {

  getConfigurationEnable() {
    const config = vscode.workspace.getConfiguration();
    return config.get('binance-price-watch.enable');
  },

  getConfigurationCoin() {
    const config = vscode.workspace.getConfiguration();
    return config.get('binance-price-watch.symbol');
  },

  getConfigurationCoinText() {
    const config = vscode.workspace.getConfiguration();
    return config.get('binance-price-watch.symbolText');
  },

  getConfigurationTime() {
    const config = vscode.workspace.getConfiguration();
    const time = config.get('binance-price-watch.updateInterval')
    return time < 1000 ? 1000 : time;
  },

  getConfigurationBaseURL() {
    const config = vscode.workspace.getConfiguration();
    return config.get('binance-price-watch.url')
  }
}

module.exports = util;