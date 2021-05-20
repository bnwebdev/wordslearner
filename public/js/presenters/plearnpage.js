class LearnPagePresenter extends mvp.Presenter {
    modelHandler(e){
        return e.target.word()?.word
    }
    init(){
        this.view.on('click', e=>{
            if(e.target.dataset.type === 'remember-btn'){
                this.model.learn(true)
            } else if(e.target.dataset.type === 'repeat-btn'){
                this.model.learn(false)
            }
        })
    }
}