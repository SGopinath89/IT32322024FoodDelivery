import { Avatar, Box, Card, CardHeader, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getAllMenuItemsByRestaurantId } from '../../component/State/Menu/Action';
import Swal from 'sweetalert2';



const MenuTable = () => {



    const navigate = useNavigate();

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant, menu } = useSelector(store => store);

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
                    text: "Successfully delete menu item.",
                    icon: "success"
                });
            }
        });
    }

    useEffect(() => {
        dispatch(getAllMenuItemsByRestaurantId({
            restaurantId: restaurant?.usersRestaurant?.id,
            jwt
        }));
    }, []);

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

                            <TableCell align="left">Image</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Ingredients</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Availbility</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {menu?.menuItems?.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Avatar src={row.images[0]}></Avatar>
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">
                                    {
                                        row.ingredients
                                            ?.map((item) =>
                                                <Chip label={item.name} />
                                            )
                                    }
                                </TableCell>
                                <TableCell align="right">Rs. {row.price}.00</TableCell>
                                <TableCell align="right">{row.available ? "Yes" : "No"}</TableCell>
                                <TableCell align="right"><IconButton color='primary' onClick={() => handleDelete(row.id)}><DeleteIcon /></IconButton></TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default MenuTable