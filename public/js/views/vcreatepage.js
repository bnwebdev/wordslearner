class CreatePageView extends mvp.View {
  render({word,translate,state,description}){
      const arr = Array.from(this._el.querySelectorAll('[data-type]'))
      arr.find(el=>'word' ===  el.dataset.type).value = word || ''
      arr.find(el=>'translate' ===  el.dataset.type).value = translate || ''
      arr.find(el=>'description' ===  el.dataset.type).value = description || ''
      if(!state) return;
      switch(state.type){
      	case 'error':
          this._el.classList.add('error')
	        this._el.classList.remove('success')
          this._el.querySelector('.error__message').innerText = state.message || state.type
          break;
        case 'saved':
          this._el.classList.add('success')
	        this._el.classList.remove('error')
          this._el.querySelector('.success__message').innerText = 'Saved'
          break;
	      case 'creating':
          this._el.classList.add('success')
	        this._el.classList.remove('error')
          this._el.querySelector('.success__message').innerText = 'Saving ...'
          break;
        case 'stable':
          this._el.classList.remove('error')
	        this._el.classList.remove('success')
      }
  }
  init(){
    this._el.innerHTML = `
      <div class='error__message'></div>
      <div class='success__message'></div>
      <label><div class="label-name">Word</div><input type="text" data-type="word"></label>
      <label><div class="label-name">Translate</div><input type="text" data-type="translate"></label>
      <label><div class="label-name">Description</div><input type="text" data-type="description"></label>
      <button data-type="create-btn" class="btn">Create</button>
    `
  }
}
