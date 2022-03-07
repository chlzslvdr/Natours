/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51KZ99WA3t4pmhijIVw7mBNyPelg4GwMKwmeUed81gIsUs36WU4acTII3K7PJ1cg1dgOwEfeqkpm8IQJ5VQSmAH4100Lx9YZvqh'
  );

  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + change credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.error(err);
    showAlert('error', err);
  }
};
