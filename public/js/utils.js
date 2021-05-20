const s = selector=>document.querySelector(selector)
const ss = selector=>document.querySelectorAll(selector)

const rand = (min = 0, max = 0) => !min && !max? Math.random(): min + Math.floor(rand() * (max + 1))