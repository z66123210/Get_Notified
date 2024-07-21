import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TableSortLabel,
    TextField,
    InputAdornment
} from '@mui/material';
import axios from 'axios';
import SearchForm from './SearchForm';
import { Search as SearchIcon } from '@mui/icons-material';
import { useAuth } from '../../Context/useAuth';
import apiClient from '../../Services/AxiosClient';

interface Search {
    id: number;
    userId: string;
    searchName: string;
    searchUrl: string;
    isActive: boolean;
    notificationFrequency: number;
}

const SearchesPage: React.FC = () => {
    const [searches, setSearches] = useState<Search[]>([]);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Search>('searchName');
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [searchToEdit, setSearchToEdit] = useState<Search | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        fetchSearches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchSearches = async () => {
        try {
            const response = await apiClient.get<Search[]>('/api/searches', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSearches(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deleteSearch = async (id: number) => {
        try {
            await apiClient.delete(`/api/searches/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSearches(searches.filter(search => search.id !== id));
        } catch (error) {
            console.error('Error deleting search:', error);
        }
    };

    const handleAdd = (newSearch: Search) => {
        setSearches([...searches, newSearch]);
    };

    const handleEdit = (updatedSearch: Search) => {
        setSearches(searches.map(search => (search.id === updatedSearch.id ? updatedSearch : search)));
    };

    const handleRequestSort = (property: keyof Search) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredSearches = searches.filter(search =>
        search.searchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        search.searchUrl.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedSearches = filteredSearches.sort((a, b) => {
        if (orderBy === 'searchName' || orderBy === 'searchUrl') {
            return order === 'asc'
                ? a[orderBy].localeCompare(b[orderBy])
                : b[orderBy].localeCompare(a[orderBy]);
        } else if (orderBy === 'isActive') {
            return order === 'asc'
                ? Number(a.isActive) - Number(b.isActive)
                : Number(b.isActive) - Number(a.isActive);
        } else {
            return order === 'asc'
                ? a.notificationFrequency - b.notificationFrequency
                : b.notificationFrequency - a.notificationFrequency;
        }
    });

    return (
        <>
            <TextField
                variant="outlined"
                fullWidth
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <Button variant="contained" color="primary" onClick={() => { setSearchToEdit(null); setOpen(true); }}>
                Add New Search
            </Button>
            <SearchForm open={open} onClose={() => setOpen(false)} onSave={searchToEdit ? handleEdit : handleAdd} searchToEdit={searchToEdit} />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'searchName'}
                                    direction={orderBy === 'searchName' ? order : 'asc'}
                                    onClick={() => handleRequestSort('searchName')}
                                >
                                    Search Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'searchUrl'}
                                    direction={orderBy === 'searchUrl' ? order : 'asc'}
                                    onClick={() => handleRequestSort('searchUrl')}
                                >
                                    Search URL
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'isActive'}
                                    direction={orderBy === 'isActive' ? order : 'asc'}
                                    onClick={() => handleRequestSort('isActive')}
                                >
                                    Is Active
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'notificationFrequency'}
                                    direction={orderBy === 'notificationFrequency' ? order : 'asc'}
                                    onClick={() => handleRequestSort('notificationFrequency')}
                                >
                                    Notification Frequency
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedSearches.map((search) => (
                            <TableRow key={search.id}>
                                <TableCell>{search.searchName}</TableCell>
                                <TableCell>{search.searchUrl}</TableCell>
                                <TableCell>{search.isActive ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{search.notificationFrequency}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => { setSearchToEdit(search); setOpen(true); }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => deleteSearch(search.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default SearchesPage;
