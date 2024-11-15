// create box filled with instructions outside of scope of anyy functions so we can simply append it to see it
let instructionBox = $(`<div class = "instructionBox">
    <h2>Instructions</h2> <br>
    <p>
        On the left is a list of games I have enjoyed recently. Hover over any of the cards to see some more 
        information, and click the "More-Informataion" button to see a summary of the game and some additional images.
        Below the images you will see a "Go-Back" button to be able to return here.

    </p>
</div>`)



// function that we will use when we want to load games, it iterates through all current games and lists them
const loadGames = () => {  
    // when we call upon "gameDetails" func later we change aspects of interestsWrapper, so reset to defaulthere
    // These changes assume we came from the "Go-Back" button that calls upon this "loadGames" func again
    $(".interestsWrapper").html(" ");
    $(".interestsWrapper").css("border-radius", "5%");
    $(".interestsWrapper").css("margin-left", "2%");
    
    // create variable tied to interestsWrapper class that contains everything so its easier to append to later
    let interestsWrapper = $(".interestsWrapper");
    // incrementing index
    let gameIndex = 0;
    // goal is to iterate through each game inside games array, so if more are put in they can be included
    //  for each game we create an interest div that houses other divs with information regarding game
    // IMPORTANT: each iteration also attaches an index of sorts to each game which we will use later
    games.forEach((game) => {
        // each game will have it's own interest div which will contain all relevant info to it
        let interest = $(`<div class = "interest"></div>`)

        // this is why we need the gameIndex, to insert the correct image to newly createed element
        let gameImage = $(`<div class = "gameImage">
            <img src="./images/game${gameIndex}.jpg" alt="${game.gameName}"/>
        </div>`)

        // nameLine will contain the name of the game 
        let nameLine = $(`<div class = "nameLine">
            ${game.gameName}
            </div>`
        )
        
        // moreInfo will have the additional game information when corresponding ".interest" is hovered over
        //      button that will activate function is also used
        // I make the id for each button as I go, this id represents the index that I can use later
        // for some reason it only worked when it was named id...
        let moreInfo = $(`<div class = "moreInfo">
            - Game Genre: ${game.genre} <br>
            - Release Year: ${game.releaseYear} <br>
            <button class = "summary" id = ${gameIndex}>More-Information</button>
            </div>`
        )
        
        // Within the interestsWrapper we have multiple interest divs
        //  within interest we want the game image at the top, followed by game name, more info (when hovered) with button
        // and also append instruction box to be able to see it
        interest.append(gameImage);
        interest.append(nameLine);
        interest.append(moreInfo);
        interestsWrapper.append(interest);
        $(".parentContainer").append(interestsWrapper);
        // parentContainer was added later so may not be other comments about it
        //  parentContainer contains within it the interestsWrapper div and the InstructionBox div
        $(".parentContainer").append(instructionBox)
        // we show instructionBox here because we hide it when button of class "summary" is clicked
        $(".instructionBox").show();
        
        
        // by default I want to hide moreInfo, only showing when I hover.
        // for some reason it didn't work putting it right after moreInfo was created for last item in array, but works here
        $(".moreInfo").hide()
        
        // increase the index by 1 for the next iteration of the loop
        gameIndex += 1;
    })
    
    // mouseover and mouseout for the interest box that will change how it looks
    // not sure if there's a way to do this in more compact way but it works
    $(".interest").on("mouseover", function () {
        $(this).find(".moreInfo").show()
        
        $(this).find(".gameImage img").css("border-radius", "0%")
        $(this).find(".gameImage img").css("width", "240");
        $(this).find(".gameImage img").css("height", "265");
        $(this).find(".gameImage img").css("border", "dashed 3px #8B56A9")
    });
    $(".interest").on("mouseout", function () {
        $(this).find(".moreInfo").hide()
        
        $(this).find(".gameImage img").css("border-radius", "50%")
        $(this).find(".gameImage img").css("width", "175px")
        $(this).find(".gameImage img").css("height", "200px")
        $(this).find(".gameImage img").css("border", "solid 4px #2898D7")
    });

    // create a mouseover and mouseout event for the button class "summary" that each interest box has
    $(".summary").on("mouseover", function () {
        console.log("MOUSE IS OVER SUMMARY BUTTON")
        $(this).css("background-color", "#2898D7")
        $(this).css("box-shadow", "3px 3px 3px #8B56A9")
        $(this).css("width", "190px")
        $(this).css("height", "40px")
        $(this).css("margin", "25px")
    });
    $(".summary").on("mouseout", function () {
        console.log("MOUSE IS OFF THE SUMMARY BUTTON")
        $(this).css("box-shadow", "")
        $(this).css("width", "200px")
        $(this).css("height", "50px")
        $(this).css("margin", "20px")
        $(this).css("background-color", "")
        $(this).css("color", " ")
    });


    // on click we will wipe all current content in interests wrapper div and populate it with corresponding game info that was clicked
    // we will make use of the id we made for the summary button earlier in this function
    $(".summary").on("click", gameDetails)

    
};

