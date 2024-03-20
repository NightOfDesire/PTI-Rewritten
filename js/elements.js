function setupHTML() {
	
	
	
	



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
    tmp.el.Essence.setHTML(`
    <img src="images/essence.png>Essence: ${format(player.essence, 0)} | ${formatGain(player.essence, tmp.essenceGain.mul(tmp.gs))}
    `)
}