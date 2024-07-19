import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox } from '@mui/material';
import axios from 'axios';

interface SearchFormProps {
    open: boolean;
    onClose: () => void;
    onSave: (search: Search) => void;
    searchToEdit?: Search | null;
}

interface Search {
    id: number;
    userId: string;
    searchName: string;
    searchUrl: string;
    isActive: boolean;
    notificationFrequency: number;
}

const SearchForm: React.FC<SearchFormProps> = ({ open, onClose, onSave, searchToEdit }) => {
    const [searchName, setSearchName] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [notificationFrequency, setNotificationFrequency] = useState(30);

    useEffect(() => {
        if (searchToEdit) {
            setSearchName(searchToEdit.searchName);
            setSearchUrl(searchToEdit.searchUrl);
            setIsActive(searchToEdit.isActive);
            setNotificationFrequency(searchToEdit.notificationFrequency);
        } else {
            setSearchName('');
            setSearchUrl('');
            setIsActive(false);
            setNotificationFrequency(30);
        }
    }, [searchToEdit]);

    const handleSave = async () => {
        const searchData = {
            searchName,
            searchUrl,
            isActive,
            notificationFrequency,
        };

        try {
            if (searchToEdit) {
                await axios.put(`/api/searches/${searchToEdit.id}`, searchData);
                onSave({ ...searchToEdit, ...searchData });
            } else {
                const response = await axios.post<Search>('/api/searches', searchData);
                onSave(response.data);
            }
            onClose();
        } catch (error) {
            console.error('Error saving search:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{searchToEdit ? 'Edit Search' : 'Add New Search'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Search Name"
                    type="text"
                    fullWidth
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Search URL"
                    type="text"
                    fullWidth
                    value={searchUrl}
                    onChange={(e) => setSearchUrl(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Notification Frequency"
                    type="number"
                    fullWidth
                    value={notificationFrequency}
                    onChange={(e) => setNotificationFrequency(parseInt(e.target.value, 10))}
                />
                <Checkbox  
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={handleSave} color="primary">{searchToEdit ? 'Save' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SearchForm;
