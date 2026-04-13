import axios from 'axios';

const API_TARGET = "https://prop-mgmt-api-1064799326078.us-central1.run.app";

async function test() {
  const propertyId = 1;
  const randomId = Math.floor(Math.random() * 1000000);
  
  console.log('Testing GET for creation...');
  try {
    const res = await axios.get(`${API_TARGET}/income/${propertyId}`, {
      params: {
        income_id: randomId,
        amount: 100,
        date: '2026-04-12',
        description: 'Test'
      }
    });
    console.log(`SUCCESS: ${res.status}`);
    console.log('Data:', JSON.stringify(res.data, null, 2));
  } catch (err: any) {
    console.log(`FAILED: ${err.response?.status || err.message}`);
  }
}

test();
