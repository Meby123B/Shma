import cities from "./cities.js";

const btn = document.querySelector('.search > button')
const inp = document.querySelector('.search > input')

btn.onclick = (e) => {
    getCity(inp.value)
};

async function getCity(name) {
    let req = await fetch('http://api.geonames.org/searchJSON?q=' + name + '&maxRows=10&featureCode=PPLA&country=IL&username=mebyberger')
    let data = await req.json()

    console.log('data', data.geonames);
    // if (data.geonames.length != 1) {
    //     console.log('true');
    //     req = await fetch('http://api.geonames.org/searchJSON?q=' + name + '&maxRows=5&featureCode=PPLA&username=mebyberger')
    //     data = await req.json()
    // }
    console.log('data', data.geonames[0].geonameId);
    const obj = {
        name,
        geo: data.geonames[0].geonameId
    }
    getData(obj)

}



const app = document.querySelector("#app");

const jerusalem = cities.jerusalem;
const betShemesh = cities.betShemesh;
const lod = cities.lod;



function printZmanShma(city, data) {
    console.log('data:', data);
    const time = data.times.sofZmanShma.split("T")[1].split(':00')[0]

    const p = document.createElement('span')
    const btn = document.createElement('button')

    let text = `סוף זמן קריאת שמע ב<b>${city.name}</b> ${time}`
    let text2copy = `בוקר טוב. סוף זמן קריאת שמע ב*${city.name}* ${time} ויש להקדים מספר דקות`
    p.innerHTML= text;
    
    btn.innerText= 'העתק ללוח'
    btn.onclick=()=>{
        navigator.clipboard.writeText(text2copy)
        btn.innerText = 'הועתק!'
        setTimeout(() => {
            btn.innerText = 'העתק ללוח'
        }, 1500);
    }
    app.append(p, btn, document.createElement('br'))
}


export async function getData(city) {
    const res = await fetch("https://www.hebcal.com/zmanim?cfg=json&sec=1&geonameid=" + city.geo)// + "&date=" + new Date().toISOString());
    const val = await res.json();
    console.log(val.times.sofZmanShma.split("T")[1].split('+')[0]);
    printZmanShma(city, val);
}

getData(lod)
getData(jerusalem)
getData(betShemesh)
getData(cities.talmon)
