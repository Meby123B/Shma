export default class DataBase {
    key = 'lsKey'
    constructor(key = '') {
        this.key = key;
        this.getData()
    }

    getData() {
        const rawData = localStorage.getItem(this.key);
        if (rawData === null) { this.#reset() }
        const data = JSON.parse(rawData);
        return data;
    }

    #setData(data=[]) {
        const dataAsJson = JSON.stringify(data)
        localStorage.setItem(this.key, dataAsJson)
    }

    add(obj = {}) {
        const data = this.getData()
        data.push(obj)
        this.#setData(data)
    }

    remove(obj = {}) {
        const data = this.getData()

        const index = data.findIndex(objInData => {
            return Object.keys(obj).every(key => {
            return objInData[key] === obj[key]
        })})
        if(index === -1) { return console.log('notfound') }

        data.splice(index,1)
        this.#setData(data)
    }
    
    #reset() {
        const defaultItem = JSON.stringify([])
        localStorage.setItem(this.key, defaultItem)
    }

}