class LearnPagePresenter extends mvp.Presenter {
    modelHandler(e){
        return e.target.word()
    }
    init(){}
}