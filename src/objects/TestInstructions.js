/*
    A user story has 2 main parts:
    - The description of the story itself (in StoryInstructions.js)
    - The instructions to test the story (in TestInstructions.js)

    This file contains the second part.

    Exemple of test instructions for the user story:
    Given ...,
    When ...,
    And that ...,
    But ...
    Then ...,
    And ....
*/

class TestInstructions {
    #given;  // preconditions
    #when;   // actions
    #and;    // additional conditions or actions, array of strings
    #but;    // exceptions or alternative conditions
    #then;   // expected outcomes
    #andThen; // additional expected outcomes, array of strings

    constructor(given, when, and, but, then, andThen) {
        this.#given = given;
        this.#when = when;
        this.#and = and;
        this.#but = but;
        this.#then = then;
        this.#andThen = andThen;
    }

    // Getters
    getGiven() { return this.#given; }
    getWhen() { return this.#when; }
    getAnd() { return this.#and; }
    getBut() { return this.#but; }
    getThen() { return this.#then; }
    getAndThen() { return this.#andThen; }

    toJSON() {
        return {
            given: this.#given,
            when: this.#when,
            and: this.#and,
            but: this.#but,
            then: this.#then,
            andThen: this.#andThen
        };
    }

    static fromJSON(json) {
        return new TestInstructions(json.given, json.when, json.and, json.but, json.then, json.andThen);
    }

}

module.exports = TestInstructions;