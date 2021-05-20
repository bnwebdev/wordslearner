class ShowPageView extends mvp.View {
  render(words = []){
    this._el.innerHTML = this.toHTML(words)
  }
  toHTML(words){
    let html
    if(words.length === 0){
      html = '<h1>Your vocabulary is empty</h1>'
    } else {
      html = `<ul id="words__list">${words.map(this.oneToHTML).join('')}</ul>`
    }
    return html
  }
  oneToHTML(word){
    return `
      <li class="word__card" data-type="active-toggle" title="${word.description || ''}">
        <div class="word">${word.word}</div>
        <div class="translate__word">${word.translate}</div>
      </li>  
    `
  }
}
