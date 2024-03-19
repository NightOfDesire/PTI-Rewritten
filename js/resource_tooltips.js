const TOOLTIP_RES = {
    number: {
        full: "Count",
        desc() {
            let h = `Current count is <b>${format(player.number,0)}</b>.`

           

           

            return h
        },
    },
    rp: {
        full: "Rage Power",
        desc() {
            let h = `<i>
            Count to <b>${format(2.5e6, 1)}</b> to restart for Rage Powers.
            </i>`

            return h
        },
    },
    am: {
        full: "Atom",
        desc() {
            let h = `<i>
            Reach <b>${format(9e18, 0)}</b> to reset restart for Atoms.
            </i>`

            return h
        }
    },
    gamespeed: {
        full: "Gamespeed",
        desc() {
            let h = `<i>Increases the gain of resources</i>`

            return h
        }
    }

}

function updateTooltipResHTML(start=false) {
    for (let id in TOOLTIP_RES) {
        if (!start && hover_tooltip.id !== id+'_tooltip') continue;

        let tr_data = TOOLTIP_RES[id]
        let tr = tmp.el[id+'_tooltip']

        if (tr) tr.setTooltip(`<h3>[ ${tr_data.full} ]</h3>`+(tr_data.desc?"<br class='line'>"+tr_data.desc():""))
    }
}