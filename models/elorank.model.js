class EloRank {

    constructor(k) {
        this.k = k || 32;
    }

    setKFactor(k) {
        this.k = k;
    }

    getKFactor() {
        return this.k;
    }

    getExpected(a, b) {
        const expected = 1 / (1 + Math.pow(10, ((b - a) / 400)));
        return expected;
    }

    updateRank(expected, actual, current) {
        const newRank = Math.round(current + this.k * (actual - expected));
        return newRank;
    }

    compareAndUpdateRank(actual, player, opponent) {
        const expected = this.getExpected(player, opponent);
        return this.updateRank(expected, actual, player);
    }

}

module.exports = EloRank;