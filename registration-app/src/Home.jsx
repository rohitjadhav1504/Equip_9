import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: "", price: "", quantity: "" });
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  // Fetch user data (e.g., First Name and Last Name)
  useEffect(() => {
    const fetchUser = async () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData) {
        navigate("/login"); // Redirect to login if user data is missing
      } else {
        setUser(userData);
      }
    };
    fetchUser();
  }, [navigate]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8082/product");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle add/update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:8082/product/${editId}`, formData);
      } else {
        await axios.post("http://localhost:8082/product", formData);
      }
      setFormData({ name: "", price: "", quantity: "" });
      setEditId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // Handle edit product
  const handleEdit = (product) => {
    setEditId(product.id);
    setFormData({ name: product.name, price: product.price, quantity: product.quantity });
  };

  // Handle delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/product/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Greet user based on time of day
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="container mt-4">
      {user && (
        <h3 className="mb-2">
          {getGreeting()} {user.firstName} {user.lastName}
        </h3>
      )}
      <button onClick={handleLogout} className="btn btn-danger float-end mb-3">
        Logout
      </button>
      <br />
      <hr />
      <div className="col-md-6 mx-auto">
      <h2 className="mt-2">Product Management</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input
            type="text"
            className="form-control"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Quantity</label>
          <input
            type="text"
            className="form-control"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>
      </div>
      <br />
      <hr />
      <table className="table border-1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(product)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
