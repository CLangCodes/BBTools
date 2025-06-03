import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Chip,
    Stack
} from '@mui/material';

const AntigenSystemForm = ({ open, onClose, onSave, system = null }) => {
    const [formData, setFormData] = useState({
        systemId: '',
        systemName: '',
        genes: [],
        phenoTypes: []
    });

    const [newGene, setNewGene] = useState('');
    const [newPhenotype, setNewPhenotype] = useState('');

    useEffect(() => {
        if (system) {
            setFormData(system);
        } else {
            setFormData({
                systemId: '',
                systemName: '',
                genes: [],
                phenoTypes: []
            });
        }
    }, [system]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'systemId' ? parseInt(value) || '' : value
        }));
    };

    const handleAddGene = () => {
        if (newGene.trim()) {
            setFormData(prev => ({
                ...prev,
                genes: [...prev.genes, newGene.trim()]
            }));
            setNewGene('');
        }
    };

    const handleRemoveGene = (geneToRemove) => {
        setFormData(prev => ({
            ...prev,
            genes: prev.genes.filter(gene => gene !== geneToRemove)
        }));
    };

    const handleAddPhenotype = () => {
        if (newPhenotype.trim()) {
            setFormData(prev => ({
                ...prev,
                phenoTypes: [...prev.phenoTypes, newPhenotype.trim()]
            }));
            setNewPhenotype('');
        }
    };

    const handleRemovePhenotype = (phenotypeToRemove) => {
        setFormData(prev => ({
            ...prev,
            phenoTypes: prev.phenoTypes.filter(phenotype => phenotype !== phenotypeToRemove)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{system ? 'Edit Antigen System' : 'Create Antigen System'}</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="System ID"
                        name="systemId"
                        value={formData.systemId}
                        onChange={handleChange}
                        margin="normal"
                        type="number"
                        required
                    />
                    <TextField
                        fullWidth
                        label="System Name"
                        name="systemName"
                        value={formData.systemName}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Add Gene"
                            value={newGene}
                            onChange={(e) => setNewGene(e.target.value)}
                            margin="normal"
                        />
                        <Button onClick={handleAddGene} variant="outlined" sx={{ mt: 1 }}>
                            Add Gene
                        </Button>
                        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
                            {formData.genes.map((gene, index) => (
                                <Chip
                                    key={index}
                                    label={gene}
                                    onDelete={() => handleRemoveGene(gene)}
                                />
                            ))}
                        </Stack>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Add Phenotype"
                            value={newPhenotype}
                            onChange={(e) => setNewPhenotype(e.target.value)}
                            margin="normal"
                        />
                        <Button onClick={handleAddPhenotype} variant="outlined" sx={{ mt: 1 }}>
                            Add Phenotype
                        </Button>
                        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
                            {formData.phenoTypes.map((phenotype, index) => (
                                <Chip
                                    key={index}
                                    label={phenotype}
                                    onDelete={() => handleRemovePhenotype(phenotype)}
                                />
                            ))}
                        </Stack>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    {system ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AntigenSystemForm; 