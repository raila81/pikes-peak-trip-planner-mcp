#!/usr/bin/env node
// Pikes Peak Trip Planner MCP: stdio bridge to the hosted server at https://pikespeak.info/mcp.
// For MCP clients that only start local (stdio) servers. Reads newline-delimited JSON-RPC from stdin, posts each
// message to the hosted endpoint and writes the answer to stdout. No dependencies, no storage, no telemetry.
// Node.js 18 or later (global fetch). Override the endpoint with PIKESPEAK_MCP_URL (for testing).
import { createInterface } from 'node:readline';

const URL_ = process.env.PIKESPEAK_MCP_URL || 'https://pikespeak.info/mcp?src=mcp';
const VERSION = '1.0.0';
const write = (obj) => process.stdout.write(JSON.stringify(obj) + '\n');
const fail = (id, message) => { if (id !== undefined && id !== null) write({ jsonrpc: '2.0', id, error: { code: -32603, message } }); };

let pending = 0, closed = false;
const done = () => { if (closed && pending === 0) process.exit(0); };

async function forward(line) {
  let msg;
  try { msg = JSON.parse(line); } catch { write({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }); return; }
  const id = Array.isArray(msg) ? null : msg?.id;
  try {
    const res = await fetch(URL_, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', 'User-Agent': `pikes-peak-trip-planner-mcp/${VERSION}` },
      body: line,
      signal: AbortSignal.timeout(30000),
    });
    if (res.status === 202 || res.status === 204) return; // notification acknowledged
    const text = await res.text();
    if (!res.ok && !text) { fail(id, `Server answered HTTP ${res.status}`); return; }
    const body = JSON.parse(text);
    for (const m of Array.isArray(body) ? body : [body]) write(m);
  } catch (e) {
    fail(id, `Could not reach pikespeak.info: ${e?.message || e}`);
  }
}

const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });
rl.on('line', (line) => {
  if (!line.trim()) return;
  pending++;
  forward(line).finally(() => { pending--; done(); });
});
rl.on('close', () => { closed = true; done(); });
