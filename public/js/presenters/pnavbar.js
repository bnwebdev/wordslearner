class NavbarPresenter extends mvp.Presenter {
  constructor(model, view, paginator){
    super(model, view)
    this.paginator = paginator
  }
  modelHandler(e){
    return e.target.state()
  }
  init(){
    this.view.init()
    this.view.on('click', this.onclick.bind(this))
  }
  onclick(e){
    if(e.target.classList.contains('nav__item')){
      this.model.state(e.target.dataset.toOpen.replace('__page', ''))
      this.paginator.open(e.target.dataset.toOpen)
    }
  }
}
