const API_URL = '/api/antigens';

export const AntigenService = {
    async getAll() {
        const response = await fetch(API_URL);
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Failed to fetch antigens');
        }
        return response.json();
    },

    async getById(isbtNumber) {
        const response = await fetch(`${API_URL}/${isbtNumber}`);
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Failed to fetch antigen');
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
            const error = await response.text();
            throw new Error(error || 'Failed to create antigen');
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
            const error = await response.text();
            throw new Error(error || 'Failed to update antigen');
        }
        return response.json();
    },

    async delete(isbtNumber) {
        const response = await fetch(`${API_URL}/${isbtNumber}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Failed to delete antigen');
        }
    }
}; 