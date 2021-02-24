const DATABASE_LASER = {
    laser: {
        cost: new Decimal(5000),
        power: (t = 0) => {
            // The unit used is second

            // It has been converted to minute because it's easier to calculate that way

            let m = Math.max(0, t/60)
            let power;

            if (m <= 0.5) {
                power = Math.pow(2 * m, 2);
            } else if (m <= 1) {
                power = 1;
            } else if (m <= 1.5) {
                power = Math.pow(2 * (1.5 - m), 2)
            } else {
                power = Math.min((m - 1.5) / 20, 0.9)
            }

            return Math.max(0, Math.min(1, power)) // 0 <= power <= 1

        },
        effect(g) {
            let base = 1 + this.power(g.laser.time)

            return base
        },
        status: (g) => {
            if (!g.laser.isActive) return "deactivated"

            let m = g.laser.time/60
            if (m <= 0.5) {
                return "charging"
            } else if (m <= 1) {
                return "charged"
            } else if (m <= 1.5) {
                return "overheat"
            } else if (m <= 19.5) {
                return "tuning"
            } else {
                return "stablized"
            }
        }
    }
}
