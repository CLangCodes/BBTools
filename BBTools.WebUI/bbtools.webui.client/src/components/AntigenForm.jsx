import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box
} from '@mui/material';

const AntigenForm = ({ open, onClose, onSave, antigen = null }) => {
    const [formData, setFormData] = useState({
        ISBTNumber: '',
        Name: '',
        SystemId: '',
        SystemName: ''
    });

    useEffect(() => {
        if (antigen) {
            setFormData(antigen);
        } else {
            setFormData({
                ISBTNumber: '',
                Name: '',
                SystemId: '',
                SystemName: ''
            });
        }
    }, [antigen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {antigen ? 'Edit Antigen' : 'Create New Antigen'}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            name="ISBTNumber"
                            label="ISBT Number"
                            value={formData.ISBTNumber}
                            onChange={handleChange}
                            required
                            fullWidth
                            disabled={!!antigen}
                        />
                        <TextField
                            name="Name"
                            label="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            name="SystemId"
                            label="System ID"
                            type="number"
                            value={formData.SystemId}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            name="SystemName"
                            label="System Name"
                            value={formData.SystemName}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        {antigen ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AntigenForm; 