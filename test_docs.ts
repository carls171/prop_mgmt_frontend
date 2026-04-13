import axios from 'axios';

const API_TARGET = "https://prop-mgmt-api-1064799326078.us-central1.run.app";

async function test() {
  const paths = ['/docs', '/redoc', '/openapi.json'];

  for (const p of paths) {
    console.log(`Testing path: ${p}`);
    try {
      const res = await axios.get(`${API_TARGET}${p}`);
      console.log(`SUCCESS with ${p}: ${res.status}`);
      if (p === '/openapi.json') {
        console.log('OpenAPI JSON found!');
        // console.log(JSON.stringify(res.data, null, 2));
        // I'll just save it to a file
        const fs = await import('fs');
        fs.writeFileSync('openapi.json', JSON.stringify(res.data, null, 2));
      }
    } catch (err: any) {
      console.log(`  ${p} failed: ${err.response?.status}`);
    }
  }
}

test();
