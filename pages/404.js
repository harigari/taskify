// /pages/404.js
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div>
      <h1>Page no found</h1>
      <ul>
        <li>
          <Link href="/">Go home</Link>
        </li>
      </ul>
    </div>
  );
}
