class BooksPageView extends mvp.View {
    render({state, books, info}){
        if(state === 'not__render') return;
        this.updateHTML(state)
        if(state === 'show__books') this.showBooks(books)
        if(state === 'info__book') this.showInfo(info)
        this.prevState = state
    }
    get el(){ return this._el }
    set el(html){ 
        this.el.innerHTML = html
        return true 
    }
    updateHTML(state){
        if(this.prevState && state === this.prevState) return;
        switch(state){
            case 'info__book':
                this.el = this.infoBookTemplateHTML
                break;
            case 'show__books':
            default:
                this.el = this.showBooksTemplateHTML
        }
    }
    get infoBookTemplateHTML(){
        return `
            <h2 id="back__to__show__books__btn" class="btn">Back</h2>
            <h2 id="title__book"></h2>
            <div id="statistics">
                <div class="chart__info__book"></div>
                <div class="text__info__book"></div>
            </div>
            <ul id="words__cutter"></ul>
            <ul id="words__in__book"></ul>
            
        `
    }
    get showBooksTemplateHTML(){
        return `
            <div class="btn" id="add__book">Add book</div>
            <ul id="books__list">
            </ul>
        `
    }
    showBooks(books){
        const $list = s('#books__list')
        $list.innerHTML = ''
        books.forEach(book=>{
            $list.insertAdjacentHTML('beforeend', `
                <li class='book__item'>
                    <h3 class='book__title'>${book.title}</h3>
                </li>
            `)
        })
    }
    async showInfo(info){
        if(!info) return
        s('#title__book').innerText = info.title
        s('#statistics > .text__info__book').innerHTML = `
            <p>Count words in the book: ${info.countWords}</p>
            <p>Count unique words in the book: ${info.infowords.length}</p>
        `
        const perCount = 1000
        
        const pointsToChart = info.infowords.reduce((total, [_, {firstIdx}])=>{
            const x = Math.floor(firstIdx / perCount)
            if(!total[x]) total[x] = 0
            total[x]++
            return total
        }, [])
        for(let x = 0; x < pointsToChart.length; x++){
            const y = pointsToChart[x] || 0
            pointsToChart[x] = new Point({x, y})
        }

        const maxx = Math.ceil(info.countWords / perCount)
        let maxy = 0
        for(const p of pointsToChart){
            if(p.y > maxy){
                maxy = p.y
            }
        }
        s('#statistics > .chart__info__book').innerHTML = ''
        const chart = new Chart('#statistics > .chart__info__book', {
            width: 400,
            height: 200,
            limits: {
                x: {
                    min: 0,
                    max: maxx
                }, 
                y: {
                    min: 0,
                    max: maxy
                }
            },
            axis: {
                step: {
                    y: {
                        main: Math.ceil(maxy / 10)
                    },
                    x: {
                        main: Math.ceil(maxx / 10)
                    }
                }
            }
        })
        const line = chart.createPointPlace('line', {type: 'text', value: '*'})
        
        pointsToChart.forEach(line.add.bind(line))

        
        const words = s('#words__in__book')
        const html = await this.getInfowordsAsHTML(info.infowords)
        words.innerHTML = html

        this.createPaginatorAndNavbar(words)
    }
    createPaginatorAndNavbar(words){
        const paginator = new Paginator('#words__in__book')
        const pages = Array.from(words.querySelectorAll('[data-type="page"]'))
        const nav = s('#words__cutter')
        pages.forEach(page=>{
            nav.insertAdjacentHTML('beforeend', `
                <li class="words__cutter__nav__item" data-type="page" id="nav__${page.id}">
                    ${page.id.replace('book__info__words__page__', '')}
                </li>
            `)
        })
        const navigator = new Paginator('#words__cutter')
        navigator.addEventListener('pag#openpage', e=>{
            const page = e.targetPage
            if(page.dataset.msg === 'dont__onopen'){
                page.dataset.msg = ''
                return;
            }
            paginator.open(page.id.replace('nav__', ''))

            const pages = e.target.pages
            const idx = pages.indexOf(page)
            let before = pages.slice(0, idx)
            let after = pages.slice(idx + 1)
            const bfSize = before.length
            const afSize = after.length
            after = after.slice(0, bfSize >= 4? 4: 8 - bfSize)
            before = before.slice( afSize >= 4? -4: afSize - 8)

            pages.forEach(p=>p.classList.remove('active'))
            page.classList.add('active')

            
            const toOpen = before.concat(after)
            const toClose = pages.filter(p=>toOpen.indexOf(p) === -1 && p !== page)

            toClose.map(p=>p.id).forEach(e.target.close)
            toOpen.forEach(p=>p.dataset.msg = 'dont__onopen')
            toOpen.map(p=>p.id).forEach(e.target.open)
        })
        
        paginator.addEventListener('pag#openpage', e=>{
            e.target.pages.filter(p=>p !== e.targetPage)
                    .map(p=>p.id)
                .forEach(e.target.close)
        })

        navigator.open('nav__book__info__words__page__0')
        
        this.paginator.fn = e=>{
            navigator.open(e.target.id)
        }
    }
    async getInfowordsAsHTML(infowords){
        return cutArray(infowords.map(([word, infoword])=>{
            return `<li class="word__from__book" data-idx="${infoword.firstIdx}">${word}</li>`
        }), 50).map(arr=>arr.join('')).map((list, it)=>`
            <li data-type="page" id="book__info__words__page__${it}"><ul class="words__list">${list}</ul></li>
        `).join('')
    }
    paginator =  {
        fn: ()=>{}
    }


}