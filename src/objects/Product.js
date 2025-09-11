const Backlog = require("./Backlog");

class Product {
    #name;
    #description;
    #po;
    #sm;
    #devs;
    #sprintDays;
    #backlog;
    #sprints;

    constructor(name, description, po, sm, sprintDays = 15, devs = []) {
        this.#name = name;
        this.#description = description;
        this.#po = po;
        this.#sm = sm;
        this.#sprintDays = sprintDays;
        this.#devs = devs;

        this.#backlog = new Backlog();
        this.#sprints = [];
    }

    // Getters
    getName() { return this.#name; }
    getDescription() { return this.#description; }
    getProductOwner() { return this.#po; }
    getScrumMaster() { return this.#sm; }
    getSprintDays() { return this.#sprintDays; }

    // Backlog 
    getBacklog() { return this.#backlog; }
    addUserStory(story) { this.#backlog.addUserStory(story); }
    getBacklogSize() { return this.#backlog.getUserStoryCount(); }

    // Sprints
    getSprint(id) { return this.#sprints[id]; }
    getLastSprint() { return this.#sprints[this.#sprints.length - 1]; }
    addSprint(sprint) { return this.#sprints.push(sprint); }
    removeSprint(sprint) {
        this.#sprints = this.#sprints.filter(s => s !== sprint);
    }
    getSprintCount() { return this.#sprints.length; }

    // Devs
    addDev(dev) { this.#devs.push(dev); }
    removeDev(dev) { this.#devs = this.#devs.filter(d => d !== dev); }
    getDevCount() { return this.#devs.length; }
    hasDev(dev) { return this.#devs.includes(dev); }
}

module.exports = Product;
