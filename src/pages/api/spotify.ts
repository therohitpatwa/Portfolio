export const prerender = false;

const client_id = import.meta.env.SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }),
  });

  return response.json();
}

export async function GET() {
  if (!client_id || !client_secret || !refresh_token) {
    return new Response(JSON.stringify({ error: 'Spotify credentials not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { access_token } = await getAccessToken();

    // First try to get currently playing
    const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // If currently playing something
    if (nowPlayingResponse.status === 200) {
      const nowPlaying = await nowPlayingResponse.json();
      
      if (nowPlaying.is_playing && nowPlaying.item) {
        const track = nowPlaying.item;
        return new Response(JSON.stringify({
          isPlaying: true,
          title: track.name,
          artist: track.artists.map((artist: { name: string }) => artist.name).join(', '),
          album: track.album.name,
          albumImageUrl: track.album.images[0]?.url,
          songUrl: track.external_urls.spotify,
          trackUri: track.uri,
          trackId: track.id,
          durationMs: track.duration_ms,
          progressMs: nowPlaying.progress_ms,
        }), {
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=5'
          }
        });
      }
    }

    // If not currently playing, get recently played
    const recentlyPlayedResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (recentlyPlayedResponse.status === 200) {
      const recentlyPlayed = await recentlyPlayedResponse.json();
      
      if (recentlyPlayed.items && recentlyPlayed.items.length > 0) {
        const track = recentlyPlayed.items[0].track;
        const playedAt = recentlyPlayed.items[0].played_at;
        
        return new Response(JSON.stringify({
          isPlaying: false,
          title: track.name,
          artist: track.artists.map((artist: { name: string }) => artist.name).join(', '),
          album: track.album.name,
          albumImageUrl: track.album.images[0]?.url,
          songUrl: track.external_urls.spotify,
          trackUri: track.uri,
          trackId: track.id,
          durationMs: track.duration_ms,
          playedAt: playedAt,
        }), {
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=15'
          }
        });
      }
    }

    return new Response(JSON.stringify({ isPlaying: false, noData: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Spotify API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch Spotify data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
