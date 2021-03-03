function getHistory(){
    let history = []
    if(localStorage.getItem('history') != null){
        history = JSON.parse(localStorage.getItem('history'));
    }   
    return history;
}

function removeHistory(){
    localStorage.setItem('history',JSON.stringify([]));
}

function addHistory(newSearch){
    let history = [];
    if(localStorage.getItem('history') != null){
        history = JSON.parse(localStorage.getItem('history'));
    }  
    history.push(newSearch);
    localStorage.setItem('history',JSON.stringify(history));
}

addHistory('flutter');
let x = getHistory()
console.log(x)
