const API_URL = '/api/AntigenSystem';

export const AntigenSystemService = {
    async getAll() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch antigen systems: ${errorText}`);
            }
            const data = await response.json();
            console.log('AntigenSystemService.getAll raw response:', response);
            console.log('AntigenSystemService.getAll parsed data:', data);
            console.log('First system properties:', data[0] ? {
                systemId: data[0].systemId,
                systemName: data[0].systemName,
                genes: data[0].genes,
                phenoTypes: data[0].phenoTypes
            } : 'No data');
            return data;
        } catch (error) {
            console.error('Error in getAll:', error);
            throw error;
        }
    },

    async getById(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch antigen system: ${errorText}`);
            }
            return response.json();
        } catch (error) {
            console.error('Error in getById:', error);
            throw error;
        }
    },

    async create(system) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(system),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create antigen system: ${errorText}`);
            }
            return response.json();
        } catch (error) {
            console.error('Error in create:', error);
            throw error;
        }
    },

    async update(id, system) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(system),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update antigen system: ${errorText}`);
            }
            return response.json();
        } catch (error) {
            console.error('Error in update:', error);
            throw error;
        }
    },

    async delete(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete antigen system: ${errorText}`);
            }
        } catch (error) {
            console.error('Error in delete:', error);
            throw error;
        }
    }
}; 