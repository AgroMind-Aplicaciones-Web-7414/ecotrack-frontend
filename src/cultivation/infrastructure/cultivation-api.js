import axios from 'axios';

export class CultivationApi {
    baseUrl = import.meta.env.VITE_API_BASE_URL;
    cultivationsEndpoint = import.meta.env.VITE_CULTIVATIONS_ENDPOINT;
    http = axios.create({ baseURL: this.baseUrl });

    async getAll() {
        try {
            const { data } = await this.http.get(this.cultivationsEndpoint);
            return data;
        } catch (error) {
            console.error('Error fetching cultivations:', error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const { data } = await this.http.get(`${this.cultivationsEndpoint}/${id}`);
            return data;
        } catch (error) {
            console.error(`Error fetching cultivation ${id}:`, error);
            throw error;
        }
    }

    async getByFarmerId(farmerId) {
        try {
            const { data } = await this.http.get(`${this.cultivationsEndpoint}?farmerId=${farmerId}`);
            return data;
        } catch (error) {
            console.error(`Error fetching cultivations for farmer ${farmerId}:`, error);
            throw error;
        }
    }

    async getByOrganizationId(organizationId) {
        try {
            const { data } = await this.http.get(`${this.cultivationsEndpoint}?organizationId=${organizationId}`);
            return data;
        } catch (error) {
            console.error(`Error fetching cultivations for organization ${organizationId}:`, error);
            throw error;
        }
    }

    async create(cultivationData) {
        try {
            const newCultivation = {
                id: String(Date.now()),
                ...cultivationData,
                createdAt: new Date().toISOString().split('T')[0],
                status: 'active'
            };

            const { data } = await this.http.post(this.cultivationsEndpoint, newCultivation);
            return data;
        } catch (error) {
            console.error('Error creating cultivation:', error);
            throw error;
        }
    }

    async update(id, cultivationData) {
        try {
            const { data } = await this.http.put(`${this.cultivationsEndpoint}/${id}`, cultivationData);
            return data;
        } catch (error) {
            console.error(`Error updating cultivation ${id}:`, error);
            throw error;
        }
    }

    async delete(id) {
        try {
            await this.http.delete(`${this.cultivationsEndpoint}/${id}`);
            return true;
        } catch (error) {
            console.error(`Error deleting cultivation ${id}:`, error);
            throw error;
        }
    }
}