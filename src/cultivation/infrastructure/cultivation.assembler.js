import {Crop} from '../domain/model/cultivation.entity.js'

export class CultivationAssembler {
    static toEntityFromResponse(response){
        return new Crop({
            id: response.id,
            name: response.name,
            surface: response.surface,
            location: response.location,
            plantingDate: response.plantingDate
        })
    }

    static toEntityFromResource(resource){
        return new Crop({
            id: null,
            name: resource.name,
            surface: resource.surface,
            location: resource.location,
            plantingDate: resource.plantingDate
        })
    }
}