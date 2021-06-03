// utils
loadscript('public/js/utils.js')
// CHART
.load('public/js/chart/assignOptions.js')
.load('public/js/chart/chartDB.js')
.load('public/js/chart/point.js')
.load('public/js/chart/draw.js')
.load('public/js/chart/chart.js')
.load('public/js/chart/chartRenderer.js')
.load('public/js/chart/correctorCords.js')
.load('public/js/chart/pointPlace.js')
.load('public/js/chart/default.js')
.load('public/js/chart/axises.js')
// paginator
.load('public/js/paginator/paginator.js')
// initial db point
.load('public/js/initdb.js')
// mvp template
.load('public/js/mvp/mvp.js')
// modal window API
.load('public/js/nmodal/nmodal.js')
// db model
.load('public/js/models/mwordsdb.js')
// create page
.load('public/js/views/vcreatepage.js')
.load('public/js/presenters/pcreatepage.js')
// navbar
.load('public/js/models/mnavbar.js')
.load('public/js/views/vnavbar.js')
.load('public/js/presenters/pnavbar.js')
// showpage
.load('public/js/views/vshowpage.js')
.load('public/js/presenters/pshowpage.js')
// learn page
.load('public/js/presenters/plearnpage.js')
.load('public/js/views/vlearnpage.js')
// books page
.load('public/js/presenters/pbookspage.js')
.load('public/js/views/vbookspage.js')
// main script
.load('public/js/script.js')
.then(()=>console.log(`Scripts are loaded`))
.catch(console.error)
