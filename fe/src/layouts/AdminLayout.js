import { useState } from "react";
import HeaderAdmin from "../components/layout/Admin/HeaderAdmin";
import SidebarAdmin from "../components/layout/Admin/SidebarAdmin";


function AdminLayout({children}) {
    const [selectedTeam] = useState('Team 1');
    return ( 
        <div className="flex min-h-screen bg-gray-50">
        <SidebarAdmin selectedTeam={selectedTeam} />
        <div className="flex-1">
          <HeaderAdmin />
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
     );
}

export default AdminLayout;