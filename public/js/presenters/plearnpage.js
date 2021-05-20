class LearnPagePresenter extends mvp.Presenter {
    async modelHandler(e){
        this.view.render(await this.model.getActiveWord())
    }
    init(){
        this.view.on('click', e=>{
            if(e.target.dataset.type === 'remember-btn'){
                this.view.learn(true)
                this.model.learn(true)
            } else if(e.target.dataset.type === 'repeat-btn'){
                this.view.learn(false)
                this.model.learn(false)
            }
        })
    }
}