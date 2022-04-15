let taskDOM = document.querySelector('#task')
let addButtonDOM = document.querySelector('#liveToastBtn')
let alertDOM = document.querySelector('#liveToastWarning')
let alertAddDOM = document.querySelector('#liveToastSuccess')
let listTable = document.querySelector('#list')
let listDOM = document.querySelector('ul')
let close = document.getElementsByClassName("close")

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

localStorage.setItem('items', JSON.stringify(itemsArray))
let data = JSON.parse(localStorage.getItem('items'))

function liMaker(text) {
    const liDOM = document.createElement("li")
    liDOM.textContent = text
    listTable.appendChild(liDOM)

    let span = document.createElement("SPAN")
    let txt = document.createTextNode("\u00D7")

    span.className = "close"
    span.appendChild(txt)
    liDOM.appendChild(span)
}

function liDestroy(closedItem) {
    let filteredArrayList = JSON.parse(localStorage.getItem('items'))
    for(i=0; i< filteredArrayList.length; i++){
        console.log(filteredArrayList[i])
        if(filteredArrayList[i] == closedItem){
            filteredArrayList.splice(i, 1)
            console.log(filteredArrayList)
            break
        }
    }

    localStorage.setItem('items', JSON.stringify(filteredArrayList))
    console.log(filteredArrayList)
}

data.forEach(item => {
    liMaker(item)
})

addButtonDOM.addEventListener('click', addTask)

listDOM.addEventListener('click', function(e){
    if(e.target.tagName === 'LI'){
        if(e.target.classList.contains("checked")){
            e.target.classList.remove("checked")
        } else {
            e.target.setAttribute("class", "checked")
        }
    }
    if(e.target.tagName === 'SPAN'){
        let div = e.target.parentElement
        div.style.display ="none"
        let myObj = e.target.parentElement.childNodes[0].data
        liDestroy(myObj)
    }
})


function addTask(e){
    e.preventDefault()
    if(taskDOM.value && taskDOM.value.trim()){
        itemsArray.push(taskDOM.value)

        localStorage.setItem('items', JSON.stringify(itemsArray))

        liMaker(taskDOM.value)

        taskDOM.value = ""

        alertAddDOM.classList.remove('hide')
        alertAddDOM.classList.add('show')
    } else {
        alertDOM.classList.remove('hide')
        alertDOM.classList.add('show')
    }
}


