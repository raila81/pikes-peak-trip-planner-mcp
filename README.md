# Pikes Peak Trip Planner MCP

Pikes Peak (Colorado) trip planning tools for AI assistants: what applies to your date and way up (drive the Pikes Peak Highway, Highway shuttle, Cog Railway, Barr Trail), whether a timed-entry permit is needed, gate and summit hours, a timeline with the noon storm cutoff, how far up the Highway is open right now with the forecast, what a group pays by car, shuttle or Cog Railway, Barr Trail and Manitou Incline hike times, and facts with sources. Same answers as the planning tools on [pikespeak.info](https://pikespeak.info), an independent guide not affiliated with the City of Colorado Springs, the Pikes Peak Highway or the Cog Railway.

- **Endpoint:** `https://pikespeak.info/mcp` (MCP Streamable HTTP, public, no sign-in, no API key)
- **Docs:** [pikespeak.info/ai-assistants](https://pikespeak.info/ai-assistants/)
- **MCP Registry:** `info.pikespeak/pikes-peak-trip-planner`
- **npm:** `pikes-peak-trip-planner-mcp` (stdio bridge to the endpoint, for clients that only run local servers)

## Tools

All tools are read-only (`readOnlyHint: true`), take only trip details and store nothing.

| Tool | What it answers |
|---|---|
| `plan_pikes_peak_day` | Day plan by date and way up: timed-entry permit rule, gate opening and last entry, closures, timeline from your start point with the noon cutoff, snow turnaround points, sunrise and sunset, what to book first. |
| `pikes_peak_conditions` | How far up the Highway is open right now (the city's status line, cached 15 minutes) and the National Weather Service forecast. |
| `compare_pikes_peak_costs` | Highway per person or carload, timed-entry permits, shuttle and Cog Railway fares for your group, cheapest first. |
| `hike_time` | Barr Trail hours up and down by pace and acclimatisation, start time for a noon summit; Manitou Incline time, hours and reservation release. |
| `pikes_peak_facts` | Elevation, distances, fees, hours, rules and dates, each with its source and check date. |

## Connect

Remote (recommended):

```json
{
  "mcpServers": {
    "pikes-peak-trip-planner": {
      "type": "streamable-http",
      "url": "https://pikespeak.info/mcp?src=mcp"
    }
  }
}
```

Claude: Settings → Connectors → Add custom connector → `https://pikespeak.info/mcp?src=claude`

Claude Code: `claude mcp add --transport http pikes-peak-trip-planner https://pikespeak.info/mcp?src=mcp`

Local stdio bridge (Node.js 18+):

```json
{
  "mcpServers": {
    "pikes-peak-trip-planner": {
      "command": "npx",
      "args": ["-y", "pikes-peak-trip-planner-mcp"]
    }
  }
}
```

## Example prompts

- "Help me plan a Pikes Peak trip next Saturday from Denver. We want to drive up."
- "Is Pikes Peak open today? How far up can I drive?"
- "Is the Cog Railway or driving cheaper for 2 adults and 3 kids in August?"
- "What time should I start the Barr Trail to be on the summit by noon?"

## Privacy

The tools receive trip details only and keep nothing. See [pikespeak.info/privacy](https://pikespeak.info/privacy/#ai-assistants) and [terms](https://pikespeak.info/terms/).

## License

MIT
