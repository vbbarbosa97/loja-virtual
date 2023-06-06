import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "../button/button.component";
import "./payment-form.styles.scss";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const naoPossuiInstanciaCarregada = !stripe || !elements;

    if (naoPossuiInstanciaCarregada) {
      return;
    }

    //criar uma inteção de compra
  };

  return (
    <div className="container">
      <form className="form">
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <Button type="button" onClick={paymentHandler} typeClass="inverted">
          Pay now
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
