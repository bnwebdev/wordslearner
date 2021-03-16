const paginator = new Paginator('#pages', {opened: ['create__page']})
const s = selector=>document.querySelector(selector)
const ss = selector=>document.querySelectorAll(selector)

const createPageView = new CreatePageView(s('#create__page'))
const createPageModel = new CreatePageModel()
const createPagePresenter = new CreatePagePresenter(createPageModel, createPageView)
