import axios from 'axios';

export class PlotsApi {
    baseUrl = import.meta.env.VITE_API_BASE_URL;
    plotsEndpoint = import.meta.env.VITE_PLOTS_ENDPOINT;
    http = axios.create({ baseURL: this.baseUrl });

    async getAll() {
        try {
            const { data } = await this.http.get(this.plotsEndpoint);
            return data;
        } catch (error) {
            console.error('Error fetching plots:', error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const { data } = await this.http.get(`${this.plotsEndpoint}/${id}`);
            return data;
        } catch (error) {
            console.error(`Error fetching plot ${id}:`, error);
            throw error;
        }
    }

    async getByOrganizationId(organizationId) {
        try {
            const { data } = await this.http.get(`${this.plotsEndpoint}?organizationId=${organizationId}`);
            return data;
        } catch (error) {
            console.error(`Error fetching plots for organization ${organizationId}:`, error);
            throw error;
        }
    }

    async create(plotData) {
        try {
            const newPlot = {
                id: String(Date.now()),
                ...plotData,
                createdAt: new Date().toISOString().split('T')[0],
                status: 'active',
                members: plotData.members || []
            };

            const { data } = await this.http.post(this.plotsEndpoint, newPlot);
            return data;
        } catch (error) {
            console.error('Error creating plot:', error);
            throw error;
        }
    }

    async update(id, plotData) {
        try {
            const { data } = await this.http.put(`${this.plotsEndpoint}/${id}`, plotData);
            return data;
        } catch (error) {
            console.error(`Error updating plot ${id}:`, error);
            throw error;
        }
    }

    async delete(id) {
        try {
            await this.http.delete(`${this.plotsEndpoint}/${id}`);
            return true;
        } catch (error) {
            console.error(`Error deleting plot ${id}:`, error);
            throw error;
        }
    }

    async addMember(plotId, memberId) {
        try {
            const plot = await this.getById(plotId);
            if (!plot.members.includes(memberId)) {
                plot.members.push(memberId);
                return await this.update(plotId, plot);
            }
            return plot;
        } catch (error) {
            console.error(`Error adding member to plot ${plotId}:`, error);
            throw error;
        }
    }

    async removeMember(plotId, memberId) {
        try {
            const plot = await this.getById(plotId);
            plot.members = plot.members.filter(id => id !== memberId);
            return await this.update(plotId, plot);
        } catch (error) {
            console.error(`Error removing member from plot ${plotId}:`, error);
            throw error;
        }
    }
}
