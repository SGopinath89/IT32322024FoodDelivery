import { Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantsOrder, updateOrderStatus } from '../../component/State/RestaurantOrder/Action';

const orderStatus = [
    { label: "Pending", value: "PENDING" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
    { label: "Delivered", value: "DELIVERED" },
];

const OrderTable = ({ status }) => {


    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant, restaurantOrder } = useSelector(store => store);

    useEffect(() => {

        if (restaurant.usersRestaurant?.id) {
            dispatch(fetchRestaurantsOrder({
                restaurantId: restaurant.usersRestaurant.id,
                jwt
            }));
        }
    }, [dispatch, restaurant.usersRestaurant?.id, jwt]);



    const [menuState, setMenuState] = useState({
        anchorEl: null,
        currentOrderId: null,
    });
    const open = Boolean(menuState.anchorEl);

    const handleClick = (event, orderId) => {
        setMenuState({
            anchorEl: event.currentTarget,
            currentOrderId: orderId,
        });
    };

    const handleClose = () => {
        setMenuState({
            anchorEl: null,
            currentOrderId: null,
        });
    };

    const handleUpdateOrder = (orderStatus) => {
        const { currentOrderId } = menuState;
        dispatch(updateOrderStatus({ orderId: currentOrderId, orderStatus, jwt }));
        handleClose();
    };

    const filteredOrders = restaurantOrder?.orders?.filter(order => status === "ALL" || order.orderStatus === status);

    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader title="All Orders" sx={{ pt: 2, alignItems: "center" }} />
            </Card>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Customer</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">Mobile</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Ingredients</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Update</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders?.map((row) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align="right">
                                    <AvatarGroup>
                                        {row?.items?.map((item, index) => (
                                            <Avatar key={index} src={item?.food?.images[0]} />
                                        ))}
                                    </AvatarGroup>
                                </TableCell>
                                <TableCell align="right">{row?.customer?.fullName}</TableCell>
                                <TableCell align="right"><p>{row?.deliveryAddress?.streetAddress}</p><p>{row?.deliveryAddress?.city}</p></TableCell>
                                <TableCell align="right">{row?.mobile}</TableCell>
                                <TableCell align="right">Rs. {row?.totalPrice}.00</TableCell>
                                <TableCell align="right">
                                    {row?.items?.map((item, index) => (
                                        <p key={index}>{item?.quantity} × {item?.food?.name}</p>
                                    ))}
                                </TableCell>
                                <TableCell align="right">
                                    {row?.items?.map((orderItem, index) => (
                                        <div key={index} className='flex justify-center items-center'>
                                            {orderItem?.ingredients?.map((item, idx) => (
                                                <Chip key={idx} className='m-1' label={item} />
                                            ))}
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell align="right">{row.orderStatus}</TableCell>
                                <TableCell align='right'>
                                    <div>
                                        <Button
                                            id={`basic-button-${row.id}`}
                                            aria-controls={open ? `basic-menu-${row.id}` : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={(event) => handleClick(event, row.id)}
                                        >
                                            Update
                                        </Button>
                                        <Menu
                                            id={`basic-menu-${row.id}`}
                                            anchorEl={menuState.anchorEl}
                                            open={open && menuState.currentOrderId === row.id}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': `basic-button-${row.id}`,
                                            }}
                                        >
                                            {orderStatus.map(status => (
                                                <MenuItem key={status.value} onClick={() => handleUpdateOrder(status.value)}>
                                                    {status.label}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default OrderTable;
