class Backlog {

    #creationDate;
    #lastVersionDate;
    #version;
    #userStories;

    updateDate() {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        this.#lastVersionDate = `${day}-${month}-${year}`;
        this.#userStories = [];
    }

    constructor() {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        this.#creationDate = `${day}-${month}-${year}`;
        this.#lastVersionDate = this.#creationDate;
        this.#version = 0;
    }

    // Getters
    getCreationDate() { return this.#creationDate; }
    getLastVesionDate() { return this.#lastVersionDate; }
    getVersion() { return this.#version; }

    getUserStory(id) { return this.#userStories[id]; }
    getLastUserStory() { return this.#userStories[this.#userStories.length - 1]; }
    addUserStory(userStory) { 
        this.#userStories.push(userStory);
        this.updateDate();
    }
    getUserStoryCount() { return this.#userStories.length; }

    updateVersion() {
        this.#version++;
        this.updateDate();
    }

    toJSON() {
        return {
            creationDate: this.#creationDate,
            lastVersionDate: this.#lastVersionDate,
            version: this.#version,
            userStories: this.#userStories ? this.#userStories.map(s => s.toJSON()) : []
        };
    }
    
    static fromJSON(json) {
        const backlog = new Backlog();
        backlog.#creationDate = json.creationDate;
        backlog.#lastVersionDate = json.lastVersionDate;
        backlog.#version = json.version;
        backlog.#userStories = json.userStories.map(s => UserStory.fromJSON(s));
        return backlog;
    }
}

module.exports = Backlog;