import { NextApiRequest, NextApiResponse } from "next";
import { PrivyClient } from "@privy-io/react-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.PRIVY_APP_ID;

  if (!apiKey) {
    return res.status(500).json({ error: "API Key no configurada" });
  }

  try {
    const privy = new PrivyClient({ appId: apiKey });

    // Ejecuta operaciones con Privy
    const data = await privy.someApiMethod();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
