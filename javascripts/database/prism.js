const DATABASE_PRISM = {
    red: {
        gain(g) {
            if (g.light.lte(1e60)) return new Decimal(0);

            let base = new Decimal(1);

            return base;
        }
    },
    green: {
        gain(g) {
            if (g.light.lte("1e19999")) return new Decimal(0);

            let base = new Decimal(1);

            return base;
        }
    },
    blue: {
        gain(g) {
            if (g.light.lte("1e99999")) return new Decimal(0);

            let base = new Decimal(1);

            return base;
        }
    }
}
