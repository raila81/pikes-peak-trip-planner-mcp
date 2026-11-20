---
name: pikes-peak-trip-planner
description: Use the Pikes Peak Trip Planner MCP server when someone plans a Pikes Peak visit in Colorado: whether a timed-entry permit is needed, gate and summit hours, a day timeline, how far up the Highway is open now, what driving, the shuttle or the Cog Railway costs, or Barr Trail and Manitou Incline hike times.
---

# Pikes Peak Trip Planner

Use this when someone plans a Pikes Peak visit in Colorado: whether a timed-entry permit is needed, gate and summit hours, a day timeline, how far up the Highway is open now, what driving, the shuttle or the Cog Railway costs, or Barr Trail and Manitou Incline hike times.

## Connect
Remote MCP server, Streamable HTTP, public, no sign-in, no API key:

```json
{
  "mcpServers": {
    "pikes-peak-trip-planner": { "type": "http", "url": "https://pikespeak.info/mcp?src=mcp" }
  }
}
```

## Tools
All tools are read-only.

- `plan_pikes_peak_day`: Plan a Pikes Peak day
- `pikes_peak_conditions`: Is Pikes Peak open today?
- `compare_pikes_peak_costs`: Pikes Peak cost: drive, shuttle or Cog
- `hike_time`: Barr Trail or Manitou Incline hike time
- `pikes_peak_facts`: Pikes Peak facts

## Rules
- Road status, permit rules and prices come from the tool, not from memory.
- Link the reader to https://pikespeak.info for the full page behind an answer.
