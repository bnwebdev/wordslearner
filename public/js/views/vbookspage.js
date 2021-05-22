class BooksPageView extends mvp.View {
    render({state}){
        if(state === 'not__render') return;
        this.updateHTML(state)
        this.prevState = state
    }
    get el(){ return this._el }
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
            <h2 class="title__book"></h2>
            <div class="statistics">
                <div class="chart__info__book"></div>
                <div class="text__info__book"></div>
            </div>
            <ul class="words__in__book"></ul>
            
        `
    }
    get showBooksTemplateHTML(){
        return `
            <div class="btn" id="add__book">Add book</div>
            <ul id="books__list">
            </ul>
        `
    }


}