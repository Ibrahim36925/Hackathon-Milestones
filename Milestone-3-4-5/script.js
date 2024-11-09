var form = document.getElementById('form');
var resumeContent = document.getElementById('resume-content');
var resumeC = document.getElementById('resume');
var editBtn = document.getElementById('editButton');
var downloadBtn = document.getElementById('downloadPDF');
var generateURL = document.getElementById('generateURL');
var isEditing = false;
form.addEventListener('submit', function (event) {
    event.preventDefault();
    resumeC.style.display = 'block';
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value.split(',');
    resumeContent.innerHTML = "\n        <h3>Personal Information</h3>\n        <p class=\"editable\" contenteditable=\"false\">Name:".concat(name, "</p>\n        <p class=\"editable\" contenteditable=\"false\">Email: ").concat(email, "</p>\n        <p class=\"editable\" contenteditable=\"false\">Phone: ").concat(phone, "</p>\n        <h3>Education</h3>\n        <p class=\"editable\" contenteditable=\"false\">").concat(education, "</p>\n        <h3>Work Experience</h3>\n        <p class=\"editable\" contenteditable=\"false\">").concat(experience, "</p>\n        <h3>Skills</h3>\n        <ul>").concat(skills.map(function (skill) { return "<li class=\"editable\" contenteditable=\"false\">".concat(skill.trim(), "</li>"); }).join(''), "</ul>\n     \n    ");
    var profilePicInput = document.getElementById('profile-pic');
    if (profilePicInput.files && profilePicInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Profile Picture';
            resumeContent.prepend(img);
        };
        reader.readAsDataURL(profilePicInput.files[0]);
    }
});
if (editBtn) {
    editBtn.addEventListener('click', function () {
        console.log("hi");
        var editableElements = document.querySelectorAll('.editable');
        if (isEditing) {
            // Save changes
            editableElements.forEach(function (element) {
                element.setAttribute('contenteditable', 'false');
            });
            editBtn.textContent = 'Edit';
        }
        else {
            // Enable editing
            editableElements.forEach(function (element) {
                element.setAttribute('contenteditable', 'true');
            });
            editBtn.textContent = 'Save';
        }
        isEditing = !isEditing;
    });
}
if (generateURL) {
    generateURL.addEventListener('click', function () {
        var url = new URL(window.location.href);
        var name = document.getElementById('name');
        var email = document.getElementById('email');
        var education = document.getElementById('education');
        var experience = document.getElementById('experience');
        var skills = document.getElementById('skills');
        if (name && email && education && experience && skills) {
            url.searchParams.set('resume', JSON.stringify({
                name: name.value,
                email: email.value,
                education: education.value,
                experience: experience.value,
                skills: skills.value.split(',')
            }));
            prompt('Copy this URL to share:', url.href);
        }
        else {
            console.error('One or more input fields are missing.');
        }
    });
}
downloadBtn.addEventListener('click', function () {
    if (typeof html2pdf === 'undefined') {
        alert('Error: html2pdf library is not loaded.');
        return;
    }
    var resumeOptions = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf()
        .from(resumeContent)
        .set(resumeOptions)
        .save()
        .catch(function (error) {
        console.error('PDF generation error:', error);
    });
});
