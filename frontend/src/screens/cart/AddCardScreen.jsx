import React, { useState } from 'react';
import api from "../../api/api.js";
import { useNavigate } from 'react-router-dom';

const AddCardScreen = () => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expirationDate: '',
    cardHolder: '',
    cardType: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/add-card", cardData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess(response.data.message);
      setCardData({ cardNumber: '', expirationDate: '', cardHolder: '', cardType: '' }); 
    } catch (error) {
      setError(error.response?.data?.message || "Hubo un problema al agregar la tarjeta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Agregar Tarjeta</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cardNumber">Número de tarjeta</label>
          <input
            type="text"
            name="cardNumber"
            value={cardData.cardNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="expirationDate">Fecha de expiración</label>
          <input
            type="text"
            name="expirationDate"
            value={cardData.expirationDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="cardHolder">Titular de la tarjeta</label>
          <input
            type="text"
            name="cardHolder"
            value={cardData.cardHolder}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="cardType">Tipo de tarjeta</label>
          <input
            type="text"
            name="cardType"
            value={cardData.cardType}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Agregando..." : "Agregar Tarjeta"}
        </button>
      </form>
    </div>
  );
};

export default AddCardScreen;