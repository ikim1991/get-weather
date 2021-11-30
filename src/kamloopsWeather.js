import axios from 'axios';
import cheerio from 'cheerio';

const getData = async () => {
    try{
        const url = "https://www.timeanddate.com/weather/canada/kamloops/ext"
        const { data } = await axios.get(url)
        const $ = cheerio.load(data);
        const weather = {}

        $('tbody > tr').each((index, element) => {
            weather[index] = {
                "day": $(element).find('th').text().slice(0,3).trim(),
                "date": $(element).find('th').text().slice(3).trim()
            }
            $(element).find('td').each((ind, el) => {
                if(ind === 1){
                    weather[index]['temperature'] = $(el).text().trim()
                }
                if(ind === 2){
                    weather[index]['weather'] = $(el).text().trim()
                }
                if(ind === 3){
                    weather[index]['feels-like'] = $(el).text().trim()
                }
                if(ind === 4){
                    weather[index]['wind'] = $(el).text().trim()
                }
                if(ind === 7){
                    weather[index]['pop'] = $(el).text().trim()
                }
                if(ind === 8){
                    weather[index]['amount'] = $(el).text().trim()
                }
                if(ind === 10){
                    weather[index]['sunrise'] = $(el).text().trim()
                }
                if(ind === 11){
                    weather[index]['sunset'] = $(el).text().trim()
                }
            })
        })

        return weather

    }catch(err){
        return new Error('Unable to Fetch Weather Data...')
    }
}

getData()