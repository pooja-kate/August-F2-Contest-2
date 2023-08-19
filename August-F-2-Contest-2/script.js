const students = [
    {
        ID: 1,
        name: 'Alice',
        age: 21,
        grade: 'A',
        degree: 'Btech',
        email: 'alice@example.com'
    },
    {
        ID: 2,
        name: 'Bob',
        age: 22,
        grade: 'B',
        degree: 'MBA',
        email: 'bob@example.com'
    },
    {
        ID: 3,
        name: 'Charlie',
        age: 20,
        grade: 'C',
        degree: 'Arts',
        email: 'charlie@example.com'
    }
];

const studentList = document.getElementById("studentList");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const studentForm = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const gradeInput = document.getElementById("grade");
const degreeInput = document.getElementById("degree");
const emailInput = document.getElementById("email");
const submitButton = document.getElementById("submitButton");

let editingStudentID = null;

function renderStudents() {
    studentList.innerHTML = "";
    students.forEach(student => {
        const studentRow = document.createElement("div");
        studentRow.className = "student-row";
        studentRow.innerHTML = `
            <p>${student.name}</p>
            <p>${student.age}</p>
            <p>${student.grade}</p>
            <p>${student.degree}</p>
            <p>${student.email}</p>
            <button onclick="editStudent(${student.ID})">Edit</button>
            <button onclick="deleteStudent(${student.ID})">Delete</button>
        `;
        studentList.appendChild(studentRow);
    });
}

function addStudent(event) {
    event.preventDefault();

    const newStudent = {
        ID: students.length + 1,
        name: nameInput.value,
        age: ageInput.value,
        grade: gradeInput.value,
        degree: degreeInput.value,
        email: emailInput.value
    };

    students.push(newStudent);
    renderStudents();
    studentForm.reset();
}

function editStudent(studentID) {
    const studentToEdit = students.find(student => student.ID === studentID);
    if (studentToEdit) {
        editingStudentID = studentID;
        nameInput.value = studentToEdit.name;
        ageInput.value = studentToEdit.age;
        gradeInput.value = studentToEdit.grade;
        degreeInput.value = studentToEdit.degree;
        emailInput.value = studentToEdit.email;
        submitButton.textContent = "Edit Student";
    }
}

function updateStudent(event) {
    event.preventDefault();

    const studentIndex = students.findIndex(student => student.ID === editingStudentID);
    if (studentIndex !== -1) {
        students[studentIndex] = {
            ID: editingStudentID,
            name: nameInput.value,
            age: ageInput.value,
            grade: gradeInput.value,
            degree: degreeInput.value,
            email: emailInput.value
        };
        renderStudents();
        studentForm.reset();
        submitButton.textContent = "Add Student";
        editingStudentID = null;
    }
}

function deleteStudent(studentID) {
    const updatedStudents = students.filter(student => student.ID !== studentID);
    students.length = 0;
    students.push(...updatedStudents);
    renderStudents();
}

function searchStudents(query) {
    query = query.toLowerCase();
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.degree.toLowerCase().includes(query)
    );
    renderStudents(filteredStudents);
}

submitButton.addEventListener("click", event => {
    if (editingStudentID !== null) {
        updateStudent(event);
    } else {
        addStudent(event);
    }
});

searchButton.addEventListener("click", () => {
    searchStudents(searchInput.value);
});

renderStudents();
