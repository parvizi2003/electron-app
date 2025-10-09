import { Loader2 } from "lucide-react";

export function Loader() {
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 bg-white flex items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin block text-primary" />
    </div>
  );
}
