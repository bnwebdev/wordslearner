const DBSTATE = {
  STABLE: 0,
  UPDATED: 1
}
class WordsDBModel extends mvp.Model {
  constructor(db, state = DBSTATE.STABLE){
    super({state})
    this.db = db
  }
  emit(){
    const event = new Event(mvp.Model.change)
    event.db = this.db
    this.dispatchEvent(event)
  }
}
