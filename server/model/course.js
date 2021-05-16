
class Course {

    constructor (id, name, description, credits, created_by, questions) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.credits = credits;
        this.created_by = created_by;
        this.questions = questions;
    };

    id;

    name;

    description;

    credits;

    created_by;

    questions;
};

export default Course;