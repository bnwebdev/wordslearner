class InfoPageView extends mvp.View {
    render(){
        if(this.isInitHTML) return;
        this._el.innerHTML = `
            <p>This app can help you with learning English.</p>
            <p>You may add any book in txt-format and work with words:
                <ul>
                    <li>Add word with translate</li>
                    <li>Look how difficult for reading this book on <span title="Chart shows a count new words per thousand words">chart</span></li>
                    <li>Learn a new word with card</li>
                </ul>
            </p>
            <p>If one hard work, one will shine</p>
        `
        this.isInitHTML = true
    }
    isInitHTML = false
}