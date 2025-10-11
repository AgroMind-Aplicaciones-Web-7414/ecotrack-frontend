import {CultivationAssembler} from './cultivation.assembler.js'
import axios from 'axios'

export class CultivationApi {
    baseUrl = import.meta.env.VITE_API_BASE_URL;
    cropsEndpoint = import.meta.env.VITE_CROPS_ENDPOINT;

    async getCrops(){
        try{
            const endpoint = `${this.baseUrl}${this.cropsEndpoint}`
            const response = await axios.get(endpoint)
            return response.data.map(crop=>CultivationAssembler.toEntityFromResponse(crop))
        }catch(error) {
            console.log(error.message)
        }
    }
    async createCrop(resource){
        try{
            const crop = CultivationAssembler.toEntityFromResource(resource)
            const endpoint = `${this.baseUrl}${this.cropsEndpoint}`
            const response = await axios.post(endpoint, crop)
            return true
        }catch(error){
            console.log(error.message)
        }
    }
}