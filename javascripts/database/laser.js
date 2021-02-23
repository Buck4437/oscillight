const DATABASE_LASER = {
    laser: {
        cost: new Decimal(2500),
        power: (t = 0) => {
            // The unit used is second

            // It has been converted to minute because it's easier to calculate that way

            let m = Math.max(0, t/60)
            let power;

            if (m <= 1) {
                power = Math.pow(m, 2);
            } else if (m <= 2) {
                power = Math.pow(2 - m, 2)
            } else {
                power = Math.min((m - 2) / 10, 1.9)
            }

            return Math.max(0, Math.min(1, power)) // 0 <= power <= 1

        },
        state: (g) => {
            let m = g.laser.time
            if (m <= 1) {
                return "Charging"
            } else if (m <= 2) {
                return "Overheat"
            } else if (m <= 40) {
                return "Tuning"
            } else {
                return "Stablized"
            }
        },
        effect: (g) => {

        }
    }
}
