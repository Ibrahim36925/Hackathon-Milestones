// Get references to the form and the resume content area
var form = document.getElementById('form');
// const resumeContent = document.createElement('div');
// resumeContent.id = 'resume-content';
// document.body.appendChild(resumeContent);
var resumeContent = document.getElementById('resume-content');
// Function to handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    // Retrieve values from the form
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value.split(',');
    // Create the resume content
    resumeContent.innerHTML = "\n        <h3>Personal Information</h3>\n        <p>Name:".concat(name, "</p>\n        <p>Email: ").concat(email, "</p>\n        <p>Phone: ").concat(phone, "</p>\n        <h3>Education</h3>\n        <p>").concat(education, "</p>\n        <h3>Work Experience</h3>\n        <p>").concat(experience, "</p>\n        <h3>Skills</h3>\n        <ul>").concat(skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(''), "</ul>\n    ");
    // Optionally, you can add functionality to display a profile picture
    var profilePicInput = document.getElementById('profile-pic');
    if (profilePicInput.files && profilePicInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Profile Picture';
            resumeContent.prepend(img); // Add the image to the top of the resume
        };
        reader.readAsDataURL(profilePicInput.files[0]);
    }
});
