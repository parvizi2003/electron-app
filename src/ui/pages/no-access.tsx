import { Button } from "@/components/ui";
import { Link } from "react-router-dom";

export function NoAccess() {
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center gap-4 p-4">
      <h1>🚫 Доступ запрещен</h1>
      <p>У вас нет прав для просмотра этой страницы.</p>
      <Button asChild>
        <Link to="/">На Главную</Link>
      </Button>
    </div>
  );
}
