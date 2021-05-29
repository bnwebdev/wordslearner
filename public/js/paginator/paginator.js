'use strict'

class PaginatorEvent extends Event {
  constructor(type, ...args){
    super(`pag#${type}`, ...args)
  }
}

class PageEvent extends PaginatorEvent {
  constructor(type, page, ...args){
    super(`${type}page`, ...args)
    this.targetPage = page
  }
}


class Paginator extends EventTarget {
  constructor(selector, options = {}){
    super()
    const wrapper = this.wrapper = document.querySelector(selector)
    this.init(wrapper, options)
  }
  init(wrapper, {opened = []}){
    const pages = this.pages = Array.from(
        wrapper.querySelectorAll('[data-type=page]')
    )
    pages.forEach(page=>page.classList.add('paginator_hidden__page'))
    opened.forEach(this.open)
  }
  get open(){
    return id=>{
      const page = this.get(id)
      if(!page) return;
      this._open(page)
    }
  }
  get close(){
    return id=>{
      const page = this.get(id)
      if(!page) return;
      this._close(page)
    }
  }
  get toggle(){
    return id=>{
      const page = this.get(id)
      if(!page) return;
      this._toggle(page)   
    }
  }
  get(id){
    return this.pages.find(page=>page.id === id)
  }
  _open(page){
    page.classList.remove('paginator_hidden__page')
    page.classList.add('paginator_open__page')
    this.dispatchEvent(new PageEvent('open', page))
  }
  _close(page){
    page.classList.add('paginator_hidden__page')
    page.classList.remove('paginator_open__page')
    this.dispatchEvent(new PageEvent('close', page))
  }
  _toggle(page){
    if(this.isOpened(page)) {
      this._close(page)
    } else {
      this._open(page)
    }
  }
  isOpened(page){
    return !this.isClosed(page)
  }
  isClosed(page){
    return page.classList.contains('paginator_hidden__page')
  }
}
