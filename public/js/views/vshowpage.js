class ShowPageView extends mvp.View {
  isInitHtml = false
  render({words = [], query, notRender}){
    if(notRender) return;
    if(!this.isInitHtml){
      this.initHTML()
    }
    this.print(words, query)
  }
  initHTML(){
    this._el.innerHTML = `
      <input id="search__words" placeholder="Search"></input>
      <ul id="words__list"></ul>
      <h1 id="show__page__message"></h1>
    `
    this.isInitHtml = true
  }
  print(words, query){
    const $list = s('#words__list')
    const $msg = s('#show__page__message')
    $list.innerHTML = ''
    $msg.innerHTML = ''
    s('#search__words').value = query || ''
    if(words.length === 0){
      $msg.innerHTML = 'Your vocabulary is empty'
    } else {
      $list.innerHTML = `${words.map(this.oneToHTML).join('')}`
    }
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
