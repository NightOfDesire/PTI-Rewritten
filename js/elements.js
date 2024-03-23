function setupHTML() {
	
	let table = ''
	
	
	//setupModsHTML()

	TAB_TERMINAL.setup()
	let rank_table = new Element('rank_table')
	for (let i = 0; i < RANKS.names.length; i++) {
		let type = RANKS.names[i]
		table += `
		<div id="${type_div}">
		<span id="${type}" class="charged_text"></div>
		<p class="line"></button>
		<button id="${type}_btn" onclick="RANKS.reset('${type}')" class="btn" style="min-width: 250px; min-height: 130px;">
		<span id="${type}_msg">Reset your progress, but ${type} up for a powerful boost.</span>
		<span id="${type}_desc"></span>
		</button>
		</div>
		`
	}
	/*for (let x = 0; x < RANKS.names.length; x++) {
		let rn = RANKS.names[x]
		table += `<div style="width: 300px" id="ranks_div_${x}">
			<button id="ranks_auto_${x}" class="btn" style="width: 80px;" onclick="RANKS.autoSwitch('${rn}')">OFF</button>
			<span id="ranks_scale_${x}""></span>${RANKS.fullNames[x]} <h4 id="ranks_amt_${x}">X</h4><br><br>
			<button onclick="RANKS.reset('${rn}')" class="btn reset" id="ranks_${x}">
				Reset your ${x>0?RANKS.fullNames[x-1]+"s":'mass and upgrades'}, but ${RANKS.fullNames[x]} up.<span id="ranks_desc_${x}"></span><br>
				Req: <span id="ranks_req_${x}">X</span>
			</button>
		</div>`
	}*/
	rank_table.setHTML(table)
	table = ''
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
	//updateModsHTML()
	ABYSS.update()
	tmp.el.loading.setDisplay(!tmp.start)
	tmp.el.app.setDisplay(tmp.start)
    tmp.el.Essence.setHTML(`
    <br>Essence: ${format(player.essence)} ${formatGain(player.essence, tmp.essenceGain.mul(tmp.gs))}   <br> <br> <br>
    `)
	tmp.el.Prestige.setDisplay(!tmp.pres.auto)
	tmp.el.EssSoft1.setDisplay(player.misc.hEss.gte("e33"))
	tmp.el.EssSoft1.setHTML(`Due to unstable essence, after ${format(FORMS.essence.soft1start())} essence, the gain will be softcapped!<br>`)
	tmp.el.EssSoft2.setDisplay(player.misc.hEss.gte("e363"))




	tmp.el.EssSoft2.setHTML(`Due to excessive strange essence, starting at ${format(FORMS.essence.soft2start())} essence, the gain will be softcapped^2!<br>`)
	tmp.el.Prestige.setHTML(tmp.pres.can?`<i><b>Prestige</b> and reset your essence for <b>Prestige Shards</b></i>`:`<i>Locked.</i>`)
	tmp.el.prespts.setHTML(`
	<br>Prestige Shards: ${format(player.pres.pts)} ${tmp.pres.auto ? formatGain(player.pres.pts, tmp.pres.gain.mul(tmp.gs)) : `(+${format(tmp.pres.gain)})`}
	<br>Effect: ${formatMult(FORMS.pres.effect())} Essence
	`)
	//if (player.misc.hEss.gte('1e100')) player.MODIFIERS.unl = true

	if (player.tab == "RankTab") updateRanksHTML()
	if (player.tab == "EclipseTab") updateEclipseHTML()
	TABS.update()
	TAB_TERMINAL.refresh()
	updateSettingsHTML()
}