import {getZmanim} from './index.js'
import loading from './loading.js';
import DataBase from './storage.js' 


function start(){
    const btn = document.querySelector('.search > button')
    const inp = document.querySelector('.search > input')
    
    btn.onclick = () => {
        getCity(inp.value)
        loading.show()
    };
}

async function getCity(name, featureCode = 'PPL') {
    try {

        let req = await fetch('https://secure.geonames.org/searchJSON?q=' + name + '&maxRows=10&featureCode=' + featureCode + '&country=IL&username=mebyberger')
        let data = await req.json()

        console.log('data', featureCode, data.geonames);
        if (data.geonames.length != 1) { // not found or found many

            if (featureCode == 'STLMT') { 
                loading.hide()
                return alert('העיר ' + name + ' לא נמצאה במערכת') 
            }
            getCity(name, featureCode == 'PPL' ? 'PPLA' : 'STLMT')
            return
        }
        const geo = data.geonames[0].geonameId;
        console.log('geo', geo); // print geo id

        const obj = { // create city obj
            name,
            geo
        }
        new DataBase('cities').add(obj)
        getZmanim(obj) 

    } catch (error) {
        console.error(error);
    }

}
export default start