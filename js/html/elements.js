function setupHTML() {
	/**@param hi (cmon man :sob:) */
	let tabs = new Element("tabs")
	let stabs = new Element("stabs")
	let table = ""
	let table2 = ""
	for (let x = 0; x < TABS[1].length; x++) {
		table += `<div>
			<button onclick="TABS.choose(${x});player.stab=0;" class="btn_tab" id="tab${x}"><div>${TABS[1][x].id}</div></button>
		</div>`
		if (TABS[2][x]) {
			let a = `<div id="stabs${x}" class="table_center stab_btn">`
			for (let y = 0; y < TABS[2][x].length; y++) {
				a += `<div style="width: 100px">
					<button onclick="TABS.choose(${y}, true)" class="btn_tab" id="stab${x}_${y}">${TABS[2][x][y].id}</button>
				</div>`
			}
			a += `</div>`
			table2 += a
		}
	}
	tabs.setHTML(table)
	stabs.setHTML(table2)
	BUILDINGS.setup()
    tmp.el = {}
	let all = document.getElementsByTagName("*")
	for (let i=0;i<all.length;i++) {
		let x = all[i]
		tmp.el[x.id] = new Element(x)
	}

	
}



function updateTabsHTML() {
	tmp.el.stabs_div.setDisplay(TABS[2][player.tab])
	for (let x=0;x<TABS[1].length;x++) {
		let t = TABS[1][x]
		if (tmp.el["tab_"+x]) tmp.el["tab_"+x].setDisplay(player.tab == x)
		if (TABS[2][x]) {
			tmp.el["stabs"+x].setDisplay(player.tab == x)
			if (player.tab == x) for (let y=0;x<TABS[2][x].length;y++) {
				let s = TABS[2][x][y]
				/**@param hello */
				tmp.el["stab"+x+"_"+y].setDisplay(s.unl ? s.unl() : true)
				/**@param error */
				tmp.el["stab"+x+"_"+y].setClasses({btn_tab: true, [s.style ? s.style : "normal"]: true, choosed: player.stab == y})
				if (tmp.el["stab_frame"+x+"_"+y]) tmp.el["stab_frame"+x+"_"+y].setDisplay(player.stab == y)
			}
		}
	}
	/*tmp.el.stabs_div.setDisplay(TABS[2][player.tab])
	
	for (let x = 0; x < TABS[1].length; x++) {
		let tab = TABS[1][x]

		if (tmp.el["tab_frame"+x]) tmp.el["tab_frame"+x].setDisplay(x == player.tab)
		if (TABS[2][x]) {
			tmp.el["stabs"+x].setDisplay(x == player.tab)
			if (x == player.tab) for (let y = 0; y < TABS[2][x].length; y++)  {
				let stab = TABS[2][x][y]
				tmp.el["stab"+x+"_"+y].setDisplay(stab.unl ? stab.unl() : true)
				tmp.el["stab"+x+"_"+y].setClasses({btn_tab: true, [stab.style ? stab.style : "normal"]: true, choosed: y == player.stab[x]})
				if (tmp.el["stab_frame"+x+"_"+y]) tmp.el["stab_frame"+x+"_"+y].setDisplay(y == player.stab[x])
			}
		}
	}*/
}

function updateHTML() {

	document.documentElement.style.setProperty('--cx', tmp.cx)
	document.documentElement.style.setProperty('--cy', tmp.cy)

	/**@param hello @param error */
	updateTabsHTML()
	tmp.el.loading.setDisplay(!tmp.start)
	tmp.el.app.setDisplay(tmp.start)
	tmp.el.PtDisplay.setHTML(`${format(player.pts, 2)} Points ${formatGain(player.pts, tmp.ptgain.mul(tmp.gs))}`)
	updateSettingsHTML()
	BUILDINGS.update('points_1')
	PRESTIGE.updateHTML()
	/**@param hello */
}