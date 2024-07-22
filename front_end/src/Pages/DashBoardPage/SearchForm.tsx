import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, Typography, Box } from '@mui/material';
import apiClient from '../../Services/AxiosClient';
import { useAuth } from '../../Context/useAuth';

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
    const {token} = useAuth();

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
                const patchData = [
                    { op: 'replace', path: '/searchName', value: searchToEdit.searchName },
                    { op: 'replace', path: '/searchUrl', value: searchToEdit.searchUrl },
                    { op: 'replace', path: '/isActive', value: searchToEdit.isActive },
                    { op: 'replace', path: '/notificationFrequency', value: searchToEdit.notificationFrequency }
                ];
                await apiClient.patch(`/api/searches/${searchToEdit.id}`, patchData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json-patch+json',
                    }});
                onSave({ ...searchToEdit, ...searchData });
            } else {
                const response = await apiClient.post<Search>('/api/searches', searchData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }});
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
                   <Box display="flex" alignItems="center">
            <Checkbox
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                name="isActive"
            />
            <Typography>
                Is Active
            </Typography>
        </Box>
                
                

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={handleSave} color="primary">{searchToEdit ? 'Save' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SearchForm;
