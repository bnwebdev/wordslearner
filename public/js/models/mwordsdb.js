const DBSTATE = {
  STABLE: 0,
  UPDATED: 1
}
class WordsDBModel extends mvp.Model {
  constructor(db, state = DBSTATE.STABLE){
    super({state, activeWord: null})
    this.db = db
    this.init()
  }
  emit(){
    const event = new Event(mvp.Model.change)
    event.db = this.db
    this.dispatchEvent(event)
  }
  async deleteWord(word){
    await this.db.words.where({word}).delete()
    await this.db.active.where({word}).delete()
    this.state(DBSTATE.UPDATED)
  }
  init(){
    this.updateActiveWord()
  }
  async updateActiveWord(){
    let words = await this.db.active.toArray()
    if(words.length === 1){
      return this.activeWord(words[0].word);
    }
    words.sort((lhs,rhs)=>{
      return lhs.countRepeat === rhs.countRepeat? 0:
        lhs.countRepeat < rhs.countRepeat? -1: 1
    })
    words = words.filter(w=>w.word !== this.activeWord())
          .filter((w, it, arr)=>arr[0].countRepeat === w.countRepeat)
    
    this.activeWord(words[words.length === 1? 0: rand(words.length - 1)]?.word || null)
  }
  async getActiveWord(){
    let word = this.activeWord()
    return word? await this.db.words.where({word}).first(): null
  }
  async learn(isLearned){
    let word = this.activeWord()
    if(!word) return;
    
    word = await this.db.active.where({word}).first()
    if(isLearned) {
      word.countRepeat++
      await this.db.active.put(word)
    }
    if(word.countRepeat > 4){
      await this.db.active.where(word).delete()
    }
    return this.updateActiveWord()
  }
  async addToLearn(word){
    if(!word) return
    await this.db.active.put({word, countRepeat: 0})
    await this.updateActiveWord()
  }
  async getWord(word){
    return await this.db.words.where({word}).first()
  }
}
