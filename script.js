const db = new Dexie('words-learner-db')
db.version(1).stores({
    words: '++id, &value, *translates'
})