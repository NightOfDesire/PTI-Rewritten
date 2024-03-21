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
    <br>Essence: ${format(player.essence)} ${formatGain(player.essence, tmp.essenceGain.mul(tmp.gs))}   <br> <br> <br>
    `)
	tmp.el.EssSoft1.setDisplay(player.misc.hEss.gte("e33"))
	tmp.el.EssSoft1.setHTML(`Due to enstable essence, after ${format(FORMS.essence.soft1start())} essence, the gain will be softcapped!`)
	tmp.el.EssSoft2.setDisplay(player.misc.hEss.gte("e363"))
	tmp.el.EssSoft2.setHTML(`Due to excessive strange essence, starting at ${format(FORMS.essence.soft2start())} essence, the gain will be softcapped^2!`)
	tmp.el.PresTab.setDisplay(player.essence.gte(25) || player.pres.unl)
	tmp.el.RankTab.setDisplay(player.misc.hEss.gte(2.5e5))
	tmp.el.Prestige.setHTML(tmp.pres.can?`<i><b>Prestige</b> and reset your essence for <b>Prestige Shards</b></i>`:`<i>Locked.</i>`)
	tmp.el.prespts.setHTML(`
	<br>Prestige Shards: ${format(player.pres.pts)} ${tmp.pres.auto ? formatGain(player.pres.pts, tmp.pres.gain.mul(tmp.gs)) : `(+${format(tmp.pres.gain)})`}
	<br>Effect: ${formatMult(player.pres.pts.pow(1.4).add(1))} Essence
	`)


	updateRanksHTML()
}