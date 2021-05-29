const paginator = new Paginator('#pages', {opened: ['show__page']})
function getAppPaginator(){
  return paginator
}
paginator.addEventListener('pag#openpage', e=>{
  e.target.pages.filter(p=>p !== e.targetPage)
	        .map(p=>p.id)
		.forEach(e.target.close)
})

const navView = new NavbarView(s('#header__site'))
const navModel = new NavbarModel({state: 'show'})
const navPresenter = new NavbarPresenter(navModel, navView, paginator)


const createPageView = new CreatePageView(s('#create__page'))
const createPageModel = new CreatePageModel({state: {type: 'stable'}})
const createPagePresenter = new CreatePagePresenter(createPageModel, createPageView)

const wordsDBModel = new WordsDBModel(db)
const showPageView = new ShowPageView(s('#show__page'))
const showPagePresenter = new ShowPagePresenter(wordsDBModel, showPageView)

const learnPageView = new LearnPageView(s('#learn__page'))
const learnPagePresenter = new LearnPagePresenter(wordsDBModel, learnPageView)

const booksPageView = new BooksPageView(s('#books__page'))
const booksPagePresenter = new BooksPagePresenter(wordsDBModel, booksPageView)

createPageModel.addEventListener(mvp.Model.change, e=>{
  if(e.target.state().type === 'saved'){
    wordsDBModel.emit()
  }    
})
