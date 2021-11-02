'use strict';

/*
* Function, Bear: Create display and move the bear
* */
function Bear() {
    // Initialise the bear
    this.dBear = 100;
    this.htmlElement = document.getElementById("bear");
    this.id = this.htmlElement.id;
    this.x = this.htmlElement.offsetLeft;
    this.y = this.htmlElement.offsetTop;

    // Set the speed of the bear to the user defined speed
    this.setSpeed = function (speed){
        this.dBear = speed
    }

    // Make sure the bear doesn't exceed it boundaries
    this.fitBounds = function() {
        let parent = this.htmlElement.parentElement;
        let iw = this.htmlElement.offsetWidth;
        let ih = this.htmlElement.offsetHeight;
        let l = parent.offsetLeft;
        let t = parent.offsetTop;
        let w = parent.offsetWidth;
        let h = parent.offsetHeight;
        if (this.x < 0) this.x = 0;
        if (this.x > w - iw) this.x = w - iw;
        if (this.y < 0) this.y = 0;
        if (this.y > h - ih) this.y = h - ih;
    };

    // Move the bear by the specified amount in x and y
    this.move = function(xDir, yDir) {
        this.fitBounds(); // We add this instruction to keep bear within board
        this.x += this.dBear * xDir;
        this.y += this.dBear * yDir;
        this.display();
    };

    // Display the bear image
    this.display = function() {
        this.htmlElement.style.left = this.x + "px";
        this.htmlElement.style.top = this.y + "px";
    };
}

/*
* Function, start: Start the game
* */
function start() {
    // Create bear
    bear = new Bear();

    // Add an event listener to the keypress event.
    document.addEventListener("keydown", moveBear, false);

    // Change bear speed depending on the user input
    var speed = document.getElementById("bearSpeed").value;
    bear.setSpeed(speed);

    // Create new array for bees
    bees = new Array();

    // Create bees
    makeBees();

    // Wait for a key to be pressed
    document.onkeydown = function (e){
        // Take start time
        lastStingTime = new Date()

    }


    // Update bees
    updateBees()

}

/*
* Function, moveBear: Handle keyboard inputs to move the bear
* */
function moveBear(e) {

    // Codes of the four keys
    const KEYUP = 38;
    const KEYDOWN = 40;
    const KEYLEFT = 37;
    const KEYRIGHT = 39;
    if (e.keyCode == KEYRIGHT) {
        bear.move(1, 0)
    } // Right key
    if (e.keyCode == KEYLEFT) {
        bear.move(-1, 0)
    } // Left key
    if (e.keyCode == KEYUP) {
        bear.move(0, -1)
    } // Up key
    if (e.keyCode == KEYDOWN) {
        bear.move(0, 1)
    } // Down key
}

/*
* Class, Bee: Define the bee object
* */
class Bee {
    /*
    * Function, constructor: Set the initial values for the bees
    * */
    constructor(beeNumber) {

        // The HTML element corresponding to the IMG of the bee
        this.htmlElement = createBeeImg(beeNumber);
        // It's HTML ID
        this.id = this.htmlElement.id;
        // The left position (x)
        this.x = this.htmlElement.offsetLeft;
        // The top position (y)
        this.y = this.htmlElement.offsetTop;
        this.move = function(dx, dy) {
            // Move the bees by dx, dy
            this.x += dx;
            this.y += dy;
            this.display();
        };

        /*
        * Function, display: Display the bee object
        * */
        this.display = function() {
            // Adjust position of bee and display it
            this.fitBounds();// Add this to adjust to bounds
            this.htmlElement.style.left = this.x + "px";
            this.htmlElement.style.top = this.y + "px";
            this.htmlElement.style.position = "absolute";
        };

        /*
        * Function, fitBounds: Define the boundaries for the bee objects
        * */
        this.fitBounds = function() {
            // Check and make sure the bees stays in the board space
            let parent = this.htmlElement.parentElement;
            let iw = this.htmlElement.offsetWidth;
            let ih = this.htmlElement.offsetHeight;
            let l = parent.offsetLeft;
            let t = parent.offsetTop;
            let w = parent.offsetWidth;
            let h = parent.offsetHeight;
            if (this.x < 0)
                this.x = 0;
            if (this.x > w - iw)
                this.x = w - iw;
            if (this.y < 0)
                this.y = 0;
            if (this.y > h - ih)
                this.y = h - ih;
        };
    }
}

/*
* Function, createBeeImg: Add the bee image to the bee objects
* */
function createBeeImg(wNum) {
    // Get dimension and position of board div
    let boardDiv = document.getElementById("board");
    let boardDivW = boardDiv.offsetWidth;
    let boardDivH = boardDiv.offsetHeight;
    let boardDivX = boardDiv.offsetLeft;
    let boardDivY = boardDiv.offsetTop;
    // Create the IMG element
    let img = document.createElement("img");
    img.setAttribute("src", "images/bee.gif");
    img.setAttribute("width", "100");
    img.setAttribute("alt", "A bee!");
    img.setAttribute("id", "bee" + wNum);
    img.setAttribute("class", "bee"); // Set class of html tag img
    // Add the IMG element to the DOM as a child of the board div
    img.style.position = "absolute";
    boardDiv.appendChild(img);
    // Set initial position
    let x = getRandomInt(boardDivW);
    let y = getRandomInt(boardDivH);
    img.style.left = (boardDivX + x) + "px";
    img.style.top = (y) + "px";
    // Return the img object
    return img;
}

