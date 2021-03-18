class NavbarView extends mvp.View {
  render(state){
    let active
    switch(state){
      case 'show':
	active = 'show__page'
	break;
      case 'create':
	active = 'create__page'
	break;
      case 'learn':
        active = 'learn__page'
	break;
      default:
        active = 'info__page'
    }
    this.elems.forEach(el=>el.classList.remove('active'))
    this.elems.find(el=>el.dataset.toOpen === active).classList.add('active')
  }
  init(){
    this.elems = Array.from(this._el.querySelectorAll('.nav__item'))
  }
}
