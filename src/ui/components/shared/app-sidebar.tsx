import { Home, Inbox } from "lucide-react";

import {
  Button,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/";
import { Link } from "react-router-dom";
import { useLogout } from "@/api/auth/use-logout";

import { useTranslation } from "react-i18next";

export function AppSidebar() {
  const { handleLogout, isPending } = useLogout();
  const { t } = useTranslation();
  const items = [
    {
      title: t("navbar.home"),
      url: "/",
      icon: Home,
    },
    {
      title: t("navbar.orders"),
      url: "/orders",
      icon: Inbox,
    },
  ];
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Hot dog</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleLogout} loading={isPending}>
          {t("buttons.logout")}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
