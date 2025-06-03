import React, { useState, useEffect } from 'react';
import { AntigenService } from '../services/AntigenService';
import AntigenForm from './AntigenForm';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Button,
    Typography,
    Box,
    CircularProgress,
    Alert
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const AntigenList = () => {
    const [antigens, setAntigens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAntigen, setSelectedAntigen] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

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

    useEffect(() => {
        loadAntigens();
    }, []);

    const handleEdit = (antigen) => {
        setSelectedAntigen(antigen);
        setIsFormOpen(true);
    };

    const handleDelete = async (isbtNumber) => {
        if (window.confirm('Are you sure you want to delete this antigen?')) {
            try {
                const antigen = antigens.find(a => a.ISBTNumber === isbtNumber);
                if (antigen) {
                    await AntigenService.delete(isbtNumber);
                    setAntigens(prev => prev.filter(a => a.ISBTNumber !== isbtNumber));
                }
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleCreate = () => {
        setSelectedAntigen(null);
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setSelectedAntigen(null);
    };

    const handleSave = async (antigen) => {
        try {
            if (selectedAntigen) {
                await AntigenService.update(antigen.ISBTNumber, antigen);
                setAntigens(prev => prev.map(a => a.ISBTNumber === antigen.ISBTNumber ? antigen : a));
            } else {
                await AntigenService.create(antigen);
                await loadAntigens(); // Reload to get the new antigen
            }
            handleFormClose();
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                Error: {error}
            </Alert>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2">
                    Antigens
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreate}
                >
                    Create New Antigen
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ISBT Number</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>System ID</TableCell>
                            <TableCell>System Name</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {antigens.map((antigen) => (
                            <TableRow key={antigen.ISBTNumber}>
                                <TableCell>{antigen.ISBTNumber}</TableCell>
                                <TableCell>{antigen.Name}</TableCell>
                                <TableCell>{antigen.SystemId}</TableCell>
                                <TableCell>{antigen.SystemName}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        onClick={() => handleEdit(antigen)}
                                        color="primary"
                                        size="small"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(antigen.ISBTNumber)}
                                        color="error"
                                        size="small"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <AntigenForm
                open={isFormOpen}
                onClose={handleFormClose}
                onSave={handleSave}
                antigen={selectedAntigen}
            />
        </Box>
    );
};

export default AntigenList; 