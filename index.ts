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
  fetch(req) {
    const url = new URL(req.url).pathname;

    const outDir = './dist';
    let fileName: string;
    if (url === '/') {
      fileName = `${outDir}/index.html`;
    } else if (url === '/alive') {
      return new Response(JSON.stringify(aliveData));
    } else {
      fileName = `${outDir}/${url}`;
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

  fetch(`https://andreasgoss.com/alive`)
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
        timestamp: new Date(Date.now()).toISOString(),
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

      // limit to 100 entries
      aliveData.data = aliveData.data.slice(-100);

      // Call the function again after 1 minute
      setTimeout(fetchAndMeasure, 60 * 1000);
    })
    .catch(() => {
      // Call the function again after 1 seconds even if there's an error
      setTimeout(fetchAndMeasure, 60 * 1000);
    });
}

// Call the function for the first time
fetchAndMeasure();
