import cities from "./cities.js";

const btn = document.querySelector('.search > button')
const inp = document.querySelector('.search > input')

btn.onclick = (e) => {
    getCity(inp.value)
};

async function getCity(name, featureCode='PPL') {
    try {
        
        let req = await fetch('https://secure.geonames.org/searchJSON?q=' + name + '&maxRows=10&featureCode='+featureCode+'&country=IL&username=mebyberger')
        let data = await req.json()
        
        console.log('data',featureCode, data.geonames);
        if (data.geonames.length != 1) {

            if (featureCode=='STLMT') {return alert('העיר '+name+' לא נמצאה במערכת')}
            getCity(name, featureCode=='PPL' ? 'PPLA' : 'STLMT')
            return
        }
        console.log('data', data.geonames[0].geonameId);
        const obj = {
            name,
            geo: data.geonames[0].geonameId
        }
        getData(obj)

    } catch (error) {
        console.error(error);
    }
        
    }



const app = document.querySelector("#app");

const jerusalem = cities.jerusalem;
const betShemesh = cities.betShemesh;
const lod = cities.lod;



function printZmanShma(city, data) {
    console.log('data:', data);
    const time = data.times.sofZmanShma.split("T")[1].split('+')[0]

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
