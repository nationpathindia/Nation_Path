//////////////////////////////////////////////////////////////
// BREAKING STORE
//////////////////////////////////////////////////////////////

export interface BreakingPayload {
  id: string;
  title: string;
  slug: string;
  category?: string | null;
}

interface SSEClient {
  write(message: string): void;
}

let clients: SSEClient[] = [];
let latestBreaking: BreakingPayload | null = null;

//////////////////////////////////////////////////////////////
// CLIENTS
//////////////////////////////////////////////////////////////

export function addClient(client: SSEClient): void {
  clients.push(client);
}

export function removeClient(client: SSEClient): void {
  clients = clients.filter((c) => c !== client);
}

//////////////////////////////////////////////////////////////
// BROADCAST
//////////////////////////////////////////////////////////////

export function broadcastBreaking(
  payload: BreakingPayload
): void {
  latestBreaking = payload;

  const message = `data: ${JSON.stringify(payload)}\n\n`;

  for (const client of clients) {
    try {
      client.write(message);
    } catch {
      removeClient(client);
    }
  }
}

//////////////////////////////////////////////////////////////
// BACKWARD COMPATIBILITY
//////////////////////////////////////////////////////////////

export const setBreaking = broadcastBreaking;

//////////////////////////////////////////////////////////////
// GET LATEST
//////////////////////////////////////////////////////////////

export function getLatestBreaking(): BreakingPayload | null {
  return latestBreaking;
}