import { signIn } from "@/infrastructure/auth/auth.config";
import { loginWithCredentials } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm space-y-6 rounded-lg border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-center">Sign in to IGrade</h1>

        {error && (
          <p className="text-sm text-red-600 text-center">
            Invalid email or password
          </p>
        )}

        <form action={loginWithCredentials} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full rounded border px-3 py-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full rounded border px-3 py-2"
          />
          <button
            type="submit"
            className="w-full rounded bg-black py-2 text-white hover:bg-gray-800"
          >
            Sign in
          </button>
        </form>

        <div className="text-center text-sm text-gray-400">or</div>

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded border py-2 hover:bg-gray-50"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}