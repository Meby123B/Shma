import cities from "./cities.js";

const app = document.querySelector("#app");

const jerusalem = cities.jerusalem;
const betShemesh = cities.betShemesh;
const lod = cities.lod;

function printZmanShma(city, data){
    console.log('data:', data);
    const time = data.times.sofZmanShma.split("T")[1].split(':00')[0]

    const p = document.createElement('span')
    const btn = document.createElement('button')

    let text = `סוף זמן קריאת שמע <b>ב${city.name}</b> ${time} וצריך להקדים כמה דקות`
    let text2copy = `סוף זמן קריאת שמע *ב${city.name}* ${time} וצריך להקדים כמה דקות`
    p.innerHTML= text;
    
    btn.innerText= 'העתק ללוח'
    btn.onclick=()=>{
        navigator.clipboard.writeText(text2copy)
        btn.innerText= 'הועתק!'
        setTimeout(() => {
            btn.innerText = 'העתק ללוח'
        }, 1500);
    }
    app.append(p,btn,document.createElement('br'))
}


async function getData(city) {
    const res = await fetch("https://www.hebcal.com/zmanim?cfg=json&geonameid=" + city.geo)// + "&date=" + new Date().toISOString());
    const val = await res.json();
    console.log(val.times.sofZmanShma.split("T")[1].split('+')[0]);
    printZmanShma(city, val);
}


getData(lod)
getData(jerusalem)
getData(betShemesh)
