import { MoreVertical, Mail, ShieldCheck } from "lucide-react";
import { Typography } from "../../../../../../@All/AppForm/Form";
import { UserStatusBadge } from "../UserStatusBadge/UserStatusBadge";
import { lastActiveText } from "../../../../../../@All/Utility/LastActiveText";


interface UserProps {
  user: {
    id: string;
    firstname: string;
      lastname: string;
    email: string;
    role: string;
    status: 'active' | 'blocked' | 'disabled';
    lastActive: string;
  };
}

export const UserTableRow = ({ user }: UserProps) => (
  <tr className="group hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0">
    <td className="py-4 px-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-[var(--grad)] flex items-center justify-center text-[var(--main-web-color-2)] font-bold">
          {user.firstname?.charAt(0).toUpperCase()}
        </div>
        <div>
          <Typography className="font-bold text-slate-900 text-sm">{user.firstname}</Typography>
          <Typography className="text-slate-500 text-xs flex items-center gap-1">
            <Mail size={12} /> {user.email}
          </Typography>
        </div>
      </div>
    </td>
    <td className="py-4 px-4">
      <div className="flex items-center gap-1.5">
        <ShieldCheck size={14} className="text-slate-400" />
        <Typography className="text-sm text-slate-600">{user.role}</Typography>
      </div>
    </td>
    <td className="py-4 px-4">
      <UserStatusBadge status={user.status} />
    </td>
    <td className="py-4 px-4">
      <Typography className="text-xs text-slate-500">{lastActiveText(user.lastActive)}</Typography>
    </td>
    <td className="py-4 px-4 text-right">
      <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-400 hover:text-indigo-600">
        <MoreVertical size={18} />
      </button>
    </td>
  </tr>
);