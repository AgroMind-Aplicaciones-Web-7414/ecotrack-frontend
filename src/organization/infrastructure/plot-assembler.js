import { Plot } from '../domain/plot.entity.js';

export class PlotAssembler {
    /**
     * Converts raw API data to Plot entity
     * @param {Object} data - Raw data from API
     * @returns {Plot}
     */
    toPlot(data) {
        return new Plot({
            id: data.id,
            organizationId: data.organizationId,
            name: data.name,
            area: data.area,
            location: data.location,
            crop: data.crop,
            status: data.status,
            createdAt: data.createdAt,
            members: data.members || []
        });
    }

    /**
     * Converts Plot entity to API format
     * @param {Plot} plot - Plot entity
     * @returns {Object}
     */
    toApiFormat(plot) {
        return {
            id: plot.id,
            organizationId: plot.organizationId,
            name: plot.name,
            area: plot.area,
            location: plot.location,
            crop: plot.crop,
            status: plot.status,
            createdAt: plot.createdAt,
            members: plot.members
        };
    }

    /**
     * Converts array of raw API data to array of Plot entities
     * @param {Array} dataArray - Array of raw data from API
     * @returns {Array<Plot>}
     */
    toPlotArray(dataArray) {
        return dataArray.map(data => this.toPlot(data));
    }

    /**
     * Converts create/update form data to API format
     * @param {Object} formData - Form data from UI
     * @returns {Object}
     */
    fromFormData(formData) {
        return {
            organizationId: formData.organizationId,
            name: formData.name,
            area: formData.area,
            location: formData.location,
            crop: formData.crop,
            members: formData.members || []
        };
    }
}
