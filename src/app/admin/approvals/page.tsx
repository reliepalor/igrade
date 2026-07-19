import { getPendingTeachers } from "@/domain/services/teacherApproval";
import { approve, reject } from "./actions";

export default async function ApprovalsPage() {
  const pendingTeachers = await getPendingTeachers();

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold mb-4">Pending Teacher Approvals</h1>

      {pendingTeachers.length === 0 && (
        <p className="text-gray-500">No pending approvals.</p>
      )}

      <div className="space-y-3">
        {pendingTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="flex items-center justify-between rounded border p-4"
          >
            <div>
              <p className="font-medium">{teacher.name}</p>
              <p className="text-sm text-gray-500">{teacher.email}</p>
            </div>
            <div className="flex gap-2">
              <form action={approve.bind(null, teacher.id)}>
                <button className="rounded bg-black px-3 py-1 text-sm text-white">
                  Approve
                </button>
              </form>
              <form action={reject.bind(null, teacher.id)}>
                <button className="rounded border px-3 py-1 text-sm">
                  Reject
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}