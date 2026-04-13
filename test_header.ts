import axios from 'axios';

const API_TARGET = "https://prop-mgmt-api-1064799326078.us-central1.run.app";

async function test() {
  const propertyId = 1;
  const randomId = Math.floor(Math.random() * 1000000);
  
  console.log('Testing X-Income-Id header...');
  try {
    const res = await axios.post(`${API_TARGET}/income/${propertyId}`, {
      amount: 100,
      date: '2026-04-12',
      description: 'Test'
    }, {
      headers: { 
        'Content-Type': 'application/json', 
        'accept': 'application/json',
        'X-Income-Id': randomId.toString()
      }
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
