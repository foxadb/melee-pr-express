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
        return 1 / (1 + Math.pow(10, ((a - b) / 400)));
    }

    updateRank(expected, actual, current) {
        return Math.round(current + this.k * (actual - expected));
    }

    compareAndUpdateRank(actual, player, opponent) {
        var expected = this.getExpected(player, opponent);
        return this.updateRank(expected, actual, player);
    }

}

module.exports = EloRank;