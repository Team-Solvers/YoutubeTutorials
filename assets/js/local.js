export function getHistory(){
    let history = []
    if(localStorage.getItem('history') != null){
        history = JSON.parse(localStorage.getItem('history'));
    }   
    return history;
}

export function removeHistory(){
    localStorage.setItem('history',JSON.stringify([]));
}

export function addHistory(newSearch){
    let history = [];
    if(localStorage.getItem('history') != null){
        history = JSON.parse(localStorage.getItem('history'));
    }  
    history.push(newSearch);
    localStorage.setItem('history',JSON.stringify(history));
}


