
// creating const variables and assign the element by its Id 
const container = document.getElementById('container');
const text = document.getElementById('text');

//creating const variables and assign values 
const totalTime = 7500;
const breatheTime = (totalTime / 5) *2;
const holdTime = totalTime / 5;

// creating animation 
breathAnimation();


function breathAnimation(){
    //this line display the text Breathe In
    text.innerText = 'Breathe In!';
    
    // this line make the circle grow
    container.className = 'container grow';

    // this line display the text in order
    setTimeout(() => {
        text.innerText = 'Hold';

        setTimeout(() => {
            text.innerText = 'Breathe Out!';
            container.classNAme = "container shrink";
    }, holdTime);
    }, breatheTime);
}

//this line set an interval to display the animation by specific time 
setInterval(breathAnimation, totalTime);