const vscode = require('vscode');
const axios = require('axios');
const util = require('./util');

class App {
    constructor(context){
        this.activateContext = context;
        this.statusBarItems = {};
        this.coin = util.getConfigurationCoin();
        this.updateInterval = util.getConfigurationTime();
        this.timer = null;
        this.API_ADDRESS = ''; // 交易对地址
        this.init();
        context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => this.handleConfigChange()));
    }
    /*
     * 配置文件改变触发
     */
    handleConfigChange() {
        this.timer && clearInterval(this.timer);
        const coin = util.getConfigurationCoin();
        Object.keys(this.statusBarItems).forEach((item) => {
            if (item !== coin) {
                this.statusBarItems[item].hide();
                this.statusBarItems[item].dispose();
                delete this.statusBarItems[item];
            }
        });
        this.init();
    }
    /**
     * 获取接口数据
     */
    fetchData() {
        // @ts-ignore
        axios.get(this.API_ADDRESS)
        .then((res) => {
            const {symbol, price} = res.data
            this.updatePrice(symbol,price)
        }).
        catch((error) => {
            console.error(error);
        });
    }
    updatePrice(symbol,price) {
        const text = util.getConfigurationCoinText()
        const statusBarItemsText = `${text}: ${price}`;
        if (this.statusBarItems[symbol]) {
            this.statusBarItems[symbol].text = statusBarItemsText;
        } else {
            this.statusBarItems[symbol] = this.createStatusBarItem(statusBarItemsText);
        }
    }
    /**
     * 创建statusBar 
     * @param {string} text 
     */
    createStatusBarItem(text = '') {
        const barItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        barItem.text = text;
        barItem.show();
        return barItem;
    }
    /**
     * 动态获取交易所api地址
     */
    watcher(){
        /* 每次init重新更新配置文件的内容 */
        
    }
    init() {
        
        this.coin = util.getConfigurationCoin();
        this.updateInterval = util.getConfigurationTime()
        this.API_ADDRESS = `https://fapi.binance.com/fapi/v1/ticker/price?symbol=${this.coin.toLowerCase()}`

        this.fetchData();
        this.timer = setInterval(() => {
            this.fetchData();
        }, this.updateInterval);
    }
}
module.exports = App;