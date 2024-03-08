function setupHTML() {
	
	
	
	
	document.getElementById("test").textContent = "No!"
	//setupResourcesHTML()
	//BUILDINGS.setup()



	tmp.el = {}
	let all = document.getElementsByTagName("*")
	for (let i=0;i<all.length;i++) {
		let x = all[i]
		tmp.el[x.id] = new Element(x)
	}
}
    



/*function navhide(opt) {
	player.options.hidenav[opt] = !player.options.hidenav[opt]
}*/


function updateHTML() {
	

	//updateResourcesHTML()
	//tmp.el.loading.setDisplay(!tmp.start)
	//tmp.el.app.setDisplay(tmp.start)
	//if (hover_tooltip) updateTooltipResHTML()
	//BUILDINGS.update('number_1')
}