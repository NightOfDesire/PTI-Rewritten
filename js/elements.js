function setupHTML() {
	
	let table = ''
	
	//setupModsHTML()

	TAB_TERMINAL.setup()
    tmp.el = {}
	let all = document.getElementsByTagName("*")
	for (let i=0;i<all.length;i++) {
		let x = all[i]
		tmp.el[x.id] = new Element(x)
	}

	
}

function updateHTML() {
	let els = document.getElementsByTagName("*")
	for (let i=0;i<els.length;i++) {
		let el = els[i]
		if (!tmp.el[el.id]) {
			tmp.el[el.id] = new Element(el)
		}

	}
	tmp.el.loading.setDisplay(!tmp.start)
	tmp.el.app.setDisplay(tmp.start)
    pts.updateHTML()
	updateSettingsHTML()
    TABS.update()
    TAB_TERMINAL.refresh()
}