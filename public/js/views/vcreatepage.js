class CreatePageView extends mvp.View {
  render({word,translate,state,description}){
    const arr = Array.from(this._el.querySelectorAll('[data-type]'))
    arr.find(el=>'word' ===  el.dataset.type).value = word || ''
    arr.find(el=>'translate' ===  el.dataset.type).value = translate || ''
    arr.find(el=>'description' ===  el.dataset.type).value = description || ''
  }
  init(){
    this._el.innerHTML = `
      <label>Word <input type="text" data-type="word"></label>
      <label>Translate <input type="text" data-type="translate"></label>
      <label>Description <input type="text" data-type="description"></label>
      <button data-type="create-btn">Create</button>
    `
  }
}
