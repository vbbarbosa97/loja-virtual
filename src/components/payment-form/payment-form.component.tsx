import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "../button/button.component";
import "./payment-form.styles.scss";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useState } from "react";

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);

  const paymentHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const naoPossuiInstanciaCarregada = !stripe || !elements;

    if (naoPossuiInstanciaCarregada) {
      return;
    }

    setLoading(true);

    //criar uma inteção de compra
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((resp) => resp.json());

    const clientSecret = response.paymentIntent.client_secret;

    //UTILIZAR SEMPRE NO NUMERO DO CARTAO 4242...
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: currentUser ? currentUser.displayName : "Convidado",
        },
      },
    });

    setLoading(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful");
      }
    }
  };

  const haveAmount = amount > 0;

  return haveAmount ? (
    <div className="container">
      <form className="form">
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <Button
          isLoading={loading}
          type="button"
          onClick={paymentHandler}
          typeClass="inverted"
        >
          Pay now
        </Button>
      </form>
    </div>
  ) : (
    <></>
  );
};

export default PaymentForm;
