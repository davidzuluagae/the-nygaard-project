let rateLimit = (req, res, next) => {
    new rateLimitter();
    return rateLimitter.processReq() ? next() : res.status(503).end();
};

class rateLimitter {
    constructor(rate = 3000) {
        this.rate = rate;
        this.active = true;
    }

    processReq() {
        if (this.active) {
            this.active = false;
            setTimeout(() => this.active = true, this.rate);
            return true;
        } else {
            return false;
        }
    }
}

module.exports = rateLimit;