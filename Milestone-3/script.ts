var form = document.getElementById('form') as HTMLFormElement;
var resumeContent = document.getElementById('resume-content')as HTMLElement
form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');
    resumeContent.innerHTML = `
        <h3>Personal Information</h3>
        <p>Name:${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Work Experience</h3>
        <p>${experience}</p>
        <h3>Skills</h3>
        <ul>${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}</ul>
    `;

    // Optionally, you can add functionality to display a profile picture
    const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;
    if (profilePicInput.files && profilePicInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target!.result as string;
            img.alt = 'Profile Picture';
            resumeContent.prepend(img); // Add the image to the top of the resume
        };
        reader.readAsDataURL(profilePicInput.files[0]);
    }
});
