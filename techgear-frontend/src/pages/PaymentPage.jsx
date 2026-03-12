import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { payOrder, failOrderPayment } from '../api/paymentApi';

const PaymentPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  const [loading, setLoading] = useState(false);

  const handlePaySuccess = async () => {
    try {
      setLoading(true);
      const payment = await payOrder(orderId);

      navigate('/order-success', {
        state: {
          order: {
            ...order,
            status: 'PAID',
            paymentStatus: 'PAID',
          },
          payment,
        },
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Thanh toán thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handlePayFail = async () => {
    try {
      setLoading(true);
      await failOrderPayment(orderId);
      alert('Đã ghi nhận thanh toán thất bại');
    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Không thể cập nhật trạng thái');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="mb-3">Thanh toán đơn hàng #{orderId}</h2>
          <p>Tổng tiền: <strong className="text-danger">{order?.total?.toLocaleString()}đ</strong></p>

          <div className="d-flex gap-3">
            <button className="btn btn-success" disabled={loading} onClick={handlePaySuccess}>
              Thanh toán thành công
            </button>
            <button className="btn btn-outline-danger" disabled={loading} onClick={handlePayFail}>
              Giả lập thất bại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;