const ELEMENTS = {
    names: [
        null,
        'H','He','Li','Be','B','C','N','O','F','Ne',
        'Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca',
        'Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn',
        'Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr',
        'Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn',
        'Sb','Te','I','Xe','Cs','Ba','La','Ce','Pr','Nd',
        'Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb',
        'Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg',
        'Tl','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Th',
        'Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm',
        'Md','No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds',
        'Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og'
    ],
    fullNames: [
        null,
        'Hydrogen','Helium','Lithium','Beryllium','Boron','Carbon','Nitrogen','Oxygen','Fluorine','Neon',
        'Sodium','Magnesium','Aluminium','Silicon','Phosphorus','Sulfur','Chlorine','Argon','Potassium','Calcium',
        'Scandium','Titanium','Vanadium','Chromium','Manganese','Iron','Cobalt','Nickel','Copper','Zinc',
        'Gallium','Germanium','Arsenic','Selenium','Bromine','Krypton','Rubidium','Strontium','Yttrium','Zirconium',
        'Niobium','Molybdenum','Technetium','Ruthenium','Rhodium','Palladium','Silver','Cadmium','Indium','Tin',
        'Antimony','Tellurium','Iodine','Xenon','Caesium','Barium','Lanthanum','Cerium','Praseodymium','Neodymium',
        'Promethium','Samarium','Europium','Gadolinium','Terbium','Dysprosium','Holmium','Erbium','Thulium','Ytterbium',
        'Lutetium','Hafnium','Tantalum','Tungsten','Rhenium','Osmium','Iridium','Platinum','Gold','Mercury',
        'Thallium','Lead','Bismuth','Polonium','Astatine','Radon','Francium','Radium','Actinium','Thorium',
        'Protactinium','Uranium','Neptunium','Plutonium','Americium','Curium','Berkelium','Californium','Einsteinium','Fermium',
        'Mendelevium','Nobelium','Lawrencium','Rutherfordium','Dubnium','Seaborgium','Bohrium','Hassium','Meitnerium','Darmstadium',
        'Roeritgenium','Copernicium','Nihonium','Flerovium','Moscovium','Livermorium','Tennessine','Oganesson'
    ],
    canBuy(x) {
        let u = this.upgs[x]
        return player.sn.ions.gte(u.cost)
    },
    buyUpg(x) {

        if (this.canBuy(x)) {
            player.sn.elem.push(x)
            player.sn.ions = player.sn.ions.sub(u.cost)
        }
    },
    upgs: [
        null,
        {
            cost: E(100),
            desc: "Prestige formula is better."
        }
        /*{
            cost: E(1e9),
            effect() {
                let x = E(1)

                return x
            },
            effDesc(x) => formatMult(x)
        } */
    ],

    getUnlLength() {
        let u = 4


        return u
    },
    click(x) {
        player.chosenElem = x
        if (!player.sn.elem.includes(x)) this.buyUpg(x)
    }
}




function getElementName(x) {
    if (x <= 118) return ELEMENTS.fullNames[x]
    let log = Math.floor(Math.log10(x))
    let listF = ["Nil", "Un", "Bi", "Tri", "Quad", "Pent", "Hex", "Sept", "Oct", "Enn"]
    let list = ["nil", "un", "bi", "tri", "quad", "pent", "hex", "sept", "oct", "enn"]
    let r = ""
    for (var i = log; i >= 0; i--) {
        let n = Math.floor(x / Math.pow(10, i)) % 10
        if (r == "") r = listF[n]
        else r += list[n]
        if (i == 0) r += n != 2 && n != 3 ? "ium" : "um"
    }
    return r
}



function hasElement(x) {
    return player.sn.elem.includes(x)
}

function elemEffect(x,def=1) {
    return tmp.elem.effect[x]||def
}

function setupElementsHTML() {
    let elem_table = new Element("elements_table")
    let table = ""
    for (let x = 1; x < ELEMENTS.upgs.length; x++) {
        table += `
        <div onclick="ELEMENTS.click(${x})" id="element_${x}">
        <div style="font-size: 12px;>${x}</div>
        ${getElementName(x)}
        </div>
        `
    }

    elem_table.setHTML(table)

}

function updateElementsHTML() {
    let u = ELEMENTS.upgs[player.elemChosen]
    let res = ''
    if (u.dark) {
        res = 'Dark Shadow'
    } else {
        res = 'Ions'
    }
    tmp.el.elem_ch.setDisplay(tmp.elem.choseElem)
    tmp.el.elem_eff.setDisplay(u.effect && u.effDes)
    tmp.el.elem_eff.setHTML(u.effDesc ? `Currently: ${effDesc(u.effect)}`: ``)
    tmp.el.elem_desc.setHTML(`<b>${ELEMENTS.names[player.elemChosen]}-${player.elemChosen}]</b>${u.desc}`)
    tmp.el.elem_cost.setHTML(
        player.sn.elem.includes(x) ? '' : `Cost: ${format(u.cost)} ${res}`
    )
    for (let x = 1; x < ELEMENTS.upgs.length; x++) {
        tmp.el["element_"+x].setDisplay(tmp.elem.unl_length >= x)
    }
}

function updateElementsTemp() {
    if (!tmp.elem) tmp.elem = {}
    if (!tmp.elem.effect) tmp.elem.effect = []
    let tElem = tmp.elem
    tmp.elem.choseElem = player.chosenElem > 0
    if (!tElem.upg_length) tElem.upg_length = ELEMENTS.upgs.length-1
    for (let x = tElem.upg_length; x >= 1; x--) if (ELEMENTS.upgs[x].effect) {
        tElem.effect[x] = ELEMENTS.upgs[x].effect()
    }

    tElem.unl_length = ELEMENTS.getUnlLength()

}