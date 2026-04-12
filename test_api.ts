import axios from 'axios';

const API_TARGET = "http://localhost:3000/api-proxy";

async function test() {
  const propertyId = 1;
  const randomId = Math.floor(Math.random() * 1000000);
  const endpoints = [
    { method: 'GET', url: `/properties`, data: {} },
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Testing ${endpoint.method} ${endpoint.url}...`);
      const res = await axios({
        method: endpoint.method,
        url: `${API_TARGET}${endpoint.url}`,
        data: endpoint.data,
        headers: { 
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      });
      console.log(`SUCCESS: ${res.status}`);
      break;
    } catch (err: any) {
      console.log(`FAILED: ${err.response?.status || err.message}`);
      if (err.response?.data) {
        console.log('Response data:', JSON.stringify(err.response.data));
      }
    }
  }
}

test();
