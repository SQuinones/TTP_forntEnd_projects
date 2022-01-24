
// In this lines I am creating const variables and assigned a 
//getElementById() method that return the element by its specific id 
const jokeE1 = document.getElementById('joke')
const jokeBtn = document.getElementById('jokeBtn')

// in this line the method is specifically used to attach an event handler to a specified element 
jokeBtn.addEventListener('click', generateJoke)

//function 
generateJoke()

//using async/await
// In this line we are creating a async which makes a function return a Promise
async function generateJoke() {
    const config = {
        headers: {
            Accept:'application/json',
        },
    }

    const res = await fetch('https://icanhazdadjoke.com/', config)

    const data = await res.json()

    // In this line the InnerHTML property is used for modifying the HTML content from JavaScript code. 
    jokeE1.innerHTML = data.joke
}
