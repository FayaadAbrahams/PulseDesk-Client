
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { IconLayoutSidebarLeftExpand } from '@tabler/icons-react';
import { setSideBar } from "@/store/slices/sideBarSlice";
import { SideBarState } from "@/types/types";
import { useEffect } from "react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state: SideBarState) => state.sidebar.isOpen);

  useEffect(() => {
    if (sidebarOpen) console.log(sidebarOpen);
  }, [sidebarOpen]);
  return (
    <div>
      <Button className="dark p-2 w-10 h-10" onClick={() => dispatch(setSideBar(!sidebarOpen))}>
        <IconLayoutSidebarLeftExpand />
      </Button>
    </div>
  )
}
