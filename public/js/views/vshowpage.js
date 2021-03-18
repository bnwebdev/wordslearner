class ShowPageView extends mvp.View {
  render(words = []){
    this._el.innerHTML = this.toHTML(words)
  }
  toHTML(words){
    let html
    if(words.length === 0){
      html = '<h1>Your vocabulary is empty'
    } else {
      html = words.map(this.oneToHTML).join('')
    }
    return html
  }
  oneToHTML(word){
    return `
      <dt>${word.word}</dt>
      <dd title="${word.description || ''}">${word.translate}</dd>
    `
  }
}
