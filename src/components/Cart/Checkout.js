import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const inputName = useRef();
  const inputStreet = useRef();
  const inputPostalCode = useRef();
  const inputCity = useRef();

  const [formValid, setFormValid] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const isValidInput = (input) => input.trim() !== "";
  const isValidCode = (input) => input.trim().length === 5;

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = inputName.current.value;
    const enteredStreet = inputStreet.current.value;
    const enteredPostalCode = inputPostalCode.current.value;
    const enteredCity = inputCity.current.value;

    const validName = isValidInput(enteredName);
    const validStreet = isValidInput(enteredStreet);
    const validCity = isValidInput(enteredCity);
    const validPostalCode = isValidCode(enteredPostalCode);

    setFormValid({
      name: validName,
      street: validStreet,
      postalCode: validPostalCode,
      city: validCity,
    });

    const formValid = validName && validCity && validPostalCode && validStreet;

    if (!formValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      postalCode: enteredPostalCode,
      street: enteredStreet,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={inputName} />
        {!formValid.name && <p>Invalid Name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={inputStreet} />
        {!formValid.street && <p>Invalid Street</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={inputPostalCode} />
        {!formValid.postalCode && <p>Invalid Postal Code</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={inputCity} />
        {!formValid.city && <p>Invalid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
