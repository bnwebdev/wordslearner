window.db = new Dexie("words-learner")
db.version(1).stores({
  words: "word,translate,isLearned",
  active: "word,countRepeat"
})
