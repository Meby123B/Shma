


function createNotification(sofZman='09:31:23'){
    Notification.requestPermission().then(perm => console.log('perm',perm))
    setTimeout(() => {
    
        new Notification('סוף זמן קריאת שמע',{body:'בשעה '+sofZman+' שזה בעוד '+Math.floor(calculateDeltaTime(sofZman)/60)+'דקות ',icon:'https://rabenu.com/images/content/items/cache/b74e7f845f25fe403cf91ffa0d8e7c43_XL.jpg'})
    }, 5000);
}

function calculateDeltaTime(str=''){
    const date = new Date()
    let now = date.getSeconds()
    now += date.getMinutes() * 60 
    now += date.getHours() * 60 *60 

    str = str.split(':')
    str = str.map(num => Number(num))
    
    let sofZman = str[2]
    sofZman += str[1] *60
    sofZman += str[0] *60 * 60

    return sofZman - now
}

export default createNotification;