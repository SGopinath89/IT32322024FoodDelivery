package com.fast_food.service;

import com.fast_food.model.Order;
import com.fast_food.repository.OrderRepository;
import com.fast_food.request.OrderRequest;
import com.fast_food.response.PaymentResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.Proxy;
import java.util.Collections;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private OrderRepository orderRepository;
    @Value("${STRIPE_API_KEY}")
    private String stripeApiKey;

    @Value("${BASE_URL}")
    private String baseUrl; // Assuming you have a base URL configured in your application properties

    @Override
    public PaymentResponse createPaymentLink(OrderRequest orderRequest) throws Exception {
        Stripe.apiKey = stripeApiKey;
        // Example: Obtain or create your Proxy object
        Proxy proxy = Proxy.NO_PROXY; // Replace with your logic to obtain or create Proxy object

        // Use public method to get proxy type
        Proxy.Type proxyType = proxy.type();

        // Build Stripe Checkout session parameters
        SessionCreateParams params = SessionCreateParams.builder()
                .addAllPaymentMethodType(Collections.singletonList(SessionCreateParams.PaymentMethodType.CARD))
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(baseUrl + "/success-payment")
                .setCancelUrl(baseUrl + "/fail-payment/")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("lkr")
                                .setUnitAmount(orderRequest.getTotal() * 100) // Stripe expects amount in cents
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder().setName("Fast Food").build())
                                .build()
                        ).build()
                ).build();

        // Create Stripe Checkout session
        Session session = Session.create(params);

        // Prepare PaymentResponse with checkout session URL
        PaymentResponse paymentResponse = new PaymentResponse();
        paymentResponse.setPaymentUrl(session.getUrl());
        paymentResponse.setAddress(orderRequest.getDeliveryAddress());


        return paymentResponse;
    }


}
