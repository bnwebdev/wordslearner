class CreatePageModel extends mvp.Model {
  constructor(model){
    const {word, translate, description, state} = model || {}
    super({word, translate, description, state})
  }
}
