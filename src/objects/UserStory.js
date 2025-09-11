class UserStory {
    #id;
    #title;
    #description;
    #priority;    // int (1,2,3,...)
    #status;      // ex: "Todo", "In Progress", "Done"
    #storyPoints; // hardness (1,2,3,5,8,...)
    #creationDate;

    constructor(id, title, description, priority = "Medium", storyPoints = 0, status = "Todo") {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#priority = priority;
        this.#storyPoints = storyPoints;
        this.#status = status;

        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        this.#creationDate = `${day}-${month}-${year}`;
    }

    // Getters
    getId() { return this.#id; }
    getTitle() { return this.#title; }
    getDescription() { return this.#description; }
    getPriority() { return this.#priority; }
    getStatus() { return this.#status; }
    getStoryPoints() { return this.#storyPoints; }
    getCreationDate() { return this.#creationDate; }

    // Setters
    setTitle(title) { this.#title = title; }
    setDescription(desc) { this.#description = desc; }
    setPriority(priority) { this.#priority = priority; }
    setStatus(status) { this.#status = status; }
    setStoryPoints(points) { this.#storyPoints = points; }

    isDone() { return this.#status === "Done"; }
}

module.exports = UserStory;
