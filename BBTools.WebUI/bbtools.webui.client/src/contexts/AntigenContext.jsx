import React, { createContext, useContext, useState, useEffect } from 'react';
import { AntigenService } from '../services/AntigenService';

const AntigenContext = createContext();

export const useAntigen = () => {
    const context = useContext(AntigenContext);
    if (!context) {
        throw new Error('useAntigen must be used within an AntigenProvider');
    }
    return context;
};

export const AntigenProvider = ({ children }) => {
    const [antigens, setAntigens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadAntigens = async () => {
        try {
            setLoading(true);
            const data = await AntigenService.getAll();
            setAntigens(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addAntigen = async (antigen) => {
        try {
            const newAntigen = await AntigenService.create(antigen);
            setAntigens(prev => [...prev, newAntigen]);
            return newAntigen;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const updateAntigen = async (isbtNumber, antigen) => {
        try {
            const updatedAntigen = await AntigenService.update(isbtNumber, antigen);
            setAntigens(prev => prev.map(a => a.ISBTNumber === isbtNumber ? updatedAntigen : a));
            return updatedAntigen;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const deleteAntigen = async (isbtNumber) => {
        try {
            await AntigenService.delete(isbtNumber);
            setAntigens(prev => prev.filter(a => a.ISBTNumber !== isbtNumber));
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    useEffect(() => {
        loadAntigens();
    }, []);

    const value = {
        antigens,
        loading,
        error,
        addAntigen,
        updateAntigen,
        deleteAntigen,
        refreshAntigens: loadAntigens
    };

    return (
        <AntigenContext.Provider value={value}>
            {children}
        </AntigenContext.Provider>
    );
}; 