import './globals.css';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
