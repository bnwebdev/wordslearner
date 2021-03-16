class CreatePageView extends mvp.View {
  render({word,translate,state,description}){
    if(!this.isInited){
      this._el.innerHTML = `
        <label>Word <input type="text" value="${word || ""}" data-type="word"></label>
        <label>Translate <input type="text" value="${translate || ""}" data-type="translate"></label>
        <label>Description <input type="text" value="${description || ""}" data-type="description"></label>
        <button data-type="create-btn">Create</button>
      ` 
      this.isInited = true
    } else {
      const arr = Array.from(this._el.querySelectorAll('[data-type]'))
      arr.find(el=>'word' ===  el.dataset.type).value = word || ''
      arr.find(el=>'translate' ===  el.dataset.type).value = translate || ''
      arr.find(el=>'description' ===  el.dataset.type).value = description || ''
    }
     
  }
}
