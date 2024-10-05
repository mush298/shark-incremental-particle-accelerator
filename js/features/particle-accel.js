const PARTICLE_ACCELERATOR = [
    {
        curr: "fish",

        req(c) {
            let x = c.mul(5000)

            return x
        },
        percent(c) {
            let x = c.div(5000)

            return x
        },

        effect(p) {
            let x = p.mul(2.5).add(1).mul(getPAEffect(1)).pow(getPAEffect(11))

            return x
        },
        effDesc: x => formatPow(x,3),
    }, {
        curr: "fish",

        req(c) {
            let x = c.pow10().mul(40)

            return x
        },
        percent(c) {
            let x = c.log10().div(40)

            return x
        },

        effect(p) {
            let x = p.add(1).pow(getPAEffect(4))

            return x
        },
        effDesc: x => formatMult(x,3),
    }, {
        curr: "prestige",

        req(c) {
            let x = c.mul(100)

            return x
        },
        percent(c) {
            let x = c.div(100)

            return x
        },

        effect(p) {
            let x = p.mul(24).add(1).pow(getPAEffect(3))

            return x
        },
        effDesc: x => formatMult(x,3),
    }, {
        curr: "prestige",

        req(c) {
            let x = c.pow(3).mul(50)

            return x
        },
        percent(c) {
            let x = c.root(3).div(50)

            return x
        },

        effect(p) {
            let x = p.mul(3).add(1).mul(getPAEffect(6))

            return x
        },
        effDesc: x => formatPow(x,3),
    }, {
        curr: "fish",

        req(c) {
            let x = c.pow10().mul(500)

            return x
        },
        percent(c) {
            let x = c.log10().div(500)

            return x
        },

        effect(p) {
            let x = p.mul(4).add(1).mul(getPAEffect(5))

            return x
        },
        effDesc: x => formatPow(x,3),
    }, {
        curr: "fish",

        req(c) {
            let x = c.pow10().mul(1e5)

            return x
        },
        percent(c) {
            let x = c.log10().div(1e5)

            return x
        },

        effect(p) {
            let x = p.mul(1).add(1).mul(getPAEffect(8))

            return x
        },
        effDesc: x => formatMult(x,3),
    },
    {
        curr: "prestige",

        req(c) {
            let x = c.pow10().mul(63)

            return x
        },
        percent(c) {
            let x = c.log10().div(63)

            return x
        },

        effect(p) {
            let x = p.mul(4).add(1)

            return x
        },
        effDesc: x => formatMult(x,3),
    }, {
        curr: "prestige",

        req(c) {
            let x = c.pow10().mul(75)

            return x
        },
        percent(c) {
            let x = c.log10().div(75)

            return x
        },

        effect(p) {
            let x = p.mul(0.4)

            return x
        },
        effDesc: x => '+'+format(x,3),
    },
    {
        curr: "core",

        req(c) {
            let x = c.pow10()

            return x
        },
        percent(c) {
            let x = c.log10()

            return x
        },

        effect(p) {
            let x = p.mul(49).add(1).mul(getPAEffect(9))

            return x
        },
        effDesc: x => formatMult(x,3),
    }, {
        curr: "core",

        req(c) {
            let x = c.pow10()

            return x
        },
        percent(c) {
            let x = c.log10()

            return x
        },

        effect(p) {
            let x = p.mul(200).add(1)

            return x
        },
        effDesc: x => formatMult(x,3),
    }, {
        curr: "remnants",

        req(c) {
            let x = c.pow10()

            return x
        },
        percent(c) {
            let x = c.log10()

            return x
        },

        effect(p) {
            let x = p.add(1)

            return x
        },
        effDesc: x => "^" + formatPow(x,3),
    }, {
        curr: "remnants",

        req(c) {
            let x = c.pow10()

            return x
        },
        percent(c) {
            let x = c.log10()

            return x
        },

        effect(p) {
            let x = E(10).tetrate(E(2).pow(E(2).pow(p.mul(10))).mul(0.99))

            return x
        },
        effDesc: x => formatPow(x,3),
    },
]

function setupPAHtml() {
    let h = ""

    for (let i = 0; i < PARTICLE_ACCELERATOR.length; i++) {
        var PA = PARTICLE_ACCELERATOR[i]

        h += `
        <div id="particle-accel-${i}-div">
            <button id="particle-accel-${i}-button" class="particle-accel-button" onclick="player.humanoid.particle_accel.active = ${i}"></button>
            <div class="particle-accel-bar">
                <div class="particle-accel-bar-proj" id="pab-${i}-proj"></div>
                <div class="particle-accel-bar-inner" id="pab-${i}-inner"></div>
                <div class="particle-accel-bar-outer" id="pab-${i}-outer">12.3%</div>
            </div>
        </div>
        `
    }

    el('particle-accel-table').innerHTML = h
}

function updatePAHtml() {
    let text = [
        lang_text('particle-accel-boost'),
    ]

    let unl = true
    let bh_unl = player.fish.gte('ee300000')

    el("particle-accel-table").style.display = el_display(unl)
    el("black-hole-button").style.display = el_display(bh_unl)

    if (unl) {
        for (let i = 0; i < PARTICLE_ACCELERATOR.length; i++) {
            var PA = PARTICLE_ACCELERATOR[i], curr = CURRENCIES[PA.curr]
    
            let unl = tmp.partcle_accel_unl > i
    
            el(`particle-accel-${i}-div`).style.display = el_display(unl)
    
            if (!unl) continue
    
            el(`particle-accel-${i}-button`).innerHTML = lang_text('particle-accel-condense',curr.costName) + " " + text[0][i](PA.effDesc(tmp.particle_accel_eff[i]))
            el(`particle-accel-${i}-button`).className = el_classes({ active : player.humanoid.particle_accel.active == i, 'particle-accel-button' : true })
    
            let proj = PA.percent(curr.amount).max(0).min(1), per = player.humanoid.particle_accel.percent[i].max(0).min(1)
    
            el(`pab-${i}-proj`).style.width = proj.toNumber() * 100 + "%"
            el(`pab-${i}-inner`).style.width = per.toNumber() * 100 + "%"
            el(`pab-${i}-outer`).innerHTML = formatPercent(per) + (proj.sub(per).gt(1e-4) ? " (+" + formatPercent(proj.sub(per)) + ")" : "")
        }
    }
}

function updatePATemp() {
    let u = 1 + player.humanoid.forge.level.wormhole

    tmp.partcle_accel_unl = u

    for (let i = 0; i < PARTICLE_ACCELERATOR.length; i++) {
        var PA = PARTICLE_ACCELERATOR[i]

        tmp.particle_accel_eff[i] = PA.effect(i < u ? player.humanoid.particle_accel.percent[i] : E(0))
    }
}

function getPAEffect(i,def=1) { return tmp.particle_accel_eff[i] ?? def }