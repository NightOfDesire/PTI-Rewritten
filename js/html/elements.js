function setupHTML() {
	/**@param hi (cmon man :sob:) */
	let tabs = new Element("tabs")
	let stabs = new Element("stabs")
	let table = ""
	let table2 = ""
	for (let x = 0; x < TABS[1].length; x++) {
		table += `<div>
			<button onclick="TABS.choose(${x}); player.stab = 0;" class="btn_tab" id="tab${x}"><div>${TABS[1][x].id}</div></button>
		</div>`
		if (TABS[2][x]) {
			let a = `<div id="stabs${x}" class="table_center stab_btn">`
			for (let y = 0; y < TABS[2][x].length; y++) {
				a += `<div style="width: 100px">
					<button onclick="TABS.choose(${y}, true); player.stab = 0;" class="btn_tab" id="stab${x}_${y}">${TABS[2][x][y].id}</button>
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
	tmp.el.stabs_div.setDisplay(TABS[1][player.tab])
	let s = false
	for (let x = 0; x < TABS[1].length; x++) {
		let tab = TABS[1][x]
		if (s) {
			tmp.el["tab"+x].setDisplay(tab.unl ? tab.unl() : true)
			tmp.el["tab"+x].setClasses({btn_tab: true, [tab.style ? tab.style : "normal"]: true, choosed: player.tab == x})
		}

		if (tmp.el["tab_frame"+x]) tmp.el["tab_frame"+x].setDisplay(player.tab == x)
		if (TABS[2][x]) {
			tmp.el["stabs"+x].setDisplay(player.tab == x)
			if (x == player.tab) for (let y = 0; y < TABS[2][x].length; y++)  {
				let stab = TABS[2][x][y]
				tmp.el["stab"+x+"_"+y].setDisplay(stab.unl ? stab.unl() : true)
				tmp.el["stab"+x+"_"+y].setClasses({btn_tab: true, [stab.style ? stab.style : "normal"]: true, choosed: player.stab == y})
				if (tmp.el["stab_frame"+x+"_"+y]) tmp.el["stab_frame"+x+"_"+y].setDisplay(player.tab == x && player.stab == y)
			}
		}
	}
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