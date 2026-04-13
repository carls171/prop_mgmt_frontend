import axios from 'axios';

const API_TARGET = "https://prop-mgmt-api-1064799326078.us-central1.run.app";

async function test() {
  const propertyId = 1;
  
  console.log('Testing /income/{property_id} with minimal body...');
  try {
    const res = await axios.post(`${API_TARGET}/income/${propertyId}`, {
      amount: 100,
      date: '2026-04-12',
      description: 'Test'
    }, {
      headers: { 'Content-Type': 'application/json', 'accept': 'application/json' }
    });
    console.log(`SUCCESS: ${res.status}`);
  } catch (err: any) {
    console.log(`FAILED: ${err.response?.status || err.message}`);
    if (err.response?.data) {
      console.log('Response:', JSON.stringify(err.response.data));
    }
  }
}

test();
