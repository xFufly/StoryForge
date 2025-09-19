const StoryInstructions = require("./StoryInstructions");
const TestInstructions = require("./TestInstructions");

class UserStory {
    #id;
    #title;
    #description;
    #priority;    // int (1,2,3,...)
    #status;      // ex: "Todo", "In Progress", "Done"
    #storyPoints; // hardness (1,2,3,5,8,...)
    #creationDate;
    #baseInstructions; // instance of StoryInstructions
    #testInstructions; // instance of TestInstructions (ou array)

    constructor(
        id,
        title,
        description,
        priority = "Medium",
        storyPoints = 0,
        status = "Todo",
        creationDate = null,
        baseInstructions = null,
        testInstructions = null
    ) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#priority = priority;
        this.#storyPoints = storyPoints;
        this.#status = status;

        if (creationDate) {
            this.#creationDate = creationDate;
        } else {
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            this.#creationDate = `${day}-${month}-${year}`;
        }

        this.#baseInstructions = baseInstructions;
        this.#testInstructions = testInstructions;
    }

    // Getters
    getId() { return this.#id; }
    getTitle() { return this.#title; }
    getDescription() { return this.#description; }
    getPriority() { return this.#priority; }
    getStatus() { return this.#status; }
    getStoryPoints() { return this.#storyPoints; }
    getCreationDate() { return this.#creationDate; }
    getBaseInstructions() { return this.#baseInstructions; }
    getTestInstructions() { return this.#testInstructions; }

    // Setters
    setTitle(title) { this.#title = title; }
    setDescription(desc) { this.#description = desc; }
    setPriority(priority) { this.#priority = priority; }
    setStatus(status) { this.#status = status; }
    setStoryPoints(points) { this.#storyPoints = points; }
    setBaseInstructions(baseInstructions) { this.#baseInstructions = baseInstructions; }
    setTestInstructions(testInstructions) { this.#testInstructions = testInstructions; }

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            priority: this.#priority,
            status: this.#status,
            storyPoints: this.#storyPoints,
            creationDate: this.#creationDate,
            baseInstructions: this.#baseInstructions ? this.#baseInstructions.toJSON() : null,
            testInstructions: this.#testInstructions ? this.#testInstructions.toJSON() : null
        };
    }

    static fromJSON(json) {
        return new UserStory(
            json.id,
            json.title,
            json.description,
            json.priority,
            json.storyPoints,
            json.status,
            json.creationDate,
            json.baseInstructions ? StoryInstructions.fromJSON(json.baseInstructions) : null,
            json.testInstructions ? TestInstructions.fromJSON(json.testInstructions) : null
        );
    }
}

module.exports = UserStory;
