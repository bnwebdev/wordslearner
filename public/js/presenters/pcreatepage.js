class CreatePagePresenter extends mvp.Presenter {
  modelHandler(e){
    return {
	    state: e.target.stateCreatePage(),
	    word: e.target.wordCreatePage(),
	    translate: e.target.translateCreatePage(),
	    description: e.target.descriptionCreatePage(),
      isAddToLearn: e.target.isAddToLearnCreatePage()
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
        this.model[e.target.dataset.type + 'CreatePage'](e.target.value)
        this.model.stateCreatePage({type: 'stable'})
        break;
      case 'add-to-learn':
        this.model.isAddToLearnCreatePage(!this.model.isAddToLearnCreatePage())
    	break;
    }
  }
  onclick(e){
    if(e.target.dataset.type === 'create-btn'){
      this.model.stateCreatePage({type: 'creating'})
      this.model.saveCreatePage()
    }
  }
}
