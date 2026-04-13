import axios from 'axios';

const API_TARGET = "https://prop-mgmt-api-1064799326078.us-central1.run.app";

async function test() {
  const propertyId = 1;
  const randomId = Math.floor(Math.random() * 1000000);
  
  const paths = [
    '/income/add',
    '/income/create',
    '/income/new',
    '/income/save',
    '/income/insert'
  ];

  for (const p of paths) {
    console.log(`Testing path: ${p}`);
    try {
      const res = await axios.post(`${API_TARGET}${p}`, {
        income_id: randomId,
        property_id: propertyId,
        amount: 100,
        date: '2026-04-12',
        description: 'Test'
      }, {
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' }
      });
      console.log(`SUCCESS with ${p}: ${res.status}`);
      return;
    } catch (err: any) {
      console.log(`  ${p} failed: ${err.response?.status}`);
    }
  }
}

test();
