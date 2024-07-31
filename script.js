document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const studentRecords = document.getElementById('student-records');

    // Load records from localStorage on page load
    loadRecords();

    // Form submit event
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        const studentName = document.getElementById('student-name').value.trim();
        const studentId = document.getElementById('student-id').value.trim();
        const emailId = document.getElementById('email-id').value.trim();
        const contactNo = document.getElementById('contact-no').value.trim();

        // Validate form inputs
        if (!validateInputs(studentName, studentId, emailId, contactNo)) {
            return;
        }

        // Add the record
        addRecord(studentName, studentId, emailId, contactNo);

        // Clear form fields
        form.reset();
    });

    // Function to add a record
    function addRecord(studentName, studentId, emailId, contactNo) {
        const records = getRecords();
        
        // Check if the student ID already exists
        const existingRecordIndex = records.findIndex(record => record.studentId === studentId);
        if (existingRecordIndex !== -1) {
            alert('Student ID already exists!');
            return;
        }

        const newRecord = {
            studentName,
            studentId,
            emailId,
            contactNo
        };

        records.push(newRecord);
        setRecords(records);
        renderTable(records);
    }

    // Function to edit a record
    function editRecord(index) {
        const records = getRecords();
        const record = records[index];

        const studentName = prompt("Enter new student name:", record.studentName);
        const studentId = prompt("Enter new student ID:", record.studentId);
        const emailId = prompt("Enter new email ID:", record.emailId);
        const contactNo = prompt("Enter new contact No.:", record.contactNo);

        if (!validateInputs(studentName, studentId, emailId, contactNo)) {
            return;
        }

        records[index] = { studentName, studentId, emailId, contactNo };
        setRecords(records);
        renderTable(records);
    }

    // Function to delete a record
    function deleteRecord(index) {
        const records = getRecords();
        records.splice(index, 1);
        setRecords(records);
        renderTable(records);
    }

    // Function to validate form inputs
    function validateInputs(studentName, studentId, emailId, contactNo) {
        const namePattern = /^[a-zA-Z ]+$/;
        const idPattern = /^[0-9]+$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const contactPattern = /^[0-9]+$/;

        if (!namePattern.test(studentName)) {
            alert('Student name must contain only letters and spaces.');
            return false;
        }
        if (!idPattern.test(studentId)) {
            alert('Student ID must contain only numbers.');
            return false;
        }
        if (!emailPattern.test(emailId)) {
            alert('Please enter a valid email address.');
            return false;
        }
        if (!contactPattern.test(contactNo)) {
            alert('Contact number must contain only numbers.');
            return false;
        }

        return true;
    }

    // Function to load records from local storage
    function loadRecords() {
        const records = getRecords();
        renderTable(records);
    }

    // Function to render table with records
    function renderTable(records) {
        studentRecords.innerHTML = '';

        records.forEach((record, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.studentName}</td>
                <td>${record.studentId}</td>
                <td>${record.emailId}</td>
                <td>${record.contactNo}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editRecord(${index})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteRecord(${index})">Delete</button>
                </td>
            `;
            studentRecords.appendChild(row);
        });
    }

    // Function to get records from local storage
    function getRecords() {
        return JSON.parse(localStorage.getItem('studentRecords') || '[]');
    }

    // Function to set records in local storage
    function setRecords(records) {
        localStorage.setItem('studentRecords', JSON.stringify(records));
    }

    // Make functions available globally for inline event handlers
    window.editRecord = editRecord;
    window.deleteRecord = deleteRecord;
});
