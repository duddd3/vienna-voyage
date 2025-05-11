import Header from '../components/Header';
import { CartProvider } from '../context/CartContext';

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      {children}
    </CartProvider>
  );
}
