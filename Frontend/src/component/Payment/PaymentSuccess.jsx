import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress } from '@mui/material';
import { createOrder as createOrderAction } from '../State/Order/Action';
import { clearCartAction } from '../State/Cart/Action';
import Lottie from 'lottie-react';
import paymentAnimation from '../../assets/payment.json';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

const PaymentSuccess = () => {
    const address = JSON.parse(localStorage.getItem("selectedAddress"));
    const dispatch = useDispatch();
    const { cart, auth } = useSelector(store => store);
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    const navigate = useNavigate();

    const handleCreateOrder = async () => {
        setIsCreatingOrder(true);

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: paymentAnimation,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        try {
            // Track unique restaurant IDs
            const uniqueRestaurantIds = new Set();

            // Create orders for each unique restaurant in the cart
            await Promise.all(cart.cartItems.map(async (item) => {
                const restaurantId = item.food?.restaurant.id;

                if (!uniqueRestaurantIds.has(restaurantId)) {
                    uniqueRestaurantIds.add(restaurantId);

                    const data = {
                        jwt: localStorage.getItem("jwt"),
                        restaurantId: restaurantId,
                        deliveryAddress: {
                            fullName: auth.user?.fullName,
                            streetAddress: address['streetAddress'],
                            city: address['city'],
                            mobile: address['mobile'],
                            locationType: address['location']
                        }
                    };
                    await dispatch(createOrderAction(data));
                }
            }));

            // Clear the cart after all orders are successfully created
            dispatch(clearCartAction());

            localStorage.setItem("orderCreated", true);

            // Show success alert with animation
            MySwal.fire({
                icon: 'success',
                title: 'Order Created!',
                text: 'Your order has been placed successfully.',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: () => {
                    MySwal.showLoading();
                }
            });

            navigate("/profile/orders");
        } catch (error) {
            console.error("Error creating order:", error);
            // Handle error scenarios (e.g., show error message to user)
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to create order. Please try again later.',
            });
        } finally {
            localStorage.removeItem("orderCreated");
            setIsCreatingOrder(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">


            <Lottie animationData={paymentAnimation}

                loop={false}  // Ensure animation does not loop
                autoplay={true}  // Autoplay animation
                style={{ width: '60%', height: 'auto' }}
            />

            {!localStorage.getItem("orderCreated") && (
                <Button

                    variant="contained"
                    color="primary"
                   
                    onClick={handleCreateOrder}
                    disabled={isCreatingOrder}
                    
                >
                    {isCreatingOrder ? <CircularProgress size={24} color="inherit" /> : 'Place Order'}
                </Button>
            )}

        </div>
    );
};

export default PaymentSuccess;
