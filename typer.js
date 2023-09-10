//Initial Variables to be used throughout
const DISTREST = document.getElementById("DISTREST")
const hard_version = document.getElementById("H_P");
const medium_version = document.getElementById("M_P");
const easy_version = document.getElementById("E_P");
const displayBox = document.getElementById("textEnter")

//The drop down for more information "How does this typing test work?"
let toggle = document.getElementById("info-toggle");
let moreInfo = document.getElementById("more-info");
moreInfo.style.display = "none";

toggle.addEventListener("click", function(){
  if (moreInfo.style.display == "none") {
    moreInfo.style.display = "block";
  } else {
    moreInfo.style.display = "none";
  }
});

//The drop down for more information "for how the test is assessed?"
let toggle_ta = document.getElementById("info-add");
let = moreInfoTA = document.getElementById("more-add");
moreInfoTA.style.display = "none";

toggle_ta.addEventListener("click",function(){
  if(moreInfoTA.style.display == "none"){
    moreInfoTA.style.display = "block";
  } else {
    moreInfoTA.style.display = "none";
  }
});

//The drop down for more information "What new features will be added?"
let toggle_ei = document.getElementById("info-ft")
let moreInfoEI = document.getElementById("ft_txt") 
moreInfoEI.style.display = "none";

toggle_ei.addEventListener("click",function(){
  if(moreInfoEI.style.display == "none"){
    moreInfoEI.style.display = "block";
  } else {
    moreInfoEI.style.display = "none";
  }
});

//Actually checking when user hits submit button for (hard, medium or easy)
const h_btn = document.getElementById("h_btn");
const m_btn = document.getElementById("m_btn");
const e_btn = document.getElementById("e_btn");

let file_txt;
let randomNum;
let content_file;
e_btn.addEventListener("click", () => {
    randomNum = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    if(randomNum == 1){
      file_txt = 'kids_story.txt'
    }
    else if(randomNum == 2){
      file_txt = 'kids_hide_seek.txt'
    }
    else if(randomNum == 3){
      file_txt = 'lego_story.txt'
    }


    fetch(`easy_texts/${file_txt}`).then(response => response.text()).then(passage => {
        displayBox.textContent = passage;
        content_file = passage;
      })

  })

m_btn.addEventListener("click", () => {
    randomNum = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    if(randomNum == 1){
      file_txt = 'lego_ninjago.txt'
    }
    else if(randomNum == 2){
      file_txt = 'ocean.txt'
    }
    else if(randomNum == 3){
      file_txt = 'weather_patterns.txt'
    }


    fetch(`medium_texts/${file_txt}`).then(response => response.text()).then(passage => {
        displayBox.textContent = passage;
        content_file = passage;
      })
})

h_btn.addEventListener("click", () => {
    randomNum = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    if(randomNum == 1){
      file_txt = 'phil_j.txt'
    }
    else if(randomNum == 2){
      file_txt = 'circuits.txt'
    }
    else if(randomNum == 3){
      file_txt = 'bud_phi.txt'
    }


    fetch(`hard_texts/${file_txt}`).then(response => response.text()).then(passage => {
        displayBox.textContent = passage;
        content_file = passage;
      })
})

//Actually implementing the time keep method for the passage
// (THIS KEEPS THE TIME BETWEEN STARTING AND FINISHING) (ALSO CONTAINS FILE FOR
//ALL CHARACTERS WRITEEN BY THE USER )
const user_enter_txt = document.getElementById("textEntered")
let start_time; 
let start = true; 
let curr_time;
let time_elapsed;
let user_text_area;

user_enter_txt.addEventListener("keyup", function() {
  if(start){
    start = false;
    start_time = Date.now()
  }
  curr_time = Date.now()
  time_elapsed = (curr_time - start_time);
  console.log(time_elapsed);
  user_text_area = user_enter_txt.value;
});

//restart & submit button functionality
const sbt_btn = document.getElementById("submitBTN")
const rst_btn = document.getElementById("restartBTN")

rst_btn.addEventListener("click", restart_typer)
sbt_btn.addEventListener("click", submit_typer)

let user_text_array = [];
let display_text_array = [];

let WPM; //calc
let CPM; // calc
let Errors = 0; // calc
let BackSpaces = 0; //calc
let Time_Not_Typing; 
let total_words_typed; //calc
let correct_words = 0; //calc

//SPECIFIC AREA: keeps track of backspaces
user_enter_txt.addEventListener("keydown", function(c) {
  if(c.key == 'Backspace'){
    BackSpaces++;
  }  
});

function submit_typer(){
  //creating two arrays needed (user_text & display_text)
  user_text_array = user_text_area.split(" ")
  display_text_array = content_file.split(" ")

  //Actually making all of the computations WPM, CPM, etc, etc.
  
  //This for loop calculates the correct number of words typed and error words (delimited by a space)
  for(let counter=0; counter<user_text_array.length; counter++){

    if(String(user_text_array[counter]) == String(display_text_array[counter])){
      correct_words++
    }
    else{
      Errors++
    }
  }
  //WPM & CPM & total_words_typed
  total_words_typed = user_text_array.length
  WPM = user_text_array.length / (time_elapsed / 60000)
  CPM = user_text_area.length / (time_elapsed / 60000)
  display()
}

function restart_typer(){
   displayBox.textContent = "";
   start = true;
   curr_time = 0;
   time_elapsed = 0;
   start_time = 0;
   user_enter_txt.value = "";
  DISTREST.textContent = "[No Results]";
  WPM = 0;
  CPM = 0;
  BackSpaces = 0;
  correct_words = 0;
  Errors = 0;
  total_words_typed = 0;
  }

//Displays all of the Information after the test is taken
//WPM, CPM, Errors, Backspaces, Words Typed, ETC. 
function display(){
  DISTREST.textContent = "| WPM: " + String(WPM)
  DISTREST.textContent += "| CPM: " + String(CPM)
  DISTREST.textContent += " | Backspaces: " + String(BackSpaces)
  DISTREST.textContent += " | Correct Words: " + String(correct_words)
  DISTREST.textContent += " | Errors:  " + String(Errors)
  DISTREST.textContent += " | Words Types: " + String(total_words_typed)

}