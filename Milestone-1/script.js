var toggleButton = document.getElementById('toggle-skills');
var skills = document.getElementById('skills');
var textElement = document.getElementById('text');
// var btnClick = document.getElementsByClassName('active')[0] as HTMLElement 
toggleButton.addEventListener('click', function () {
    if (skills.style.display === 'none') {
        skills.style.display = 'block';
        // btnClick.style.display='none'
    }
    else {
        skills.style.display = 'none';
        // btnClick.style.display='block'
    }
});
