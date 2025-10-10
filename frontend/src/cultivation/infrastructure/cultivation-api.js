import {CultivationAssembler} from './cultivation.assembler.js'
import axios from 'axios'

const API_URL = "http://localhost:3000/crops"

export class CultivationApi {
    async getCrops(){
        try{
            const response = await axios.get(API_URL)
            return response.data.map(crop=>CultivationAssembler.toEntityFromResponse(crop))
        }catch(error) {
            console.log(error.message)
        }
    }
    async createCrop(resource){
        try{
            const crop = CultivationAssembler.toEntityFromResource(resource)
            const response = await axios.post(API_URL, crop)
            return true
        }catch(error){
            console.log(error.message)
        }
    }
}