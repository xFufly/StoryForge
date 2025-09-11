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
}

module.exports = Backlog;