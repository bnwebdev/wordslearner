const s = selector=>document.querySelector(selector)
const ss = selector=>document.querySelectorAll(selector)

const paginator = new Paginator('#pages', {opened: ['create__page']})

paginator.addEventListener('pag#openpage', e=>{
  e.target.pages.filter(p=>p !== e.targetPage)
	        .map(p=>p.id)
		.forEach(e.target.close)
})

const navView = new NavbarView(s('#header__site'))
const navModel = new NavbarModel({state: 'create'})
const navPresenter = new NavbarPresenter(navModel, navView, paginator)


const createPageView = new CreatePageView(s('#create__page'))
const createPageModel = new CreatePageModel({state: {type: 'stable'}})
const createPagePresenter = new CreatePagePresenter(createPageModel, createPageView)

const wordsDBModel = new WordsDBModel(db)
const showPageView = new ShowPageView(s('#show__page'))
const showPagePresenter = new ShowPagePresenter(wordsDBModel, showPageView)

const learnPageView = new LearnPageView(s('#learn__page'))
const learnPageModel = new LearnPageModel({word: null})
const learnPagePresenter = new LearnPagePresenter(learnPageModel, learnPageView)

createPageModel.addEventListener(mvp.Model.change, e=>{
  if(e.target.state().type === 'saved'){
    wordsDBModel.emit()
  }    
})
