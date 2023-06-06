import { loadStripe } from "@stripe/stripe-js";

//chave publica do stripe
export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ?? ""
);