// button click to see more information about a game calls this function
// we clear any existing content in interests wrapper before adding appropriate game info in its place
const gameDetails = (event) => {
    console.log(`now working with gameDetails function. Subsequent commands will show object event were working with`)
    $(".interestsWrapper").css("border-radius", "10%");
    $(".interestsWrapper").css("margin-left", "20%");
    
    // make sure that we get the information of the button that was clicked
    console.log(event)
    // the following should log a normal number from 0 to whenever end of index is
    // this is VERY important because I can use it as an index for the array to display the right information
    console.log(event.target.id)
    // make a variable for event.target.id so it's easier to reference in the future, log it to be sure it works
    let index = event.target.id;
    console.log(`summaryIndex is ${index}, which should be equal to event.target.id of ${event.target.id}`)

    // we are still going to use interestsContainer, but clear it and put new stuff in
    //  as seen in beginning, when we call upon it again everything will be written once more
    $(".interestsWrapper").html(" ");
    $(".instructionBox").hide();

    // create the div to house the summary text to be displayed, and log it to be sure it's the right one used
    //NOTE: ALL SUMMARIES ARE AI GENERATED FOR THE SAKE OF TIME, THE PURPOSE IS JUST TO HAVE A LOT OF TEXT 
    let textSection = $(`<div class = "textSection">
    ${games[index].summary}
    </div>`)
    console.log(`we have used the summary for the game: ${games[index].gameName}`)
    
    //creat the div that we will put additional images into
    let detailsImages = $(`<div class = detailsImages>`)
    
    // function that parses through imagese 1-4 depending on what game is selected
    //  uses info from event object that was passed to help index what we need. 
    let nameOfGame = games[index].imageRef
    let imgIndex = 1;
    while(imgIndex <= 4) {
        let iterationImage = $(`<img src="./images/${nameOfGame}${imgIndex}.jpg" alt="detailsImage"/>`)
        detailsImages.append(iterationImage)
        imgIndex++
    }


    // append everything with ext section on left, then images wrapper on right, and button on bottom
    $(".interestsWrapper").append(textSection);
    $(".interestsWrapper").append(detailsImages)
    $(".interestsWrapper").append(goingBack);

    // decided to change the look of images wrapper so put some javascript in 
    $(".detailsImages").css("border-top-right-radius", "15%");
    $(".detailsImages").css("border-bottom-left-radius", "15%");

    // changing the look of top left and bottom right imgages
    $(".detailsImages img").first().css("border-top-left-radius", "15%");
    $(".detailsImages img").last().css("border-bottom-right-radius", "15%");

    // create a mouseover and mouseout event for the back button, want it to have same styling as more info button
    $(".return").on("mouseover", function () {        
        console.log("MOUSE IS OVER RETURN BUTTON")
        $(this).css("background-color", "#2898D7")
        $(this).css("box-shadow", "3px 3px 3px #8B56A9")
        $(this).css("width", "190px")
        $(this).css("height", "40px")
        $(this).css("margin", "25px")
    })
    $(".return").on("mouseout", function () {
        console.log("MOUSE IS OFF THE RETURN BUTTON")
        $(this).css("background-color", "#2898D7")
        $(this).css("box-shadow", "")
        $(this).css("width", "200px")
        $(this).css("height", "50px")
        $(this).css("margin", "20px")
        $(this).css("background-color", "")
        $(this).css("color", " ")
    })

    $(".return").on("click", loadGames);
}

//create the back button outside of th scope of any function
let goingBack = $(`<div class = "goingBack">
    <button class = "return">Go-Back</button>
</div>`)

// this is the one function we must manually call upon in code, others are done with button clicks
$(document).ready(loadGames);



// const gameDetails = (gameIndex) => {
//     console.log(`the index of the game we are working with is ${gameIndex}`)
// }
