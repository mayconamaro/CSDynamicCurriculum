// parse json file
const courses = require('./courses.json');


//create element
const createCourseElement = ({ id, title, credits, requires, quarter, isCompleted }) => {

    const course = document.createElement('div');
    const courseTitle = document.createElement('h2');
    const courseCredits = document.createElement('p');

    course.id = id;
    course.className = 'course';
    course.onclick = function EventHandler () {
        //change course color
        //add course credits to total credits if isCompleted == false
        //remove course credits from total credits if isCompleted == true
        //change isCompleted to true
    };
    courseTitle.innerHTML = `[${id}] ${title}`;
    courseTitle.className = 'course-title';

    courseCredits.innerHTML = `${credits} horas`;
    courseCredits.className = 'course-credits'


}


