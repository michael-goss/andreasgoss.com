interface ResponseTime {
  timestamp: string;
  responseTime: number;
}

interface AliveData {
  maximum?: ResponseTime;
  data: ResponseTime[];
}

const aliveData: AliveData = { data: [] };

Bun.serve({
  port: Bun.env.PORT,
  fetch(req) {
    const fileWhiteList = [
      '/bundle.js',
      '/styles.css',
      '/andi.png',
      '/andi_lustig.png',
      '/bg_teppich.webp',
      '/apple-touch-icon.png',
      '/favicon-16x16.png',
      '/favicon-32x32.png',
      '/favicon.ico',
    ];
    const url = new URL(req.url).pathname;

    const outDir = './dist';
    let fileName: string;
    if (url === '/') {
      fileName = `${outDir}/index.html`;
    } else if (url === '/alive') {
      return new Response(JSON.stringify(aliveData));
    } else {
      if (fileWhiteList.includes(url)) {
        fileName = `${outDir}/${url}`;
      } else {
        return new Response('404', { status: 404 });
      }
    }

    return new Response(Bun.file(fileName));
  },
  error(error) {
    return new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        'Content-Type': 'text/html',
      },
      status: 404,
    });
  },
});

function fetchAndMeasure() {
  // Record the start time
  const startTime = Date.now();
  const timestampNow = new Date(startTime).toISOString();
  const endpoint = Bun.env.ALIVE_ENDPOINT;
  const interval = parseInt(Bun.env.ALIVE_INTERVAL_S || '1') + Math.floor(Math.random() * 100);

  fetch(endpoint || '')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      // Calculate time taken
      const timeElapsed = Date.now() - startTime;

      // add new data to aliveData object
      aliveData.data.push({
        timestamp: timestampNow,
        responseTime: timeElapsed,
      });

      // find new maximum responseTime
      aliveData.maximum = aliveData.data.reduce(
        (prev, curr) => {
          if (prev.responseTime > curr.responseTime) {
            return prev;
          }
          return curr;
        },
        { timestamp: '', responseTime: -Infinity }
      );

      // limit to 300 entries
      aliveData.data = aliveData.data.slice(-300);

      // Call the function again after some interval
      setTimeout(fetchAndMeasure, interval * 1000);
    })
    .catch(() => {
      // Call the function again after some interval even if there's an error
      aliveData.data.push({
        timestamp: timestampNow,
        responseTime: -1,
      });
      setTimeout(fetchAndMeasure, interval * 1000);
    });
}

// Call the function for the first time
fetchAndMeasure();
