function setupHTML() {
	
	
	
	
	// document.getElementById("test").textContent = "No!"
	setupResourcesHTML()
	BUILDINGS.setup()



	tmp.el = {}
	let all = document.getElementsByTagName("*")
	for (let i=0;i<all.length;i++) {
		let x = all[i]
		tmp.el[x.id] = new Element(x)
	}
}
    
/*function updateTabsHTML() {
	let s = !player.options.nav_hide[0]
	tmp.el.stabs_div.setDisplay(TABS[2][tmp.tab])
	
	for (let x = 0; x < TABS[1].length; x++) {
		let tab = TABS[1][x]
		if (s) {
			tmp.el["tab"+x].setDisplay(tab.unl ? tab.unl() : true)
			tmp.el["tab"+x].setClasses({btn_tab: true, [tab.style ? tab.style : "normal"]: true, choosed: x == tmp.tab})
		}

		if (tmp.el["tab_frame"+x]) tmp.el["tab_frame"+x].setDisplay(x == tmp.tab)
		if (TABS[2][x] !== undefined) {
			tmp.el["stabs"+x].setDisplay(x == tmp.tab)
			if (x == tmp.tab) for (let y = 0; y < TABS[2][x].length; y++)  {
				//let stab = TABS[2][x][y]
				//tmp.el["stab"+x+"_"+y].setDisplay(stab.unl ? stab.unl() : true)
				//tmp.el["stab"+x+"_"+y].setClasses({btn_tab: true, [stab.style ? stab.style : "normal"]: true, choosed: y == tmp.stab[x]})
				// if (tmp.el["stab_frame"+x+"_"+y]) tmp.el["stab_frame"+x+"_"+y].setDisplay(y == tmp.stab[x])
			}
		}
	}
}




function hideNavigation(i) { player.options.nav_hide[i] = !player.options.nav_hide[i]; updateNavigation() }

function updateNavigation() {
    let ids = [["nav_left_hider","tabs"],["nav_right_hider","resources_table"]]
    let w = 450

    for (i in player.options.nav_hide) {
        let h = player.options.nav_hide[i]

        tmp.el[ids[i][0]].setClasses({toggled: h})
        tmp.el[ids[i][1]].setDisplay(!h)
        if (h) w -= i == 0 ? 198 : 248
    }

    let p = `calc(100% - ${w}px)`

    tmp.el.main_app.changeStyle('width',p)
    tmp.el.nav_btns.changeStyle('width',p)
}*/

function updateHTML() {
	let els = document.getElementsByTagName("*")
	for (let i=0;i<els.length;i++) {
		let el = els[i]
		if (!tmp.el[el.id]) {
			tmp.el[el.id] = new Element(el)
		}

	}
	
	//updateTabsHTML()
	updateResourcesHTML()
	tmp.el.loading.setDisplay(!tmp.start)
	tmp.el.app.setDisplay(tmp.start)
	if (hover_tooltip) updateTooltipResHTML()
	//for (let x = 1; x <= 4; x++) {
        BUILDINGS.update('number_1')
		BUILDINGS.update('number_2')
		BUILDINGS.update('number_3')
		BUILDINGS.update('number_4')
		BUILDINGS.update('number_5')
	//}
	
}