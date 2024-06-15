const dropDown = document.getElementById("dropdown");
const addEntryButton = document.getElementById("add");
const output = document.getElementById("result-cont");
const form = document.getElementById("form");

function addEntry(event) {
    event.preventDefault();  // Prevent the default form submission
    const targetInput = document.querySelector(`#${dropDown.value} .input`);
    const inputNum = document.querySelectorAll(`#${dropDown.value} input[type="text"]`).length + 1;
    const HTMLString = `
        <label for="${dropDown.value}-${inputNum}-name">Enter ${inputNum} Subject Name: </label>
        <input type="text" id="${dropDown.value}-${inputNum}-name" placeholder="Subject Name"><br>
        <label for="${dropDown.value}-${inputNum}-marks">Enter ${inputNum} Subject Marks: </label>
        <input type="number" min="0" id="${dropDown.value}-${inputNum}-marks" placeholder="Subject Marks"><br>
    `;
    targetInput.insertAdjacentHTML('beforeend', HTMLString);
}

function calculateMarks(e) {
    e.preventDefault();
    const unit1_inputs = document.querySelectorAll('#unit1 input[type="number"]');
    const unit2_inputs = document.querySelectorAll('#unit2 input[type="number"]');
    const unit3_inputs = document.querySelectorAll('#unit3 input[type="number"]');

    const unit1_marks = getMarksFromInputs(unit1_inputs);
    const unit2_marks = getMarksFromInputs(unit2_inputs);
    const unit3_marks = getMarksFromInputs(unit3_inputs);

    const totalMarks = unit1_marks + unit2_marks + unit3_marks;
    const percentage = (totalMarks / 1000) * 100;
    const goodBad = totalMarks < 450 ? "Improve next time " : "Good";

    output.innerHTML = `
        <span class="${goodBad.toLowerCase()}">${Math.abs(totalMarks)} Marks, ${goodBad}</span>
        <hr>
        <p>Total Marks: ${totalMarks}</p>
        <p>Percentage: ${percentage}%</p>
    `;
    output.style.display = "block";
}

function getMarksFromInputs(list) {
    let marks = 0;
    for (const item of list) {
        marks += parseInt(item.value) || 0;
    }
    return marks;
}

addEntryButton.addEventListener("click", addEntry);
form.addEventListener("submit", calculateMarks);
