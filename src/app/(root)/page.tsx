import Link from 'next/link';
export default function Home() {
  return (
    <div>
      <h1> Hello</h1>
      <Link href="/register" className="text-3xl">
        click
      </Link>
    </div>
  );
}
