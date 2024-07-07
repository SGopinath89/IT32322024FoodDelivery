import React from 'react';
import { Button } from '@mui/material';
import Lottie from 'lottie-react';
import paymentAnimation from '../../assets/payment_fail.json';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PaymentFail = () => {
  const navigate = useNavigate();
  const { auth } = useSelector(store => store);
  const handleNavigateToCart = () => {
    if (auth?.user) {
      navigate("/profile/cart");
    } else {
      navigate("/account/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Lottie
        animationData={paymentAnimation}
        loop={true} // Ensure animation does not loop
        autoplay={true} // Autoplay animation
        style={{ width: '60%', height: 'auto' }}
      />
      {!localStorage.getItem("orderCreated") && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleNavigateToCart}
        >
          Go To Cart
        </Button>
      )}
    </div>
  );
};

export default PaymentFail;
