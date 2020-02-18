var courses;
const curriculumContainer = document.getElementById('curriculum');

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

loadJSON(response => {
    courses = JSON.parse(response);
});

const createCourseElement = ({id, title, credits, requires, quarter, isCompleted}) => {

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

const createGrid = _ => {

    const quarters = courses.reduce(function (memo, course) {
        if (!memo[course["quarter"]]) {
            memo[course["quarter"]] = [];
        }
        memo[course["quarter"]].push(course);
        return memo;
    }, {});

    const columns = [];

    for (const [i, q] of Object.entries(quarters)) {
        console.log(q);
        const col = document.createElement('div');
        col.className = 'curriculum-column';
        q.forEach(course => {
            col.appendChild(createCourseElement(course));
        });
        columns.push(col);
    }

    for (let c of columns) {
        curriculumContainer.appendChild(c);
    }
}



const completeCourse = (course) => {
 
    const courseData = courses.find(c => course.id == c.id);

    if (!courseData.isCompleted) {

        const isRequirementsMet = courseData.requires.map(c => c.isCompleted);

        if (isRequirementsMet.every(c => c)) {
            course.classList.remove('available');
            course.classList.add('completed');
            console.log("requirements met!");
        } else {
            console.log("some requirements aren't met");
        }
    }
}

const setCourseStatus = (id) => {

    const courseData = courses.find(c => c.id === id);

    if (!courseData.requires.length || (courseData.requires.map(c => c.isCompleted)).every(c => c))
        return 'available';
    else
        return 'blocked';

}

createGrid();