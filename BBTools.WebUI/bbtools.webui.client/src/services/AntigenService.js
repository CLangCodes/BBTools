const API_URL = '/api/antigen';

export const AntigenService = {
    async getAll() {
        const response = await fetch(API_URL);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch antigens: ${errorText}`);
        }
        return response.json();
    },

    async getById(isbtNumber) {
        const response = await fetch(`${API_URL}/${isbtNumber}`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch antigen: ${errorText}`);
        }
        return response.json();
    },

    async create(antigen) {
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
    },

    async update(isbtNumber, antigen) {
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
    },

    async delete(isbtNumber) {
        const response = await fetch(`${API_URL}/${isbtNumber}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to delete antigen: ${errorText}`);
        }
    },
}; 