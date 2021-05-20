class ShowPagePresenter extends mvp.Presenter {
  modelHandler(e){
    e.db.words.toArray(words=>this.view.render(words))
    return 'not-render'
  }
  async toggle(word, db){
    return new Promise(async (res, rej)=>{
      try {
        const array = await db.active.where({word}).toArray()
        if(array.length){
          await db.active.where({word}).delete()
        } else {
          await db.active.put({word, countRepeat: 0})
        }
        res()
      } catch(e) {
        console.error(e)
        rej(e)
      }
    })
  }
  init(){
    this.view.on('click', e=>{
      let node = null
      if(e.target.dataset.type === 'active-toggle'){
        node = e.target.querySelector('.word')
      } else if(e.target.classList.contains('word')){
        node = e.target
      } else if(e.target.classList.contains('translate__word')){
        node = e.target.parentNode.querySelector('.word')
      } 
      if(node){
        this.toggleNode(node)
      }
    }, false)
  }
  toggleNode(node){
    this.model.db.words.where({word: node.innerText}).toArray(w=>{
      if(w.length === 0) return;
      this.toggle(w[0].word, this.model.db).then(this.emit.bind(this)).catch(console.error)
    }).catch(console.error)
  }
  emit(){
    this.model.emit()
  }
  
}


