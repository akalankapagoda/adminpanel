// Contains prepared queries related to courses

/**
 * Returns a prepared query to retrieves a list of courses filtered by name.
 * 
 * 
 * @param {*} filter The filter string to filter by the name
 * @returns A prepared query to retrieves a list of courses filtered by name
 */
export function listCoursesQuery(filter) {
    return {
        name: 'course-list',
        text: "SELECT id, name, description, credits, created_by, questions FROM courses WHERE name LIKE $1 ORDER BY id ASC",
        values: ['%' + filter + '%']
    };
};

/**
 * Returns a prepared query to get a specific course.
 * 
 * @param {*} id The course id to retrieve
 * @returns A prepared query to get a specific course
 */
export function getCourseQuery(id) {
    return {
        name: 'course-get',
        text: "SELECT id, name, description, credits, created_by, questions FROM courses WHERE id = $1",
        values: [id]
    };
};

/**
 * Returns a prepared query to insert a course.
 * 
 * @param {*} course The course object to insert
 * @returns A prepared query to insert a course
 */
export function insertCourseQuery(course) {
    return {
        name: 'course-insert',
        text: "INSERT INTO courses (name, description, credits, created_by, questions) VALUES ($1, $2, $3, $4, $5)",
        values: [course.name, course.description, course.credits, course.created_by, course.questions]
    };
}

/**
 * Returns a prepared query to update a course.
 * 
 * @param {*} course An updated course object
 * @returns A prepared query to udpate a course
 */
export function updateCourseQuery(course) {
    return {
        name: 'course-update',
        text: "UPDATE courses SET name = $1, description = $2, credits = $3, created_by = $4, questions = $5 WHERE id = $6",
        values: [course.name, course.description, course.credits, course.created_by, course.questions, course.id]
    };
}

/**
 * Returns a prepared query to to delete a course.
 * 
 * @param {*} id Course id to delete
 * @returns A prepared query to delete a course
 */
export function deleteCourseQuery(id) {
    return {
        name: 'course-delete',
        text: "DELETE from courses WHERE id = $1",
        values: [id]
    };
}