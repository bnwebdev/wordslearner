class LearnPageView extends mvp.View {
    render(word){
        if(word instanceof Promise) return;
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
            <div class='btn' data-type="remember-btn">Remember</div>
            <div class='btn' data-type="repeat-btn">Repeat</div>
          </div>
        `
        this.inited = true 
    }
    learn(isLearned){
      this._el.classList.add(isLearned? 'learned': 'forgot')
      setTimeout(e=>{
        this._el.classList.remove(isLearned? 'learned': 'forgot')
      }, 300)
    }
    nullWord(){
        const el = this._el
        el.innerHTML = `
          <div id='learn__card'>
            <h1>Your learns vocabulary is empty!</h1>
          </div>
        `
        this.inited = false 
    }
}