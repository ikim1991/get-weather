import axios from 'axios';
import cheerio from 'cheerio';

const getData = async () => {
    try{
        const url = "https://weather.interia.com/long-term-forecast-barnhartvale,cId,121290"
        const { data } = await axios.get(url)

        const $ = cheerio.load(data);
        let day; let date; let high; let low; let wind; let rain; let sunrise; let sunset

        day = $('span.day').map((ind, el) => {
            return $(el).text().trim()
        }).get()

        date = $('span.date').map((ind, el) => {
            return $(el).text().trim()
        }).get()

        high = $('span.weather-forecast-longterm-list-entry-forecast-temp.unitE-BI').map((ind, el) => {
            return $(el).text().trim()
        }).get()

        low = $('span.weather-forecast-longterm-list-entry-forecast-lowtemp.unitE-BI').map((ind, el) => {
            return $(el).text().trim()
        }).get()

        wind = $('span.weather-forecast-longterm-list-entry-wind-value').map((ind, el) => {
            return `${$(el).text().trim()} km/h`
        }).get()

        rain = $('span.weather-forecast-longterm-list-entry-precipitation-value.unitE-BI').map((ind, el) => {
            return $(el).text().trim().replace(",", ".")
        }).get()

        sunrise = $('span.weather-forecast-longterm-list-entry-sun-sunrise-value').map((ind, el) => {
            return $(el).text().trim()
        }).get()

        sunset = $('span.weather-forecast-longterm-list-entry-sun-sunset-value').map((ind, el) => {
            return $(el).text().trim()
        }).get()

        return {
            day, date, high, low, wind, rain, sunrise, sunset
        }

    }catch(err){
        return new Error('Unable to Fetch Weather Data...')
    }
}

getData().then(data => console.log(data))