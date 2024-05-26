'use client'

import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { SearchInput } from './SearchInput';
import { Checkbox } from '@mui/material';
import { UserImage } from './UserImage';
import { useSession } from 'next-auth/react';

interface Column {
    id: 'name' | 'email' | 'lastActive' | 'permisos' | 'rol';
    label: string;
    minWidth?: number;
    align?: 'right';
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 180 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'lastActive', label: 'última vez activo', minWidth: 100 },
    { id: 'permisos', label: 'Permisos', minWidth: 100 },
    { id: 'rol', label: 'Rol', minWidth: 100 }
];

interface Data {
    name: string;
    email: string;
    lastActive: string;
    permisos: string;
    rol: string;
}

function createData(
    name: string,
    email: string,
    lastActive: string,
    permisos: string,
    rol: string
): Data {
    return { name, email, lastActive, permisos, rol };
}

const rows = [
    createData('Brooklyn Simmons', 'example@gmail.com', "2 meses", "Puede editar", "Usuario"),
    createData('Brooklyn Simmons', 'example@gmail.com', "2 meses", "Puede editar", "Editor"),
    createData('Brooklyn Simmons', 'example@gmail.com', "2 meses", "Puede editar", "Admin"),
    createData('Brooklyn Simmons', 'example@gmail.com', "2 meses", "Puede editar", "Editor"),
    createData('Brooklyn Simmons', 'example@gmail.com', "2 meses", "Puede editar", "Admin"),
    createData('Brooklyn Simmons', 'example@gmail.com', "2 meses", "Puede editar", "Vista"),
    createData('Brooklyn Simmons', 'example@gmail.com', "2 meses", "Puede editar", "Vista"),
    createData('Brooklyn Simmons', 'example@gmail.com', "2 meses", "Puede editar", "Usuario"),
    createData('Brooklyn Simmons', 'example@gmail.com', "2 meses", "Puede editar", "Editor"),
    createData('Brooklyn Simmons', 'example@gmail.com', "2 meses", "Puede editar", "Admin"),
    createData('Brooklyn Simmons', 'example@gmail.com', "2 meses", "Puede editar", "Editor"),
];

export const StickyHeadTable = () => {

    const { data: session } = useSession();
    const NAME_COLUMN_ID = "name";
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        async function fetchDataUser() {
            if (session?.user.role === "ADMINISTRATOR") {
                const response = await fetch("https://codefact.udea.edu.co/modulo-21/listUsers");
                const dataUser = await response.json();
                console.log(dataUser)
            }
        }

        fetchDataUser()
    }, [])


    return (
        <Paper sx={{ width: '80%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 450 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key="-1">
                            {columns.map((column, index) => {
                                if (column.id === NAME_COLUMN_ID) {
                                    return (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            <div className='flex items-center'>
                                                {column.label}
                                                <SearchInput />
                                            </div>
                                        </TableCell>
                                    );
                                } else {
                                    return (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    );
                                }
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={1} key={row.email}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'name' ? (
                                                        <div className='flex items-center'>
                                                            <Checkbox />
                                                            <UserImage />
                                                            {value}
                                                        </div>
                                                    ) : (
                                                        value
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

