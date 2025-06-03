import { Container } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';

function AntigenCalculator() {
    const [unitsRequired, setUnitsRequired] = useState(1);
    const [antigens, setAntigens] = useState([]);
    const [calculatedUnits, setCalculatedUnits] = useState(null);
    const [showWarning, setShowWarning] = useState(false);

    // On mount: initialize antigen list (equivalent to OnInitialized)
    useEffect(() => {
        const getAntigenFrequencies = async () => {
            try {
                const res = await fetch("/api/BBTools/frequencies"); 
                const data = await res.json();
                const antigenArray = Object.entries(data)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([name, frequency]) => ({
                        name,
                        frequency,
                        isSelected: false,
                    }));
                setAntigens(antigenArray);
            } catch (err) {
                console.error("Failed to load antigen frequencies", err);
            }
        };
        getAntigenFrequencies();
    }, []);

    const handleCheckboxChange = (index) => {
        const newAntigens = [...antigens];
        newAntigens[index].isSelected = !newAntigens[index].isSelected;
        setAntigens(newAntigens);
        calculate(newAntigens);
    };

    const calculate = useCallback(async (currentAntigens = antigens) => {
        try {
            const selected = currentAntigens.filter(a => a.isSelected);
            if (selected.length === 0) {
                setCalculatedUnits(null);
                setShowWarning(false);
                return;
            }

            const response = await fetch(`/api/BBTools/calculateUnits?unitsReq=${unitsRequired}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selected)
            });

            if (!response.ok) {
                throw new Error('Failed to calculate units');
            }

            const result = await response.json();
            
            if (result === null) {
                setCalculatedUnits(null);
                setShowWarning(true);
                return;
            }

            setShowWarning(false);
            setCalculatedUnits(result);
        } catch (error) {
            console.error("Error calculating screening units", error);
            setCalculatedUnits(null);
            setShowWarning(true);
        }
    }, [unitsRequired, antigens]);

    useEffect(() => {
        calculate();
    }, [calculate]);

    return (
        <div className="screenCalculator">
            <div className="header">
                <Container>
                    <h3>Antigen Screener Helper Tool</h3>
                    <p>
                        In order to obtain the required number of antigen negative Leukoreduced Red Cells matching a patient's phenotype,
                        Medical Technologists must screen their inventory. This tool is designed with the intention of aiding Technologists
                        with the decision to screen current inventory, or place an order with local blood providers. This tool <b>has not</b> been
                        tested or approved by any healthcare agency and usage must be carefully considered. Please consult appropriate
                        authority before using this tool in your laboratory.
                    </p>
                </Container>
            </div>
            
            <div className="userIO">
                <Container>
                    {calculatedUnits !== null ? (
                        <p className="mt-3">
                            You would need to screen <strong>{calculatedUnits}</strong> units to find <strong>{unitsRequired}</strong> antigen negative LRC
                            {unitsRequired > 1 ? 's' : ''}.
                        </p>
                    ) : showWarning ? (
                        <p className="mt-3 text-danger">
                            ⚠️ No feasible match found — selected antigens are too rare to calculate a reliable screening count.
                        </p>
                    ) : null}
                </Container>
                <Container>
                    <div className="units-input-container">
                        <label htmlFor="units-required">Units Required:</label>
                        <input
                            id="units-required"
                            type="number"
                            className="form-control"
                            value={unitsRequired}
                            min="1"
                            max="999"
                            onChange={(e) => {
                                const value = Math.min(999, Math.max(1, parseInt(e.target.value || 1)));
                                setUnitsRequired(value);
                            }}
                        />
                    </div>
                </Container>
            </div>

            <h5 className="antigen-header">Select Antigens</h5>

            <div className="antigen-grid-container">
                {antigens.map((antigen, index) => (
                    <div key={antigen.name} className="antigen-card">
                        <label>
                            <input
                                type="checkbox"
                                checked={antigen.isSelected}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <span className="antigen-name">{antigen.name}</span>
                        </label>
                        <div className="antigen-frequency">{(antigen.frequency * 100).toFixed(1)}%</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AntigenCalculator; 