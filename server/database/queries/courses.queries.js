export function listCoursesQuery(filter) {
    return {
        name: 'course-list',
        text: "SELECT id, name, description, credits, created_by, questions FROM courses WHERE name LIKE $1 ORDER BY id ASC",
        values: ['%' + filter + '%']
    };
};

export function getCourseQuery(id) {
    return {
        name: 'course-get',
        text: "SELECT id, name, description, credits, created_by, questions FROM courses WHERE id = $1",
        values: [id]
    };
};

export function insertCourseQuery(course) {
    return {
        name: 'course-insert',
        text: "INSERT INTO courses (name, description, credits, created_by, questions) VALUES ($1, $2, $3, $4, $5)",
        values: [course.name, course.description, course.credits, course.created_by, course.questions]
    };
}

export function updateCourseQuery(course) {
    return {
        name: 'course-update',
        text: "UPDATE courses SET name = $1, description = $2, credits = $3, created_by = $4, questions = $5 WHERE id = $6",
        values: [course.name, course.description, course.credits, course.created_by, course.questions, course.id]
    };
}

export function deleteCourseQuery(id) {
    return {
        name: 'course-delete',
        text: "DELETE from courses WHERE id = $1",
        values: [id]
    };
}