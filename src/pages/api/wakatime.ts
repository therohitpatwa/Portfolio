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
    const encodedKey = btoa(wakatimeApiKey);
    
    const response = await fetch('https://wakatime.com/api/v1/users/current/summaries?range=today', {
      headers: {
        'Authorization': `Basic ${encodedKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`WakaTime API error: ${response.status}`);
    }

    const data = await response.json();
    const today = data.data?.[0];
    const yesterday = data.data?.[1];
    const grandTotal = today?.grand_total;
    
    let activityData = {
      status: 'Offline in',
      statusSuffix: 'IntelliJ',
      timeWorked: '0m',
      period: 'Today'
    };

    if (grandTotal && grandTotal.text && grandTotal.text !== "0 secs") {
      activityData = {
        status: 'Online in',
        statusSuffix: 'IntelliJ',
        timeWorked: grandTotal.text,
        period: 'Today'
      };
    } else if (yesterday?.grand_total?.text) {
      activityData = {
        status: 'Offline in',
        statusSuffix: 'IntelliJ',
        timeWorked: yesterday.grand_total.text,
        period: 'Yesterday'
      };
    }

    return new Response(JSON.stringify(activityData), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      status: 'Offline in',
      statusSuffix: 'IntelliJ',
      timeWorked: '0m',
      period: 'Today'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
