// parse json file
var courses;
function loadJSON(callback) {
    //criamos uma instancia da xmlhttprequest
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'courses.json', false);
    //carregamos o cnoteudo do courses.json de forma sync (se colocar true ali em cima, muda pra async)
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") { //tivemos sucesso nesse get?
            //siiiim
            callback(xobj.responseText);
            //chama a funcao q passamos por callback :)
        }
    };
    ///naaaao :( mandamos nulll
    xobj.send(null);
}

loadJSON( response => {
    //funcao q passamos pro callback vai fazer oq, fazer um parse na resposta da request e armazenar isso numa variavel global :)
    courses = JSON.parse(response);

});

console.log(courses);


//create element
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
    course.className = 'course';
    course.onclick = function EventHandler() {
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

    if (!courseData.isCompleted) {

        const isRequirementsMet = courseData.requires.map(c => c.isCompleted);

        if (isRequirementsMet.every(c => c)) {
            console.log("requirements met!");
        } else {
            console.log("some requirements aren't met");
        }
    }
}