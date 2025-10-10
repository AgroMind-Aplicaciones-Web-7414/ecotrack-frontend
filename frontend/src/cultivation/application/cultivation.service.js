import {CultivationApi} from '../infrastructure/cultivation-api.js'

export class CultivationService {

    constructor(){
        this.cropApi = new CultivationApi()
    }

    async createCrop(resource){
        return await this.cropApi.createCrop(resource);
    }

    async getCrops(){
        return await this.cropApi.getCrops()
    }
}