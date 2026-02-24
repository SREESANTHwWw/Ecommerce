

export const UserStatusBadge = ({ status }: { status: 'active' | 'blocked' | 'disabled' }) => {
  const styles = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-100",
    blocked: "bg-amber-50 text-amber-700 border-amber-100",
    disabled: "bg-rose-50 text-rose-700 border-rose-100",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
};