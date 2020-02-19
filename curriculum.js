var courses;
var creditSum = 0;
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

const createCourseElement = ({
    id,
    title,
    credits,
    requires,
    quarter,
    isCompleted
}) => {

    const course = document.createElement('div');
    const courseTitle = document.createElement('h2');
    const courseCredits = document.createElement('p');

    course.id = id;
    course.classList.add('course');
    course.classList.add(setCourseStatus(course.id));
    course.onclick = _ => completeCourse(course);
    courseTitle.innerHTML = `[${id}]<br/>${title}`;
    courseTitle.className = 'course-title';

    courseCredits.innerHTML = `${credits} horas`;
    courseCredits.className = 'course-credits'

    course.appendChild(courseTitle);
    course.appendChild(courseCredits);

    return course;
}

const createGrid = _ => {

    while (curriculumContainer.firstChild) {
        curriculumContainer.removeChild(curriculumContainer.firstChild)
    }
    const quarters = courses.reduce(function (memo, course) {
        if (!memo[course["quarter"]]) {
            memo[course["quarter"]] = [];
        }
        memo[course["quarter"]].push(course);
        return memo;
    }, {});

    const columns = [];

    for (const [i, q] of Object.entries(quarters)) {
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
            var fullCourseData;
            courses.forEach(course => {
                if (course.id === courseData.id) {
                    fullCourseData = course;                }
            });
            const courseIndex = courses.indexOf(fullCourseData);
            courses[courseIndex].isCompleted = true;
            creditSum = creditSum + fullCourseData.credits;
            let sumSpan = document.getElementById('credit-sum');
            sumSpan.innerText = creditSum;
            createGrid();
        } else {
            console.log("some requirements aren't met");
        }
    }
}

const getRequires = (course) => {
    const result = course.requires.map(id => {
       
        if(isNaN(id)){
            return courses.find(c => c.id === id)
        }else{
            return id;
        }
    });
    return result;
}

const setCourseStatus = (id) => {

    const courseData = courses.find(c => c.id === id);
    const requires = getRequires(courseData);
    if (!requires.length) return 'available';
    if (requires.map(r => { 
        if (isNaN(r)) { 
            return r.isCompleted;
        } else {
            return r <= creditSum;
        }
    }).every(c => c))
        return 'available';
    else
        return 'blocked';

}

loadJSON(response => {
    courses = JSON.parse(response);
});


createGrid();