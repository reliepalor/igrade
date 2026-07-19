"use client";

import { useState } from "react";
import { registerAsStudent, registerAsTeacher } from "./actions";

export default function OnboardingPage() {
  const [choice, setChoice] = useState<"STUDENT" | "TEACHER" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleStudentSubmit(formData: FormData) {
    const result = await registerAsStudent(formData);
    if (result?.error) setError(result.error);
  }

  return (
    <div className="flex text-gray-800 min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm space-y-6 rounded-lg border bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-center">I am a...</h1>

        {!choice && (
          <div className="flex gap-3">
            <button
              onClick={() => setChoice("STUDENT")}
              className="flex-1 rounded border py-2 hover:bg-gray-50 cursor-pointer"
            >
              Student
            </button>
            <button
              onClick={() => setChoice("TEACHER")}
              className="flex-1 rounded border py-2 hover:bg-gray-50 cursor-pointer"
            >
              Teacher
            </button>
          </div>
        )}

        {choice === "STUDENT" && (
          <form action={handleStudentSubmit} className="space-y-4">
            <input
              type="text"
              name="studentId"
              placeholder="Student ID"
              required
              className="w-full rounded border px-3 py-2"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full rounded bg-black py-2 text-white hover:bg-gray-800"
            >
              Continue
            </button>
          </form>
        )}

        {choice === "TEACHER" && (
          <form action={registerAsTeacher} className="space-y-4">
            <p className="text-sm text-gray-500">
              Your account will need admin approval before you can access teacher features.
            </p>
            <button
              type="submit"
              className="w-full rounded bg-black py-2 text-white hover:bg-gray-800"
            >
              Submit for approval
            </button>
          </form>
        )}
      </div>
    </div>
  );
}