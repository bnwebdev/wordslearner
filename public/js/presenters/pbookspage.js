class BooksPagePresenter extends mvp.Presenter {
    init(){
        this.view.on('click', e=>{
            if(e.target.id === 'add__book'){
                this.onAddBooks(e)
            } else if(e.target.classList.contains('book__title')){
                this.onShowInfo(e)
            } else if(e.target.id === 'back__to__show__books__btn'){
                this.model.stateBooksPage('show__books')
            } else if(e.target.classList.contains('words__cutter__nav__item')){
                this.model.stateBooksPage('info__book' + e.target.id.replace('nav__book__info__words__page__', ''))
            } else if(e.target.classList.contains('word__from__book')){
                this.createModalByWord(e.target)
            }
        })
    }
    modelHandler(e){
        const state = e.target.stateBooksPage()
        if(!state) {
            e.target.stateBooksPage('show__books')
        }
        if(state === 'show__books'){
            this.model.getBooks().then(books=>{
                this.view.render({state, books})
            }).catch(console.error)
        } else if(/^info__book/.test(state)){
            this.model.getInfoByBook().then(info=>{
                this.view.render({state, info})
            }).catch(console.error)
        }
        return {state: 'not__render'}
    }
    onAddBooks(e){
        const modal = createModal({
            html: `
                <input type="file">
            `,
            onClosed: m=>{

                m.destroy()
            },
            isClosable: true,
            buttons: [
                { html: `Save`, handler: async m=>{
                    const files = getFiles()
                    const books = []
                    for(let file of files){
                        const words = getWords(await readFileAsText(file))
                        const infowords = await getWordsInfo(words)
                        books.push(
                            {
                                title: file.name,
                                infowords,
                                countWords: words.length
                            }
                        )
                    }
                    await this.model.saveBooks(books)
                    m.close()
                }}
            ]
        })
        function getFiles(){
            return Array.from(modal.target().querySelector('input[type="file"]').files)
        }
        setTimeout(()=>modal.open())
    }
    onShowInfo(e){
        this.model.titleBookForInfo(e.target.innerText)
        this.model.stateBooksPage('info__book0')
    }
    async createModalByWord($wordFromBook){
        const word = $wordFromBook.innerText
        const has = await this.model.hasWord(word)
        const modal = createModal({
            html: word,
            buttons: [has? {
                html: `Add To Learn`, 
                handler: async m=>{
                    await this.model.addToLearn(word)
                    m.close()                    
                }
            }: {
                html: `Create`,
                handler: m=>{
                    this.model.wordCreatePage(word)
                    this.model.translateCreatePage('')
                    this.model.descriptionCreatePage('')
                    navModel.state('create')
                    getAppPaginator().open('create__page')
                    this.model.emit()
                    m.close()
                }
            }],
            onClosed: m=>m.destroy()
        })
        setInterval(()=>modal.open())
    }
}

function getWords(text = ''){
    return Array.from(text.match(/\b[A-Z]+([`'-][A-Z]+)?\b/gi) || []).map(w=>w.toLowerCase())
}
async function getWordsInfo(words = []){
    const wordsinfo = new Map()
    words.forEach((word, it)=>{
        const candidate = wordsinfo.get(word)
        if(candidate){
            candidate.count++
            return
        }
        wordsinfo.set(word, {firstIdx: it, count: 1})
    })
    return Array.from(wordsinfo)
}