export class Crop{
    constructor({id = null, name, surface, location, plantingDate}){
        this.id = id
        this.name = name
        this.surface = surface
        this.location = location
        this.plantingDate = plantingDate
    }
}