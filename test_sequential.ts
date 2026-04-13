import axios from 'axios';

const API_TARGET = "https://prop-mgmt-api-1064799326078.us-central1.run.app";

async function test() {
  const propertyId = 1;
  
  console.log('Fetching existing income to find next ID...');
  const resGet = await axios.get(`${API_TARGET}/income/${propertyId}`);
  const incomes = resGet.data;
  const maxId = Math.max(...incomes.map((i: any) => i.income_id));
  const nextId = maxId + 1;

  console.log(`Testing with next ID: ${nextId}`);
  try {
    const res = await axios.post(`${API_TARGET}/income/${propertyId}`, {
      income_id: nextId,
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
