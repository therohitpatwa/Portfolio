export const prerender = false;

export async function GET() {
  const wakatimeApiKey = import.meta.env.PUBLIC_WAKATIME_API_KEY;

  if (!wakatimeApiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const encodedKey = Buffer.from(wakatimeApiKey).toString('base64');
    
    const response = await fetch('https://wakatime.com/api/v1/users/current/summaries?range=today', {
      headers: {
        'Authorization': `Basic ${encodedKey}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch WakaTime data');
    }

    const data = await response.json();
    const today = data.data?.[0];
    const yesterday = data.data?.[1];
    const grandTotal = today?.grand_total;
    
    let result = {
      status: "Offline in",
      timeWorked: "0m",
      period: "Today"
    };

    if (grandTotal && grandTotal.text && grandTotal.text !== "0 secs") {
      result = {
        status: "Online in",
        timeWorked: grandTotal.text,
        period: "Today"
      };
    } else if (yesterday?.grand_total?.text) {
      result = {
        status: "Offline in",
        timeWorked: yesterday.grand_total.text,
        period: "Yesterday"
      };
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error('Error fetching WakaTime data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch activity data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
