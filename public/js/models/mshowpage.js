class ShowPageModel extends mvp.Model {
  constructor(database){
    super({state: 0})
    this.db = database
  }
  getWords(){
    return db.words.toArray()
  }
  emit(){
    const e = new Event(mvp.Model.change)
	  e.words = []
      this.getWords()
	.then(words=>{
	  e.words = words
	  this.dispatchEvent(e)
	}).catch(()=>{this.dispatchEvent(e)})
  }
}
