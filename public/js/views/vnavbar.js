class NavbarView extends mvp.View {
  render(state){
    let active = (state || 'show') + '__page'
    this.elems.forEach(el=>el.classList.remove('active'))
    this.elems.find(el=>el.dataset.toOpen === active).classList.add('active')
  }
  init(){
    this.elems = Array.from(this._el.querySelectorAll('.nav__item'))
  }
}
