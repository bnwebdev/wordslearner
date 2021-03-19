class ShowPageView extends mvp.View {
  render(words = []){
    this._el.innerHTML = this.toHTML(words)
  }
  toHTML(words){
    let html
    if(words.length === 0){
      html = '<h1>Your vocabulary is empty</h1>'
    } else {
      html = words.map(this.oneToHTML).join('')
    }
    return html
  }
  oneToHTML(word){
    return `
      <li class="word__card" title="${word.description || ''}">
        <div>${word.word}</div>
        <div>${word.translate}</div>
      </li>  
    `
  }
}
