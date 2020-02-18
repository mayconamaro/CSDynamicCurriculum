// parse json file
var courses;
function loadJSON(callback) {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'courses.json', false);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") { 
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

loadJSON( response => {
    courses = JSON.parse(response);
});


//create element
const createCourseElement = ({id,title,credits,requires,quarter,isCompleted}) => {

    const course = document.createElement('div');
    const courseTitle = document.createElement('h2');
    const courseCredits = document.createElement('p');

    course.id = id;
    course.classList.add('course');
    course.classList.add(setCourseStatus(course.id));
    course.onclick = _ => completeCourse(course);
    courseTitle.innerHTML = `[${id}] ${title}`;
    courseTitle.className = 'course-title';

    courseCredits.innerHTML = `${credits} horas`;
    courseCredits.className = 'course-credits'

    course.appendChild(courseTitle);
    course.appendChild(courseCredits);

    return course;
}

const completeCourse = (course) => {
    console.log(course);

    const courseData = courses.find(c => course.id == c.id);

    if (!courseData.isCompleted) {

        const isRequirementsMet = courseData.requires.map(c => c.isCompleted);

        if (isRequirementsMet.every(c => c)) {
            console.log("requirements met!");
        } else {
            console.log("some requirements aren't met");
        }
    }
}
 
const setCourseStatus = (course) => {
    if (courses.find(c => c.id === course.id).requires.length) 
        return 'available';
    else 
        return 'blocked';
    
}
const curriculumContainer = document.getElementById('curriculum');

for (let c of courses){
    curriculumContainer.appendChild(createCourseElement(c));
}