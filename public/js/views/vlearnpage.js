class LearnPageView extends mvp.View {
    render(word){
        const sel = el => selector => el.querySelector(selector)
        const el = this._el
        const find = sel(el)
        if(!word) return this.nullWord()
        this.init()
        find('#word').innerText = word.word
        find("#side__flipped").checked = false
        setTimeout(e=>{
          find('#translate__word').innerText = word.translate
        }, 300)
    }
    init(){
        if(this.inited) return;
        const el = this._el
        el.innerHTML = `
          <div id='learn__card'>
            <input type="checkbox" id="side__flipped" hidden>
            <label for="side__flipped" class="flipped__card">
              <div id="word"></div>
              <div id="translate__word"></div>
            </label>
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
            <h2>Your learns vocabulary is empty!</h2>
          </div>
        `
        this.inited = false 
    }
}