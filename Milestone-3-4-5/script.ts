var form = document.getElementById('form') as HTMLFormElement;
var resumeContent = document.getElementById('resume-content')as HTMLDivElement
var resumeC = document.getElementById('resume')as HTMLDivElement
var editBtn = document.getElementById('editButton') as HTMLButtonElement
var downloadBtn = document.getElementById('downloadPDF') as HTMLButtonElement
var generateURL = document.getElementById('generateURL') as HTMLButtonElement

var isEditing = false;

form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    resumeC.style.display='block'
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');
    resumeContent.innerHTML = `
        <h3>Personal Information</h3>
        <p class=\"editable\" contenteditable=\"false\">Name:${name}</p>
        <p class=\"editable\" contenteditable=\"false\">Email: ${email}</p>
        <p class=\"editable\" contenteditable=\"false\">Phone: ${phone}</p>
        <h3>Education</h3>
        <p class=\"editable\" contenteditable=\"false\">${education}</p>
        <h3>Work Experience</h3>
        <p class=\"editable\" contenteditable=\"false\">${experience}</p>
        <h3>Skills</h3>
        <ul>${skills.map(skill => `<li class=\"editable\" contenteditable=\"false\">${skill.trim()}</li>`).join('')}</ul>
     
    `;

    const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;
    if (profilePicInput.files && profilePicInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target!.result as string;
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
        const url = new URL(window.location.href);
        
        const name = document.getElementById('name') as HTMLInputElement | null;
        const email = document.getElementById('email') as HTMLInputElement | null;
        const education = document.getElementById('education') as HTMLInputElement | null;
        const experience = document.getElementById('experience') as HTMLInputElement | null;
        const skills = document.getElementById('skills') as HTMLInputElement | null;

        if (name && email && education && experience && skills) {
            url.searchParams.set('resume', JSON.stringify({
                name: name.value,
                email: email.value,
                education: education.value,
                experience: experience.value,
                skills: skills.value.split(',')
            }));

            prompt('Copy this URL to share:', url.href);
        } else {
            console.error('One or more input fields are missing.');
        }
    });
}
downloadBtn.addEventListener('click', () => {
    if (typeof html2pdf === 'undefined') {
        alert('Error: html2pdf library is not loaded.');
        return;
    }

    const resumeOptions = {
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
    .catch((error: Error) => {
            console.error('PDF generation error:', error);
        });
});








