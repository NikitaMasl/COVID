export function sortData(data) {
    let sortedData={
        russia:[],
        moscow:[],
        saintp:[]
    }
    data.forEach( el => {
        let ru = {};
        let msc = {};
        let spb = {};
        for(let key in el){
            if(key === "Дата"){
                ru.date = el[key]; 
                msc.date = el[key];
                spb.date = el[key];
            }
            if(key.match(/СПб/)){
                if(key.split(' ')[1] === "Выявленные"){
                    spb.confirmed = el[key]
                }
                if(key.split(' ')[1] === "Выздоровевшие"){
                    spb.recovered = el[key]
                }
                if(key.split(' ')[1] === "За"){
                    spb.confirmedThisDay = el[key]
                }
                if(key.split(' ')[1] === "Болеющие"){
                    spb.sick = el[key]
                }
                if(key.split(' ')[1] === "Умершие"){
                    spb.deaths = el[key]
                }
            }
            if(key.match(/Москва/)){
                if(key.split(' ')[1] === "Выявленные"){
                    msc.confirmed = el[key]
                }
                if(key.split(' ')[1] === "Выздоровевшие"){
                    msc.recovered = el[key]
                }
                if(key.split(' ')[1] === "За"){
                    msc.confirmedThisDay = el[key]
                }
                if(key.split(' ')[1] === "Болеющие"){
                    msc.sick = el[key]
                }
                if(key.split(' ')[1] === "Умершие"){
                    msc.deaths = el[key]
                }
            }
            if(key.match(/Россия/)){
                if(key.split(' ')[1] === "Выявленные"){
                    ru.confirmed = el[key]
                }
                if(key.split(' ')[1] === "Выздоровевшие"){
                    ru.recovered = el[key]
                }
                if(key.split(' ')[1] === "За"){
                    ru.confirmedThisDay = el[key]
                }
                if(key.split(' ')[1] === "Болеющие"){
                    ru.sick = el[key]
                }
                if(key.split(' ')[1] === "Умершие"){
                    ru.deaths = el[key]
                }
            }
        }
        sortedData.russia.push(ru);
        sortedData.moscow.push(msc);
        sortedData.saintp.push(spb);
    })
    return sortedData;
}

export function formatDate(date) {
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    let yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;
  
    return dd + '.' + mm + '.' + yy;
}

function diff (today){
    let d1 = new Date('Monday, March 02, 2020');
    let d2 = new Date(today);
    let diff = d2 - d1;
    let milliseconds = diff;
    let seconds = milliseconds / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;
    return Math.floor(days);
}

export function getDate(data){
    let date = data.map( el => {

        return formatDate(new Date(el.date))
    })
    return date
}

export function getConfirmed(data){
    let confirmed = data.map( (el, index) => {
        if(index < diff(new Date())){
            if(el.confirmed){
                return el.confirmed
            }else{
                return 0
            }
        }
        if(index>=diff(new Date())){
            if(el.confirmed){
                return el.confirmed
            }
            else return null
        }
        return null
    })
    return confirmed
}

export function getRecovered(data){
    let recovered = data.map( (el, index) => {
        if(index < diff(new Date())){
            if(el.recovered){
                return el.recovered
            }else{
                return 0
            }
        }
        if(index>=diff(new Date())){
            if(el.recovered){
                return el.recovered
            }
            else return null
        }
        return null
    })
    return recovered
}

export function getDailyConfirmed(data){
    let confirmedThisDay = data.map( (el, index) => {
        if(index < diff(new Date())){
            if(el.confirmedThisDay){
                return el.confirmedThisDay
            }else{
                return 0
            }
        }
        if(index>=diff(new Date())){
            if(el.confirmedThisDay){
                return el.confirmedThisDay
            }
            else return null
        }
        return null
    })
    return confirmedThisDay
}

export function getDeaths(data){
    let deaths = data.map( (el, index) => {
        if(index < diff(new Date())){
            if(el.deaths){
                return el.deaths
            }else{
                return 0
            }
        }
        if(index>=diff(new Date())){
            if(el.deaths){
                return el.deaths
            }
            else return null
        }
        return null
    })
    return deaths
}

export function setDailyParam(data){
    let dailyParam = {
        confirmed:'',
        deaths:'',
        recovered:'',
        confirmedForThisDay:''
    }
    data.forEach( el => {
            if(formatDate(new Date(el.date)) === formatDate(new Date())){                
                dailyParam.confirmed=el.confirmed;
                dailyParam.deaths=el.deaths
                dailyParam.recovered=el.recovered
                dailyParam.confirmedForThisDay=el.confirmedThisDay
            }
        })
    return dailyParam;
}

