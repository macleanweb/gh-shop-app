import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-between items-center p-4 bg-slate-700 text-slate-100">
      <h1 className="text-2xl font-bold">Mock Store</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
