export default function PendingApprovalPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="max-w-sm text-center space-y-3">
        <h1 className="text-xl font-semibold">Awaiting Approval</h1>
        <p className="text-gray-500">
          Your teacher account is pending review by an administrator.
          You&apos;ll be able to access your dashboard once approved.
        </p>
      </div>
    </div>
  );
}