window.db = new Dexie("words-learner")
db.version(2).stores({
  words: "word,translate,isLearned",
  active: "word,countRepeat",
  books: "title, infowords, countWords"
})
