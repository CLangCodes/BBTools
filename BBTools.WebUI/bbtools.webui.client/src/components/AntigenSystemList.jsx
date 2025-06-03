import React, { useState, useEffect } from 'react';
import { AntigenSystemService } from '../services/AntigenSystemService';
import AntigenSystemForm from './AntigenSystemForm';
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
    Alert,
    TablePagination,
    Snackbar
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const AntigenSystemList = () => {
    const [systems, setSystems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSystem, setSelectedSystem] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const loadSystems = async () => {
        try {
            setLoading(true);
            const data = await AntigenSystemService.getAll();
            console.log('Raw antigen systems data:', data);
            setSystems(data);
            setError(null);
        } catch (err) {
            console.error('Error loading antigen systems:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSystems();
    }, []);

    const handleEdit = (system) => {
        setSelectedSystem(system);
        setIsFormOpen(true);
    };

    const handleDelete = async (systemId) => {
        if (window.confirm('Are you sure you want to delete this antigen system?')) {
            try {
                await AntigenSystemService.delete(systemId);
                await loadSystems();
                setSnackbar({ open: true, message: 'Antigen system deleted successfully', severity: 'success' });
            } catch (error) {
                console.error('Error deleting antigen system:', error);
                setError(error.message);
                setSnackbar({ open: true, message: error.message, severity: 'error' });
            }
        }
    };

    const handleCreate = () => {
        setSelectedSystem(null);
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setSelectedSystem(null);
    };

    const handleSave = async (system) => {
        try {
            if (selectedSystem) {
                await AntigenSystemService.update(system.systemId, system);
                setSnackbar({ open: true, message: 'Antigen system updated successfully', severity: 'success' });
            } else {
                await AntigenSystemService.create(system);
                setSnackbar({ open: true, message: 'Antigen system created successfully', severity: 'success' });
            }
            await loadSystems();
            handleFormClose();
        } catch (error) {
            console.error('Error saving antigen system:', error);
            setError(error.message);
            setSnackbar({ open: true, message: error.message, severity: 'error' });
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, color: 'text.primary' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2" color="text.primary">
                    Antigen Systems
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreate}
                >
                    Create New System
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    Error: {error}
                </Alert>
            )}

            <TableContainer 
                component={Paper} 
                sx={{ 
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    borderRadius: 2,
                    overflow: 'hidden'
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'primary.main' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>System ID</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>System Name</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Genes</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Phenotypes</TableCell>
                            <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {systems.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Typography variant="body1" color="text.secondary">
                                        No antigen systems found. Click "Create New System" to add one.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            systems
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((system) => (
                                    <TableRow 
                                        key={system.systemId}
                                        sx={{ 
                                            '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                                            '&:hover': { bgcolor: 'action.selected' }
                                        }}
                                    >
                                        <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                                            {system.systemId}
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                                            {system.systemName}
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                                            {system.genes?.join(', ') || ''}
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                                            {system.phenoTypes?.join(', ') || ''}
                                        </TableCell>
                                        <TableCell 
                                            align="right"
                                            sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}
                                        >
                                            <IconButton
                                                onClick={() => handleEdit(system)}
                                                color="primary"
                                                size="small"
                                                sx={{ mr: 1 }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleDelete(system.systemId)}
                                                color="error"
                                                size="small"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                        )}
                    </TableBody>
                </Table>
                {systems.length > 0 && (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={systems.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}
                    />
                )}
            </TableContainer>

            <AntigenSystemForm
                open={isFormOpen}
                onClose={handleFormClose}
                onSave={handleSave}
                system={selectedSystem}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbar.message}
            />
        </Box>
    );
};

export default AntigenSystemList; 