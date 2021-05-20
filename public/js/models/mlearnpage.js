class LearnPageModel extends mvp.Model {
    constructor(db){
        super({word: null})
        this.db = db
        this.init()
    }
    init(){
        this.updateWord()
    }
    async updateWord(){
        const currentWord = this.word()
        let words = await this.db.active.toArray()
        if(words.length > 1){
            words = words.filter(w=>w.word !== currentWord?.word.word)
        }
        let word = null
        if(words.length > 1){
            word = words[rand(words.length - 1)]
        } else if(words.length === 1) {
            word = words[0]
        }
        if(word){
            word.word = (await this.db.words.where({word: word.word}).toArray())[0]
        }
        this.word(word)
    }
    async learn(isLearned){
        const currentWord = this.word()
        if(!currentWord) return
        if(!currentWord.countRepeat){
            currentWord.countRepeat = 0
        }
        if(isLearned){
            currentWord.countRepeat++
        }
        try {
            if(currentWord.countRepeat > 4){
                await this.db.active.where({word: currentWord.word.word}).delete()
            } else {
                await this.db.active.put({word: currentWord.word.word, countRepeat: currentWord.countRepeat})
            }
            this.updateWord()
        } catch (e){
            console.error(e)
        }
        
    }


}