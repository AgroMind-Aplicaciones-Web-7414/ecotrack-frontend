import { Cultivation } from '../domain/model/cultivation.entity.js';

export class CultivationAssembler {
    /**
     * Converts raw API data to Cultivation entity
     * @param {Object} data - Raw data from API
     * @returns {Cultivation}
     */
    toCultivation(data) {
        return new Cultivation({
            id: data.id,
            name: data.name,
            surface: data.surface,
            location: data.location,
            plantingDate: data.plantingDate,
            farmerId: data.farmerId,
            organizationId: data.organizationId,
            status: data.status,
            variety: data.variety,
            growthStage: data.growthStage,
            createdAt: data.createdAt
        });
    }

    /**
     * Converts Cultivation entity to API format
     * @param {Cultivation} cultivation - Cultivation entity
     * @returns {Object}
     */
    toApiFormat(cultivation) {
        return {
            id: cultivation.id,
            name: cultivation.name,
            surface: cultivation.surface,
            location: cultivation.location,
            plantingDate: cultivation.plantingDate,
            farmerId: cultivation.farmerId,
            organizationId: cultivation.organizationId,
            status: cultivation.status,
            variety: cultivation.variety,
            growthStage: cultivation.growthStage,
            createdAt: cultivation.createdAt
        };
    }

    /**
     * Converts array of raw API data to array of Cultivation entities
     * @param {Array} dataArray - Array of raw data from API
     * @returns {Array<Cultivation>}
     */
    toCultivationArray(dataArray) {
        return dataArray.map(data => this.toCultivation(data));
    }

    /**
     * Converts create/update form data to API format
     * @param {Object} formData - Form data from UI
     * @returns {Object}
     */
    fromFormData(formData) {
        return {
            name: formData.name,
            surface: formData.surface,
            location: formData.location,
            plantingDate: formData.plantingDate,
            farmerId: formData.farmerId,
            organizationId: formData.organizationId,
            variety: formData.variety,
            growthStage: formData.growthStage || 'Siembra'
        };
    }
}