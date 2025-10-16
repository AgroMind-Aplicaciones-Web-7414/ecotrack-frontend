import axios from 'axios';

export class OrganizationApi {
    baseUrl = import.meta.env.VITE_API_BASE_URL;
    organizationsEndpoint = import.meta.env.VITE_ORGANIZATIONS_ENDPOINT;
    http = axios.create({ baseURL: this.baseUrl });

    async getAll() {
        try {
            const { data } = await this.http.get(this.organizationsEndpoint);
            return data;
        } catch (error) {
            console.error('Error fetching organizations:', error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const { data } = await this.http.get(`${this.organizationsEndpoint}/${id}`);
            return data;
        } catch (error) {
            console.error(`Error fetching organization ${id}:`, error);
            throw error;
        }
    }

    async create(organizationData) {
        try {
            const newOrganization = {
                id: String(Date.now()),
                ...organizationData,
                createdAt: new Date().toISOString().split('T')[0],
                status: 'active',
                members: []
            };

            const { data } = await this.http.post(this.organizationsEndpoint, newOrganization);
            return data;
        } catch (error) {
            console.error('Error creating organization:', error);
            throw error;
        }
    }

    async update(id, organizationData) {
        try {
            const { data } = await this.http.put(`${this.organizationsEndpoint}/${id}`, organizationData);
            return data;
        } catch (error) {
            console.error(`Error updating organization ${id}:`, error);
            throw error;
        }
    }

    async delete(id) {
        try {
            await this.http.delete(`${this.organizationsEndpoint}/${id}`);
            return true;
        } catch (error) {
            console.error(`Error deleting organization ${id}:`, error);
            throw error;
        }
    }

    async addMember(organizationId, memberId) {
        try {
            const organization = await this.getById(organizationId);
            if (!organization.members.includes(memberId)) {
                organization.members.push(memberId);
                return await this.update(organizationId, organization);
            }
            return organization;
        } catch (error) {
            console.error(`Error adding member to organization ${organizationId}:`, error);
            throw error;
        }
    }

    async removeMember(organizationId, memberId) {
        try {
            const organization = await this.getById(organizationId);
            organization.members = organization.members.filter(id => id !== memberId);
            return await this.update(organizationId, organization);
        } catch (error) {
            console.error(`Error removing member from organization ${organizationId}:`, error);
            throw error;
        }
    }
}
