var questionAnswer = document.querySelector(".questionAnswer"),
questionHeader = document.querySelector(".questionHeading h2"),
questionList = document.querySelector(".questionList")
var file = "assets/json/questionsEnglish.json"

async function fetchData() {
    //fetch(file).then(x => x.json()).then(d => data = d).catch(error => console.log(error))
    try {
        let res = await fetch(file)
        return await res.json()
    } catch (error) {
        console.log(error)
    }
}

async function loadData() {
    let questionsAll = await fetchData()
    let html = ''
    questionsAll.forEach(element => {
        htmlSegment = "<div class='questionWrapper'> <div class='questionBadget'>"+ element.mode +"</div><div class='question'><div class='questionTag "+ element.type +"'></div><div class='questionHeading'><h2>"+ element.question +"</h2></div><button class='btn questionButton'>Show answer <i class='bx bx-chevron-down' ></i></button><div class='questionAnswer'>"+ element.answer +"</div></div></div>"
        html += htmlSegment
    });
    questionList.innerHTML = html
    showAnswer();
}
loadData()
function showAnswer() {
    var questionBtn = document.querySelectorAll(".questionButton"),
    questionAnswer = document.querySelectorAll(".questionAnswer")

    for (let i = 0; i < questionBtn.length; i++) {
        questionBtn[i].onclick =  () => {
            if (questionAnswer[i].className == "questionAnswer open")
            btnText = "Show answer <i class='bx bx-chevron-down' ></i>"
            else
            btnText = "Hide answer <i class='bx bx-chevron-up' ></i>"
            for (let j = 0; j < questionAnswer.length; j++) {
                questionAnswer[i].classList.toggle("open")     
            }
            questionBtn[i].innerHTML = btnText
        }
    }
}

//Language Select
var languageIcon = document.querySelector(".languageIcon"),
languageSelectBox = document.querySelector(".languageSelect"),
languageItems = document.querySelectorAll(".languageItem")

languageIcon.onclick = () => {
    languageSelectBox.classList.toggle("open")
}
document.addEventListener('click', function(event) {
    if (event.target != languageIcon) {
      languageSelectBox.classList.remove('open')
    }
  })
for (let i = 0; i < languageItems.length; i++) {
    languageItems[i].onclick = () => {
        setLanguage(languageItems[i].innerText)
    }
}

function setLanguage(language) {
    file = "assets/json/questions"+language+".json"
    loadData()
}