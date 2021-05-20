class LearnPageView extends mvp.View {
    render(word){
        const sel = el => selector => el.querySelector(selector)
        const el = this._el
        const find = sel(el)
        if(!word) return this.nullWord()
        this.init()
        find('#word').innerText = word.word
        find('#translate__word').innerText = word.translate
    }
    init(){
        if(this.inited) return;
        const el = this._el
        el.innerHTML = `
          <div id='learn__card'>
            <div id="word"></div>
            <div id="translate__word"></div>
            <button class='btn' data-type="remember-btn">Remember</button>
            <button class='btn' data-type="repeat-btn">Repeat</button>
          </div>
        `
        this.inited = true 
    }
    nullWord(){
        const el = this._el
        el.innerHTML = `
          <div id='learn__card'>
            <h2>Your learns vocabulary is empty</h2>
          </div>
        `
        this.inited = false 
    }
}