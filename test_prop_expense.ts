import axios from 'axios';

const API_TARGET = "https://prop-mgmt-api-1064799326078.us-central1.run.app";

async function test() {
  const propertyId = 1;
  const randomId = Math.floor(Math.random() * 1000000);
  
  console.log('Testing /properties/{property_id}/expenses...');
  try {
    const res = await axios.post(`${API_TARGET}/properties/${propertyId}/expenses`, {
      expense_id: randomId,
      amount: 100,
      date: '2026-04-12',
      category: 'Maintenance',
      vendor: 'Test',
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