/*
* Function, getRandomInt: Generate a random integer
* */
function getRandomInt(max) {
    // Use Math to generate a random integer
    var num = Math.random()*max;

    // Return the random integer
    return num;
}


/*
* Function, makeBees: Create the bees based on the number passed in
* */
function makeBees() {
    // Get number of bees specified by the user
    let nbBees = document.getElementById("nbBees").value;
    nbBees = Number(nbBees); // Try converting the content of the input to a number
    if (isNaN(nbBees)) { // Check that the input field contains a valid number
        window.alert("Invalid number of bees");
        return;
    }
    // Create bees
    let i = 1;
    while (i <= nbBees) {
        var num = i;
        var bee = new Bee(num); // Create object and its IMG element
        bee.display(); // Display the bee
        bees.push(bee); // Add the bee object to the bees array
        i++;
    }
}

/*
* Function, addBee: Add a bee to the bess array on button click
* */
function addBee(){
    var bee = new Bee(bees.length); // Create object and add its IMG element
    bee.display(); // Display the bee
    bees.push(bee); // Add the bee object to the bees array


}

/*
* Function updateBees: Move the bees randomly and check for the number of hits
* */
function updateBees() { // Update loop for game
    // Move the bees randomly
    moveBees();
    // Use a fixed update period
    let period = document.getElementById("periodTimer").value;//modify this to control refresh period

    // Update the timer for the next move
    updateTimer = setTimeout('updateBees()', period);

    // Check if the number of hits is at 1000 and if so then stop the game
    if (hits.innerHTML == 1000){
        clearTimeout();
        bees = 0;
        alert("Game Over!");
    }

}

/*
* Function, moveBees: Move the bees randomly
* */
function moveBees() {
    // Get speed input field value
    let speed = document.getElementById("speedBees").value;
    // Move each bee to a random location
    for (let i = 0; i < bees.length; i++) {
        let dx = getRandomInt(2 * speed) - speed;
        let dy = getRandomInt(2 * speed) - speed;
        bees[i].move(dx, dy);
        isHit(bees[i], bear); // We add this to count stings
    }
}

/*
* Function, isHit: Check for a hit and if so then update the clock and the score
* */
function isHit(defender, offender) {
    // Check if the timer has started
    if (lastStingTime >= 0){

        // Check for a sting in the the form of an overlap between the bee and the bear
        if (overlap(defender, offender)) {
            let score = hits.innerHTML;
            score = Number(score) + 1; // Increment the score
            hits.innerHTML = score; // Display the new score

            // Calculate longest duration
            let newStingTime = new Date();
            let thisDuration = newStingTime - lastStingTime;
            lastStingTime = newStingTime;

            // Set the longest duration to the text field value
            let longestDuration = Number(duration.innerHTML);

            // If the longest duration is not a number then set it to 0
            if (longestDuration == NaN){
                longestDuration = 0;
            }

            // If the longest duration is 0 then set the longest duration to the current duration
            if (longestDuration === 0) {
                longestDuration = thisDuration;
            } else {
                if (longestDuration < thisDuration) longestDuration = thisDuration;
            }

            // Set the HTML text element to the longest duration value
            document.getElementById("duration").innerHTML = longestDuration;
        }

    }
}

/*
* Function, overlap: Check for the overlap between the bear and the bee
* */
function overlap(element1, element2) {
    // Consider the two rectangles wrapping the two elements
    // Rectangle of the first element
    let left1 = element1.htmlElement.offsetLeft;
    let top1 = element1.htmlElement.offsetTop;
    let right1 = element1.htmlElement.offsetLeft + element1.htmlElement.offsetWidth;
    let bottom1 = element1.htmlElement.offsetTop + element1.htmlElement.offsetHeight;
    // Rectangle of the second element
    let left2 = element2.htmlElement.offsetLeft;
    let top2 = element2.htmlElement.offsetTop;
    let right2 = element2.htmlElement.offsetLeft + element2.htmlElement.offsetWidth;
    let bottom2 = element2.htmlElement.offsetTop + element2.htmlElement.offsetHeight;
    // Calculate the intersection of the two rectangles
    let x_intersect = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2));
    let y_intersect = Math.max(0, Math.min(bottom1, bottom2) - Math.max(top1, top2));
    let intersectArea = x_intersect * y_intersect;
    // If intersection is nil then no hits
    if (intersectArea == 0 || isNaN(intersectArea)) {
        return false;
    }
    return true;
}

