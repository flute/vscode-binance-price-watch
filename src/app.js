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
        this.API_ADDRESS = '';
        this.init();
        context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => this.handleConfigChange()));
    }
    handleConfigChange() {
        this.timer && clearInterval(this.timer);
        const coin = util.getConfigurationCoin();
        Object.keys(this.statusBarItems).forEach((item) => {
            if (item !== coin) {
                this.deletePrice(item)
            }
        });
        this.init();
    }
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
    deletePrice(symbol){
        this.statusBarItems[symbol].hide();
        this.statusBarItems[symbol].dispose();
        delete this.statusBarItems[symbol];
    }
    createStatusBarItem(text = '') {
        const barItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        barItem.text = text;
        barItem.show();
        return barItem;
    }
    init() {
        const enable = util.getConfigurationEnable()
        if(!enable){
            this.timer && clearInterval(this.timer);
            Object.keys(this.statusBarItems).forEach((item) => {
                this.deletePrice(item)
            })
            return
        }
        this.coin = util.getConfigurationCoin();
        this.updateInterval = util.getConfigurationTime()
        const baseURL = util.getConfigurationBaseURL()
        this.API_ADDRESS = `${baseURL}?symbol=${this.coin.toLowerCase()}`

        this.fetchData();
        this.timer = setInterval(() => {
            this.fetchData();
        }, this.updateInterval);
    }
}
module.exports = App;