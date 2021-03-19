class ShowPagePresenter extends mvp.Presenter {
  modelHandler(e){
    e.db.words.toArray(words=>this.view.render(words))
  }
  init(){
  }
  
}
