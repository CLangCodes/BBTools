const API_URL = '/api/Antigen';

export const AntigenService = {
    async getAll() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch antigens: ${errorText}`);
            }
            const data = await response.json();
            console.log('AntigenService.getAll raw response:', response);
            console.log('AntigenService.getAll parsed data:', data);
            if (data && data.length > 0) {
                console.log('First antigen in service:', {
                    isbtNumber: data[0].isbtNumber,
                    name: data[0].name,
                    systemId: data[0].systemId,
                    systemName: data[0].systemName,
                    antigenSystem: data[0].antigenSystem
                });
            }
            return data;
        } catch (error) {
            console.error('Error in getAll:', error);
            throw error;
        }
    },

    async getById(isbtNumber) {
        try {
            const response = await fetch(`${API_URL}/${isbtNumber}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch antigen: ${errorText}`);
            }
            return response.json();
        } catch (error) {
            console.error('Error in getById:', error);
            throw error;
        }
    },

    async create(antigen) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(antigen),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create antigen: ${errorText}`);
            }
            return response.json();
        } catch (error) {
            console.error('Error in create:', error);
            throw error;
        }
    },

    async update(isbtNumber, antigen) {
        try {
            const response = await fetch(`${API_URL}/${isbtNumber}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(antigen),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update antigen: ${errorText}`);
            }
            return response.json();
        } catch (error) {
            console.error('Error in update:', error);
            throw error;
        }
    },

    async delete(isbtNumber) {
        try {
            const response = await fetch(`${API_URL}/${isbtNumber}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete antigen: ${errorText}`);
            }
        } catch (error) {
            console.error('Error in delete:', error);
            throw error;
        }
    }
}; 