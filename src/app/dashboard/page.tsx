import { auth } from "@/infrastructure/auth/auth.config";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <pre className="mt-4 rounded bg-gray-100 p-4 text-sm">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}