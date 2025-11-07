
import AddPayment from '../components/Payments/AddPayment';
import Transactions from '../components/Payments/Transactions';

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100">
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddPayment />
        <Transactions />
      </div>
    </div>
  );
}
