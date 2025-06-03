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
    Alert,
    TablePagination,
    Snackbar
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const AntigenList = () => {
    const [antigens, setAntigens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAntigen, setSelectedAntigen] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const loadAntigens = async () => {
        try {
            setLoading(true);
            const data = await AntigenService.getAll();
            console.log('Loaded antigens:', data); // Debug log
            setAntigens(data);
            setError(null);
        } catch (err) {
            console.error('Error loading antigens:', err); // Debug log
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
                    await loadAntigens(); // Reload the list after delete
                    setSnackbar({ open: true, message: 'Antigen deleted successfully', severity: 'success' });
                }
            } catch (error) {
                console.error('Error deleting antigen:', error); // Debug log
                setError(error.message);
                setSnackbar({ open: true, message: error.message, severity: 'error' });
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
                setSnackbar({ open: true, message: 'Antigen updated successfully', severity: 'success' });
            } else {
                await AntigenService.create(antigen);
                setSnackbar({ open: true, message: 'Antigen created successfully', severity: 'success' });
            }
            await loadAntigens(); // Reload the list after save
            handleFormClose();
        } catch (error) {
            console.error('Error saving antigen:', error); // Debug log
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
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ISBT Number</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>System ID</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>System Name</TableCell>
                            <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {antigens.length === 0 ? (
                            <TableRow key="empty-row">
                                <TableCell colSpan={5} align="center">
                                    <Typography variant="body1" color="text.secondary">
                                        No antigens found. Click "Create New Antigen" to add one.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            antigens
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((antigen) => (
                                    <TableRow 
                                        key={`antigen-${antigen.ISBTNumber}`}
                                        sx={{ 
                                            '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                                            '&:hover': { bgcolor: 'action.selected' }
                                        }}
                                    >
                                        <TableCell sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                                            {antigen.ISBTNumber}
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                                            {antigen.Name}
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                                            {antigen.SystemId}
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                                            {antigen.SystemName}
                                        </TableCell>
                                        <TableCell 
                                            align="right"
                                            sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}
                                        >
                                            <IconButton
                                                key={`edit-${antigen.ISBTNumber}`}
                                                onClick={() => handleEdit(antigen)}
                                                color="primary"
                                                size="small"
                                                sx={{ mr: 1 }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                key={`delete-${antigen.ISBTNumber}`}
                                                onClick={() => handleDelete(antigen.ISBTNumber)}
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
                {antigens.length > 0 && (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={antigens.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}
                    />
                )}
            </TableContainer>

            <AntigenForm
                open={isFormOpen}
                onClose={handleFormClose}
                onSave={handleSave}
                antigen={selectedAntigen}
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

export default AntigenList; 