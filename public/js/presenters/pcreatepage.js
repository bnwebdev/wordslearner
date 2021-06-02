class CreatePagePresenter extends mvp.Presenter {
  modelHandler(e){
    return {
	    state: e.target.state(),
	    word: e.target.word(),
	    translate: e.target.translate(),
	    description: e.target.description()
    }
  }
  init(){
    this.view.init()
    this.view.on('click', this.onclick.bind(this))
    this.view.on('input', this.oninput.bind(this))
  }
  oninput(e){
    switch(e.target.dataset.type){
      case 'word':
      case 'translate':
      case 'description':
        this.model[e.target.dataset.type](e.target.value)
        this.model.state({type: 'stable'})
    	break;
    }
  }
  onclick(e){
    if(e.target.dataset.type === 'create-btn'){
      this.model.state({type: 'creating'})
      this.model.save()
    }
  }
}
