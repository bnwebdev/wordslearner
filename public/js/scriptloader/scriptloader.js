function loadscript(path){
  const script = document.createElement('script')
  script.src = path
  const promise = new Promise((resolve, reject)=>{
    document.body.append(script)
    script.onload = ()=>resolve(script)
    script.onerror = reject
  })
  promise.load = function load(path){
    const promise = this.then(()=>loadscript(path))
    promise.load = load
    return promise
  }
  return promise
}
