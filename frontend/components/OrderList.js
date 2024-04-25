import React, { useState } from 'react'
import { useGetOrdersQuery } from '../state/pizzaApi'
import { useDispatch } from 'react-redux';
import { filterOrdersBySize } from "../state/previousOrdersSlice";


export default function OrderList() {
  const dispatch = useDispatch();
  const { data: orders } = useGetOrdersQuery();
  const [sizeFilter, setSizeFilter] = useState('All');

  const handleSizeFilter  = (size) => {
    dispatch(filterOrdersBySize({ size }));
    setSizeFilter(size);
  };


 

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {orders &&
          orders
          .filter((order) => sizeFilter === 'All' || order.size === sizeFilter)
          .map((order) => {
            return (
              <li key={order.id}>
                <div>
                  Customer: {order.customer}, Size: {order.size}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === sizeFilter ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => handleSizeFilter(size)}>
                {size}
                </button>
          })
        }
      </div>
    </div>
  )
}
