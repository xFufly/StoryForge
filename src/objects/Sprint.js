class Sprint {
    #beginDate;
    #backlog;

    constructor(beginDate, backlog = null) {
        this.#beginDate = beginDate;
        this.#backlog = backlog;
    }

    getBeginDate() { return this.#beginDate };
    getBacklog() { return this.#backlog; }

    setBeginDate(date) { this.#beginDate = date; }
    setBacklog(backlog) { this.#backlog = backlog; }
};

module.exports = Sprint;