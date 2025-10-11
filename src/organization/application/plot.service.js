import { reactive } from 'vue';
import { PlotsApi } from '../infrastructure/plots.api.js';
import { PlotAssembler } from '../infrastructure/plot-assembler.js';

class PlotService {
    state = reactive({
        plots: [],
        currentPlot: null,
        loading: false,
        error: null
    });

    #api = new PlotsApi();
    #assembler = new PlotAssembler();

    /**
     * Get all plots
     * @returns {Promise<Array<Plot>>}
     */
    async getAllPlots() {
        this.state.loading = true;
        this.state.error = null;

        try {
            const data = await this.#api.getAll();
            this.state.plots = this.#assembler.toPlotArray(data);
            return this.state.plots;
        } catch (error) {
            this.state.error = 'Error al cargar las parcelas';
            console.error('Error fetching plots:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Get plots by organization ID
     * @param {string} organizationId - Organization ID
     * @returns {Promise<Array<Plot>>}
     */
    async getPlotsByOrganizationId(organizationId) {
        this.state.loading = true;
        this.state.error = null;

        try {
            const data = await this.#api.getByOrganizationId(organizationId);
            const plots = this.#assembler.toPlotArray(data);
            this.state.plots = plots;
            return plots;
        } catch (error) {
            this.state.error = 'Error al cargar las parcelas de la organización';
            console.error('Error fetching plots by organization:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Get plot by ID
     * @param {string} id - Plot ID
     * @returns {Promise<Plot>}
     */
    async getPlotById(id) {
        this.state.loading = true;
        this.state.error = null;

        try {
            const data = await this.#api.getById(id);
            this.state.currentPlot = this.#assembler.toPlot(data);
            return this.state.currentPlot;
        } catch (error) {
            this.state.error = 'Error al cargar la parcela';
            console.error('Error fetching plot:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Create new plot
     * @param {Object} plotData - Plot form data
     * @returns {Promise<Plot>}
     */
    async createPlot(plotData) {
        this.state.loading = true;
        this.state.error = null;

        try {
            const apiData = this.#assembler.fromFormData(plotData);
            const createdData = await this.#api.create(apiData);
            const newPlot = this.#assembler.toPlot(createdData);

            // Add to local state
            this.state.plots.push(newPlot);

            return newPlot;
        } catch (error) {
            this.state.error = 'Error al crear la parcela';
            console.error('Error creating plot:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Update plot
     * @param {string} id - Plot ID
     * @param {Object} plotData - Updated plot data
     * @returns {Promise<Plot>}
     */
    async updatePlot(id, plotData) {
        this.state.loading = true;
        this.state.error = null;

        try {
            const apiData = this.#assembler.fromFormData(plotData);
            const updatedData = await this.#api.update(id, apiData);
            const updatedPlot = this.#assembler.toPlot(updatedData);

            // Update in local state
            const index = this.state.plots.findIndex(plot => plot.id === id);
            if (index !== -1) {
                this.state.plots[index] = updatedPlot;
            }

            if (this.state.currentPlot?.id === id) {
                this.state.currentPlot = updatedPlot;
            }

            return updatedPlot;
        } catch (error) {
            this.state.error = 'Error al actualizar la parcela';
            console.error('Error updating plot:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Delete plot
     * @param {string} id - Plot ID
     * @returns {Promise<boolean>}
     */
    async deletePlot(id) {
        this.state.loading = true;
        this.state.error = null;

        try {
            await this.#api.delete(id);

            // Remove from local state
            this.state.plots = this.state.plots.filter(plot => plot.id !== id);

            if (this.state.currentPlot?.id === id) {
                this.state.currentPlot = null;
            }

            return true;
        } catch (error) {
            this.state.error = 'Error al eliminar la parcela';
            console.error('Error deleting plot:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Add member to plot
     * @param {string} plotId - Plot ID
     * @param {string} memberId - Member ID
     * @returns {Promise<Plot>}
     */
    async addMember(plotId, memberId) {
        this.state.loading = true;
        this.state.error = null;

        try {
            const updatedData = await this.#api.addMember(plotId, memberId);
            const updatedPlot = this.#assembler.toPlot(updatedData);

            // Update in local state
            const index = this.state.plots.findIndex(plot => plot.id === plotId);
            if (index !== -1) {
                this.state.plots[index] = updatedPlot;
            }

            if (this.state.currentPlot?.id === plotId) {
                this.state.currentPlot = updatedPlot;
            }

            return updatedPlot;
        } catch (error) {
            this.state.error = 'Error al agregar miembro';
            console.error('Error adding member:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Remove member from plot
     * @param {string} plotId - Plot ID
     * @param {string} memberId - Member ID
     * @returns {Promise<Plot>}
     */
    async removeMember(plotId, memberId) {
        this.state.loading = true;
        this.state.error = null;

        try {
            const updatedData = await this.#api.removeMember(plotId, memberId);
            const updatedPlot = this.#assembler.toPlot(updatedData);

            // Update in local state
            const index = this.state.plots.findIndex(plot => plot.id === plotId);
            if (index !== -1) {
                this.state.plots[index] = updatedPlot;
            }

            if (this.state.currentPlot?.id === plotId) {
                this.state.currentPlot = updatedPlot;
            }

            return updatedPlot;
        } catch (error) {
            this.state.error = 'Error al remover miembro';
            console.error('Error removing member:', error);
            throw error;
        } finally {
            this.state.loading = false;
        }
    }

    /**
     * Clear current plot
     */
    clearCurrentPlot() {
        this.state.currentPlot = null;
    }

    /**
     * Clear error state
     */
    clearError() {
        this.state.error = null;
    }
}

// Export singleton instance
export const plotService = new PlotService();
