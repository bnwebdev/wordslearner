const PromiseLoader = (function(IPromise, load){
  return class Promise extends IPromise {
    load(url){
      return this.then(()=>loadscript(url))
    }
  }
})(Promise, loadscript)

function loadscript(path){
  const script = document.createElement('script')
  script.src = path
  return new PromiseLoader((resolve, reject)=>{
    document.body.append(script)
    script.onload = ()=>resolve(script)
    script.onerror = reject
  })
}
