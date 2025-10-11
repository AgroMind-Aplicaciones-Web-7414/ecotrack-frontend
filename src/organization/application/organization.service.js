import { reactive } from 'vue';
import { OrganizationApi } from '../infrastructure/organization-api.js';
import { OrganizationAssembler } from '../infrastructure/organization-assembler.js';

class OrganizationService {
    state = reactive({
        organizations: [],
        currentOrganization: null,
        loading: false,
        error: null
    });

    #api = new OrganizationApi();
    #assembler = new OrganizationAssembler();

    /**
     * Get all organizations
     * @returns {Promise<Array<Organization>>}
     */
    async getAllOrganizations() {
        this.state.loading = true;
        this.state.error = null;

        try {
            const data = await this.#api.getAll();
            this.state.organizations = this.#assembler.toOrganizationArray(data);
            return this.state.organizations;
        } catch (error) {
            this.state.error = 'Error al cargar las organizaciones';
            console.error('Error fetching organizations:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Get organization by ID
     * @param {string} id - Organization ID
     * @returns {Promise<Organization>}
     */
    async getOrganizationById(id) {
        this.state.loading = true;
        this.state.error = null;

        try {
            const data = await this.#api.getById(id);
            this.state.currentOrganization = this.#assembler.toOrganization(data);
            return this.state.currentOrganization;
        } catch (error) {
            this.state.error = 'Error al cargar la organización';
            console.error('Error fetching organization:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Create new organization
     * @param {Object} organizationData - Organization form data
     * @returns {Promise<Organization>}
     */
    async createOrganization(organizationData) {
        this.state.loading = true;
        this.state.error = null;

        try {
            const apiData = this.#assembler.fromFormData(organizationData);
            const createdData = await this.#api.create(apiData);
            const newOrganization = this.#assembler.toOrganization(createdData);

            // Add to local state
            this.state.organizations.push(newOrganization);

            return newOrganization;
        } catch (error) {
            this.state.error = 'Error al crear la organización';
            console.error('Error creating organization:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Update organization
     * @param {string} id - Organization ID
     * @param {Object} organizationData - Updated organization data
     * @returns {Promise<Organization>}
     */
    async updateOrganization(id, organizationData) {
        this.state.loading = true;
        this.state.error = null;

        try {
            const apiData = this.#assembler.fromFormData(organizationData);
            const updatedData = await this.#api.update(id, apiData);
            const updatedOrganization = this.#assembler.toOrganization(updatedData);

            // Update in local state
            const index = this.state.organizations.findIndex(org => org.id === id);
            if (index !== -1) {
                this.state.organizations[index] = updatedOrganization;
            }

            if (this.state.currentOrganization?.id === id) {
                this.state.currentOrganization = updatedOrganization;
            }

            return updatedOrganization;
        } catch (error) {
            this.state.error = 'Error al actualizar la organización';
            console.error('Error updating organization:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Delete organization
     * @param {string} id - Organization ID
     * @returns {Promise<boolean>}
     */
    async deleteOrganization(id) {
        this.state.loading = true;
        this.state.error = null;

        try {
            await this.#api.delete(id);

            // Remove from local state
            this.state.organizations = this.state.organizations.filter(org => org.id !== id);

            if (this.state.currentOrganization?.id === id) {
                this.state.currentOrganization = null;
            }

            return true;
        } catch (error) {
            this.state.error = 'Error al eliminar la organización';
            console.error('Error deleting organization:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Add member to organization
     * @param {string} organizationId - Organization ID
     * @param {string} memberId - Member ID
     * @returns {Promise<Organization>}
     */
    async addMember(organizationId, memberId) {
        this.state.loading = true;
        this.state.error = null;

        try {
            const updatedData = await this.#api.addMember(organizationId, memberId);
            const updatedOrganization = this.#assembler.toOrganization(updatedData);

            // Update in local state
            const index = this.state.organizations.findIndex(org => org.id === organizationId);
            if (index !== -1) {
                this.state.organizations[index] = updatedOrganization;
            }

            if (this.state.currentOrganization?.id === organizationId) {
                this.state.currentOrganization = updatedOrganization;
            }

            return updatedOrganization;
        } catch (error) {
            this.state.error = 'Error al agregar miembro';
            console.error('Error adding member:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Remove member from organization
     * @param {string} organizationId - Organization ID
     * @param {string} memberId - Member ID
     * @returns {Promise<Organization>}
     */
    async removeMember(organizationId, memberId) {
        this.state.loading = true;
        this.state.error = null;

        try {
            const updatedData = await this.#api.removeMember(organizationId, memberId);
            const updatedOrganization = this.#assembler.toOrganization(updatedData);

            // Update in local state
            const index = this.state.organizations.findIndex(org => org.id === organizationId);
            if (index !== -1) {
                this.state.organizations[index] = updatedOrganization;
            }

            if (this.state.currentOrganization?.id === organizationId) {
                this.state.currentOrganization = updatedOrganization;
            }

            return updatedOrganization;
        } catch (error) {
            this.state.error = 'Error al remover miembro';
            console.error('Error removing member:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Clear current organization
     */
    clearCurrentOrganization() {
        this.state.currentOrganization = null;
    }

    /**
     * Clear error state
     */
    clearError() {
        this.state.error = null;
    }
}

// Export singleton instance
export const organizationService = new OrganizationService();
