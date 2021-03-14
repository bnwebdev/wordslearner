function loadscript(path){
  const script = document.createElement('script')
  script.src = path
  const promise = new Promise((resolve, reject)=>{
    document.body.append(script)
    script.onload = ()=>resolve(script)
    script.onerror = reject
  })
  promise.load = function(path){
    this.then(()=>loadscript(path))
  }
  return promise
}
