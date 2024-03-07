function setupHTML() {
	
	
	
	
	//document.getElementById("test").textContent = "No!"
	setupResourcesHTML()
	

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
	

	tmp.mobile = window.innerWidth < 1200

	 
	if (hover_tooltip) updateTooltipResHTML()
	
	//updateTabs()
	updateResourcesHTML()
	//tmp.el.tab_terminal.setDisplay(!player.options.hidenav[0])
	tmp.el.app.setDisplay(tmp.start)
	tmp.el.loading.setDisplay(!tmp.start)
	//BUILDINGS.update('points_1')
}