import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [refreshTokenTrigger, setRefreshTokenTrigger] = useState(0); // 🔄 Trigger to re-fetch

  // Get token when component mounts or trigger updates
  useEffect(() => {
    async function setElectronToken() {
      try {
        const electronToken = await window.electron.getToken();
        setToken(electronToken);
      } catch (err) {
        console.error("Failed to fetch token:", err);
        setToken(null);
      }
    }
    setElectronToken();
  }, [refreshTokenTrigger]); // <- re-run when this changes

  // 🔘 When user sets a new token
  const handleSetToken = () => {
    window.electron.setToken(value);
    setValue(""); // optional: clear input
    setRefreshTokenTrigger((prev) => prev + 1); // trigger useEffect
  };

  // ❌ When user deletes the token
  const handleDeleteToken = async () => {
    await window.electron.deleteToken();
    setRefreshTokenTrigger((prev) => prev + 1); // trigger useEffect
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="font-bold text-2xl text-center">Hello from Main Page</h1>

      <div className="flex gap-10 items-center mx-auto w-fit mt-4">
        <h2>Token: {token}</h2>
        <Button onClick={handleDeleteToken} variant="destructive">
          Delete Token
        </Button>
      </div>

      <div className="flex flex-col gap-4 max-w-2xl mx-auto mt-6">
        <Input
          placeholder="Set Token"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="submit" onClick={handleSetToken}>
          Submit
        </Button>
      </div>
    </div>
  );
}
