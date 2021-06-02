class CreatePageModel extends mvp.Model {
  constructor(model){
    const {word, translate, description, state} = model || {}
    super({word, translate, description, state})
  }
  save(){
    if(!this.word() || !this.translate()){
      this.state({type: 'error', message: 'Word or translate are empty'})
    } else {
      db.words.add({
	word: this.word(), 
	translate: this.translate(),
	description: this.description()
      }).then(()=>setTimeout(()=>this.state({type: 'saved'}),300))
      .catch('ConstraintError', e=>this.state({type: 'error', message: 'This word has already existed'}))
	    .catch(e=>this.state({type: 'error', message: e.message}))
    }
  }
}
