import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/components/Layout";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Recipient</th>
            <th>Products</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  Tên: {order.name} - SDT: {order.phone} <br />
                  Ngày giao: {order.date} - Giờ giao: {order.time} <br />
                  Địa chỉ: {order.address} <br />
                  Ghi chú: {order.note}
                </td>
                <td>
                  <ul>
                    {order.products.map((product) => (
                      <li key={product.productId}>
                        {product.quantity} x {product.productName}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{Number(order.totalAmount).toLocaleString("vi-VN")}đ</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
