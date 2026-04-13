import axios from 'axios';

const API_TARGET = "https://prop-mgmt-api-1064799326078.us-central1.run.app";

async function test() {
  const propertyId = 1;
  const randomId = Math.floor(Math.random() * 1000000);
  
  const wrappers = ['income', 'data', 'record', 'item'];

  for (const w of wrappers) {
    console.log(`Testing wrapper: ${w}`);
    try {
      const res = await axios.post(`${API_TARGET}/income/${propertyId}`, {
        [w]: {
          income_id: randomId,
          amount: 100,
          date: '2026-04-12',
          description: 'Test'
        }
      }, {
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' }
      });
      console.log(`SUCCESS with ${w}: ${res.status}`);
      return;
    } catch (err: any) {
      console.log(`  ${w} failed: ${err.response?.status}`);
    }
  }
}

test();
