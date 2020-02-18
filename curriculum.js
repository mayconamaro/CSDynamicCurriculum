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

    course.appendChild(courseTitle);
    course.appendChild(courseCredits);

    return course;
}

const completeCourse = (course) => {

    const courseData = courses.find(c => course.id == c.id);

    if(!courseData.isCompleted){

        const isRequirementsMet = courseData.requires.map( c => c.isCompleted );
        
        if(isRequirementsMet.every( c => c )){
            console.log("requirements met!");
        } else {
            console.log("some requirements aren't met");
        }
    }
}

