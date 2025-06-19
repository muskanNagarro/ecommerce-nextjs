export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">ShopIt</h1>
          <nav className="space-x-4">
            <a href="/" className="hover:underline">Home</a>
            <a href="/cart" className="hover:underline">Cart</a>
            <a href="/profile" className="hover:underline">Profile</a>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 text-white text-center p-4 mt-8">
        &copy; {new Date().getFullYear()} ShopIt. All rights reserved.
      </footer>
    </div>
  );
}