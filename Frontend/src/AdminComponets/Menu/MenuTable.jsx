import { Avatar, Box, Button, Card, CardHeader, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getAllMenuItemsByRestaurantId, updateMenuItemsAvailability } from '../../component/State/Menu/Action';
import Swal from 'sweetalert2';

const MenuTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant, menu } = useSelector(store => store);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteFoodAction({ foodId: id, jwt }));
                Swal.fire({
                    title: "Deleted!",
                    text: "Successfully deleted menu item.",
                    icon: "success"
                });
            }
        });
    };

    useEffect(() => {
        dispatch(getAllMenuItemsByRestaurantId({
            restaurantId: restaurant?.usersRestaurant?.id,
            jwt
        }));
    }, [dispatch, restaurant?.usersRestaurant?.id, jwt]);

    const handleUpdateAvailbality = (id) => {

        dispatch(updateMenuItemsAvailability({
            foodId: id,
            jwt
        }));
    }


    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    title={"Menu"}
                    sx={{ pt: 2, alignItems: "center" }}
                    action={
                        <IconButton onClick={() => navigate("/admin/restaurants/add-menu")}>
                            <CreateIcon />
                        </IconButton>
                    }
                />
            </Card>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {!isMobile && <TableCell align="center">Image</TableCell>}
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Ingredients</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Availability</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {menu?.menuItems?.map((row) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {!isMobile && (
                                    <TableCell align="center" component="th" scope="row">
                                        <Avatar src={row.images[0]} />
                                    </TableCell>
                                )}
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">
                                    <div className={isMobile ? 'flex flex-col' : ''} style={{ textAlign: 'center' }}>
                                        {row.ingredients?.map((item, index) => (
                                            <Chip key={index} label={item.name} className='m-1' />
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell align="center">Rs. {row.price}.00</TableCell>
                                {/* <TableCell align="center">{row.available ? "Yes" : "No"}</TableCell> */}
                                <TableCell align="right">
                                    <Button onClick={() => handleUpdateAvailbality(row.id)}>
                                        {
                                            row.available ? "Yes" : "No"
                                        }
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton color='primary' onClick={() => handleDelete(row.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default MenuTable;
