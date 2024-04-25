import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setFullName, setSize, toggleTopping } from '../state/pizzaOrderFormSlice'
import { useNewOrderMutation } from "../state/pizzaApi";


export default function PizzaForm() {
  const dispatch = useDispatch();
  const formData = useSelector(state => state.pizzaOrderForm)
  const [createOrder, { isLoading }] = useNewOrderMutation();
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.size) {
      setErrorMessage("Order failed: size must be one of the following values: S, M, L");
      return;
    }
    if (formData.fullName) {
      try {
        const toppings = Object.keys(formData.toppings).filter(toppingId => formData.toppings[toppingId]);
        
        const orderData = {
          fullName: formData.fullName,
          size: formData.size,
          toppings: toppings
        };
        await createOrder(orderData);
        console.log("Order created successfully");
      } catch (error) {
        console.error('Failed to create order:', error);
      }
    } else {
      console.error("Full Name and Size are required");
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    dispatch(setFullName(value));
  };

  const handleSizeChange = (e) => {
    const { value } = e.target;
    dispatch(setSize(value));
  };

  const handleToppingChange = (e) => {
    const { name, checked } = e.target;
    dispatch(toggleTopping({ topping: name, isChecked: checked }));
    };


  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {errorMessage && <div className='failure'>{errorMessage}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" value={formData.size} onChange={handleSizeChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input 
          data-testid="checkPepperoni" 
          name="1" type="checkbox" 
          checked={formData.toppings.pepperoni} 
          onChange={handleToppingChange} 
          />
          Pepperoni<br />
          </label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" checked={formData.toppings.greenPeppers} onChange={handleToppingChange} />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" checked={formData.toppings.pineapple} onChange={handleToppingChange}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" checked={formData.toppings.mushrooms} onChange={handleToppingChange}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" checked={formData.toppings.ham} onChange={handleToppingChange} />
          Ham<br />
          </label>
      </div>
      <input data-testid="submit" type="submit" value="Place Order" />
    </form>
  );
}
