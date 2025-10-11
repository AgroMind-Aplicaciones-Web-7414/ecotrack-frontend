import { reactive } from 'vue';
import { CultivationApi } from '../infrastructure/cultivation-api.js';
import { CultivationAssembler } from '../infrastructure/cultivation.assembler.js';

class CultivationService {
    state = reactive({
        cultivations: [],
        currentCultivation: null,
        loading: false,
        error: null
    });

    #api = new CultivationApi();
    #assembler = new CultivationAssembler();

    /**
     * Get all cultivations
     * @returns {Promise<Array<Cultivation>>}
     */
    async getAllCultivations() {
        this.state.loading = true;
        this.state.error = null;

        try {
            const data = await this.#api.getAll();
            this.state.cultivations = this.#assembler.toCultivationArray(data);
            return this.state.cultivations;
        } catch (error) {
            this.state.error = 'Error al cargar los cultivos';
            console.error('Error fetching cultivations:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Get cultivations by farmer ID
     * @param {string} farmerId - Farmer ID
     * @returns {Promise<Array<Cultivation>>}
     */
    async getCultivationsByFarmerId(farmerId) {
        this.state.loading = true;
        this.state.error = null;

        try {
            const data = await this.#api.getByFarmerId(farmerId);
            const cultivations = this.#assembler.toCultivationArray(data);
            this.state.cultivations = cultivations;
            return cultivations;
        } catch (error) {
            this.state.error = 'Error al cargar los cultivos del agricultor';
            console.error('Error fetching cultivations by farmer:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Create new cultivation
     * @param {Object} cultivationData - Cultivation form data
     * @returns {Promise<Cultivation>}
     */
    async createCrop(cultivationData) {
        this.state.loading = true;
        this.state.error = null;

        try {
            const apiData = this.#assembler.fromFormData(cultivationData);
            const createdData = await this.#api.create(apiData);
            const newCultivation = this.#assembler.toCultivation(createdData);

            // Add to local state
            this.state.cultivations.push(newCultivation);

            return newCultivation;
        } catch (error) {
            this.state.error = 'Error al crear el cultivo';
            console.error('Error creating cultivation:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Update cultivation
     * @param {string} id - Cultivation ID
     * @param {Object} cultivationData - Updated cultivation data
     * @returns {Promise<Cultivation>}
     */
    async updateCultivation(id, cultivationData) {
        this.state.loading = true;
        this.state.error = null;

        try {
            const apiData = this.#assembler.fromFormData(cultivationData);
            const updatedData = await this.#api.update(id, apiData);
            const updatedCultivation = this.#assembler.toCultivation(updatedData);

            // Update in local state
            const index = this.state.cultivations.findIndex(cultivation => cultivation.id === id);
            if (index !== -1) {
                this.state.cultivations[index] = updatedCultivation;
            }

            if (this.state.currentCultivation?.id === id) {
                this.state.currentCultivation = updatedCultivation;
            }

            return updatedCultivation;
        } catch (error) {
            this.state.error = 'Error al actualizar el cultivo';
            console.error('Error updating cultivation:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Delete cultivation
     * @param {string} id - Cultivation ID
     * @returns {Promise<boolean>}
     */
    async deleteCultivation(id) {
        this.state.loading = true;
        this.state.error = null;

        try {
            await this.#api.delete(id);

            // Remove from local state
            this.state.cultivations = this.state.cultivations.filter(cultivation => cultivation.id !== id);

            if (this.state.currentCultivation?.id === id) {
                this.state.currentCultivation = null;
            }

            return true;
        } catch (error) {
            this.state.error = 'Error al eliminar el cultivo';
            console.error('Error deleting cultivation:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Clear error state
     */
    clearError() {
        this.state.error = null;
    }
}

// Export singleton instance
export const cultivationService = new CultivationService();

// Mantener compatibilidad con el código existente
export { CultivationService };
