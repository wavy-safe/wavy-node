import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const networks = [{ name: "Arbitrum", icon: "./arB.svg" }];

export function NetworkSelector() {
  return (
    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto px-4">
      {networks.map((network) => (
        <Card
          key={network.name}
          className="bg-muted/50 hover:bg-muted cursor-pointer"
        >
          <CardContent className="flex items-center gap-2 p-4">
            <Image
              src={network.icon}
              alt={network.name}
              width={24}
              height={24}
              className="dark:invert"
            />
            <span className="font-medium">{network.name}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
