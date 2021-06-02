class ShowPagePresenter extends mvp.Presenter {
  modelHandler(e){
    const query = this.model.showPageQuery() || ''
    this.model.getWordsWithQuery(query).then(words=>{
      this.view.render({words, query})
    }).catch(console.error)
    return {notRender: true}
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
    this.view.on('click', this.createModalByClick.bind(this), false)
    this.view.on('input', e=>{
      if(e.target.id === 'search__words'){
        this.model.showPageQuery(e.target.value)
      }
    })
  }
  async createModalByClick(e){
    let node = null
    if(e.target.dataset.type === 'active-toggle'){
      node = e.target.querySelector('.word')
    } else if(e.target.classList.contains('word')){
      node = e.target
    } else if(e.target.classList.contains('translate__word')){
      node = e.target.parentNode.querySelector('.word')
    }
    if(!node) return;
    
    const deleteWord = modal=>{
      this.model.deleteWord(node.innerText)
      modal.close()
    }
    const addToLearn = (modal)=>{
      this.model.addToLearn(node.innerText)
      modal.close()
    }
    const objWord = await this.model.getWord(node.innerText)
    const modal = createModal({
      title: `Modal`,
      isClosable: true,
      html: `
        <p style="font-size: 1.3em">You can use the word "${objWord.word}" 
        with the translation "${objWord.translate}" to delete or add to teach</p>
      `,
      onClose: m=>setTimeout(()=>m.destroy(), 300),
      buttons: [
        {html: 'Delete', handler: deleteWord}, 
        {html: 'Learning', handler: addToLearn}
      ]
    }) 
    setTimeout(()=>modal.open())
  }
  emit(){
    this.model.emit()
  }
  
}


