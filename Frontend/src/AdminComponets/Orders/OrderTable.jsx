import { Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery, useTheme } from '@mui/material';
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
                            {!isMobile && <TableCell align="center">Id</TableCell>}
                            {!isMobile && <TableCell align="center">Image</TableCell>}
                            <TableCell align="center">Customer</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">Mobile</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Ingredients</TableCell>
                            <TableCell align="center">Status</TableCell>
                            {/* <TableCell align="center">Update</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders?.map((row) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {!isMobile && <TableCell align="center" component="th" scope="row">{row.id}</TableCell>}
                                {!isMobile && (
                                    <TableCell align="center">
                                        <AvatarGroup>
                                            {row?.items?.map((item, index) => (
                                                <Avatar key={index} src={item?.food?.images[0]} />
                                            ))}
                                        </AvatarGroup>
                                    </TableCell>
                                )}
                                <TableCell align="center">{row?.customer?.fullName}</TableCell>
                                <TableCell align="center">
                                    <p>{row?.deliveryAddress?.streetAddress}</p>
                                    <p>{row?.deliveryAddress?.city}</p>
                                </TableCell>
                                <TableCell align="center">{row?.mobile}</TableCell>
                                <TableCell align="center">Rs. {row?.totalPrice}.00</TableCell>
                                <TableCell align="center">
                                    {row?.items?.map((item, index) => (
                                        <p key={index}>
                                            <span style={{ color: 'red' }}>{item?.quantity}</span> × {item?.food?.name}
                                        </p>
                                    ))}
                                </TableCell>
                                <TableCell align="center">
                                    {row?.items?.map((orderItem, index) => (
                                        <div
                                            key={index}
                                            className={isMobile ? 'flex flex-col items-center' : 'flex justify-center items-center'}
                                        >
                                            {orderItem?.ingredients?.map((item, idx) => (
                                                <Chip key={idx} className='m-1' label={item} />
                                            ))}
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell align="center">{row.orderStatus}
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
                                {/* <TableCell align='center'>
                                    
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default OrderTable;
