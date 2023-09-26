import defaultCities from "./cities.js";
import loading from "./loading.js";
import setSearch from "./search.js";
import DataBase from './storage.js'

setSearch()
const app = document.querySelector("#app");

const storage = new DataBase('cities')

function getCities() {
    let cities = storage.getData()
    if (cities.length == 0) {
        cities = defaultCities;
        cities.forEach(city => storage.add(city))
    }
    return cities
}
let cities = getCities()


function printZmanShma(city, data) {
    loading.hide()
    console.log('city:', data.location.city);
    const time = data.times.sofZmanShma.split("T")[1].split('+')[0]
    console.log('time', time);

    const div = document.createElement('div')
    div.className = 'city'

    const p = document.createElement('p')
    const copyBtn = document.createElement('button')
    const delBtn = document.createElement('button')

    let text = `סוף זמן קריאת שמע <br>ב<b>${city.name}</b> ${time}`
    let text2copy = `בוקר טוב. סוף זמן קריאת שמע ב*${city.name}* ${roundTime(time)} ויש להקדים מספר דקות`
    p.innerHTML = text;

    copyBtn.innerText = '📋'
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(text2copy)
        copyBtn.innerText = 'הועתק!'
        setTimeout(() => {
            copyBtn.innerText = '📋'
        }, 1500);
    }

    delBtn.innerText = '🗑️'
    delBtn.onclick = () => {
        storage.remove(city)
        reset()
    }
    div.append(delBtn, p, copyBtn)
    app.append(div)
}

function reset() {
    app.innerHTML = ''
    cities = getCities()
    cities.forEach(city => getZmanim(city))
}

export async function getZmanim(city) {
    const res = await fetch("https://www.hebcal.com/zmanim?cfg=json&sec=1&geonameid=" + city.geo)// + "&date=" + new Date().toISOString());
    const val = await res.json();

    printZmanShma(city, val);
}

function roundTime(time = '11:22:33') {
    const split = time.split(':')
    split.forEach((s, i, arr) => arr[i] = Number(s))
    split[1] += split[2] > 30 ? 1 : 0;

    const joined = split[0] + ':' + split[1]
    return joined
}

cities.forEach(city => getZmanim(city))