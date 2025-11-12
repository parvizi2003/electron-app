import { Button } from "@/components/ui";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as Error;

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center gap-4 p-4">
      <h1>😢 Упс! Что-то пошло не так.</h1>
      <p>{error.message || "Неизвестная ошибка"}</p>
      <Button asChild>
        <a href="/">На главную</a>
      </Button>
    </div>
  );
}
