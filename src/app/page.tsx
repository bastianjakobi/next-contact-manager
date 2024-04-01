import Card from "@/components/card/Card";
import { User } from "@/model/user";
import sql from "@/utils/db";
import Link from "next/link";
import { Row } from "postgres";

export default async function Home() {
  const users = await sql`SELECT * FROM users`;
  users.sort((a: Row, b: Row) => a.name.localeCompare(b.name));

  return (
    <div className="grid gap-3 grid-cols-1">
      {
        (users && users.length > 0) ?
          users.map((user: Row) => (
            <Link href={`/contact/${user.id}`} key={user.id}>
              <Card title={user.name} />
            </Link>
          ))
          : <p>No contacts found</p>
      }
    </div>
  );
}
