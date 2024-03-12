// ** Http
import http from "./http.service";

// ** Utils
import Promisable from "utils/promise.util";

// ** config
import { API_NEWAPI_KEY } from 'config/config'

let url = 'country=de&lang=en'


const NewsService = {
    getNewsapi: async (query) => {
        let string = '';
        if (query) {
            const { category, startDate, endDate, source, article } = query
            if (source  || article ) {
                if (source && source !== '') string += `&sources=${source}`
                if (article && article !== '') string += `&q=${article}`

            } else {
                if (category)
                    string += `&category=${category}`
                else string += "&category=general"

                if (startDate && endDate)
                    string += `&from=${startDate}&to=${endDate}`
            }


        } else {
            string += "&category=general"
        }
        string += `&apikey=${API_NEWAPI_KEY}`
        console.log("string", string)
        const [success, error] = await Promisable.asPromise(
            http.get(`${url}${string}`)
        );
        return [success, error];
    },


};

export default NewsService;
