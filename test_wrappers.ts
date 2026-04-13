import axios from 'axios';

const API_TARGET = "https://prop-mgmt-api-1064799326078.us-central1.run.app";

async function test() {
  const propertyId = 1;
  const randomId = Math.floor(Math.random() * 1000000);
  
  const variations = [
    {
      name: "Wrapped in 'income' key",
      data: { income: { income_id: randomId, property_id: propertyId, amount: 100, date: '2026-04-12', description: 'Test' } }
    },
    {
      name: "Wrapped in 'data' key",
      data: { data: { income_id: randomId, property_id: propertyId, amount: 100, date: '2026-04-12', description: 'Test' } }
    },
    {
      name: "IDs as strings",
      data: { income_id: randomId.toString(), property_id: propertyId.toString(), amount: 100, date: '2026-04-12', description: 'Test' }
    }
  ];

  for (const v of variations) {
    console.log(`Testing variation: ${v.name}`);
    try {
      const res = await axios.post(`${API_TARGET}/income/${propertyId}`, v.data, {
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' }
      });
      console.log(`SUCCESS: ${res.status}`);
      return;
    } catch (err: any) {
      console.log(`FAILED: ${err.response?.status || err.message}`);
      if (err.response?.data) {
        console.log('Response:', JSON.stringify(err.response.data));
      }
    }
    console.log('---');
  }
}

test();
