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
      if(e.target.dataset.type === 'active-toggle'){
        this.model.db.words.where({word: e.target.querySelector('.word').innerText}).toArray(w=>{
          if(w.length === 0) return;
          this.toggle(w[0].word, this.model.db).then(this.emit.bind(this)).catch(console.error)
        }).catch(console.error)
      }
    })
  }
  emit(){
    this.model.emit()
  }
  
}


