/*
    A user story has 2 main parts:
    - The description of the story itself (in StoryInstructions.js)
    - The instructions to test the story (in TestInstructions.js)

    This file contains the first part.

    Exemple of a user story:
    As a user, 
    I want to be able to create an account, 
    So that I can access personalized features.
*/

class StoryInstructions {
    #role;        // ex: "user", "admin", "guest"
    #goal;        // ex: "create an account", "reset my password"
    #benefit;     // ex: "access personalized features", "secure my account"

    constructor(role, goal, benefit) {
        this.#role = role;
        this.#goal = goal;
        this.#benefit = benefit;
    }

    // Getters
    getRole() { return this.#role; }
    getGoal() { return this.#goal; }
    getBenefit() { return this.#benefit; }

    toJSON() {
        return {
            role: this.#role,
            goal: this.#goal,
            benefit: this.#benefit
        };
    }

    static fromJSON(json) {
        return new StoryInstruction(json.role, json.goal, json.benefit);
    }
}

module.exports = StoryInstructions;