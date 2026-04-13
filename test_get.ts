import axios from 'axios';

const API_TARGET = "https://prop-mgmt-api-1064799326078.us-central1.run.app";

async function test() {
  const propertyId = 1;
  
  console.log('Fetching existing income...');
  try {
    const res = await axios.get(`${API_TARGET}/income/${propertyId}`, {
      headers: { 'accept': 'application/json' }
    });
    console.log('SUCCESS');
    console.log('Data:', JSON.stringify(res.data, null, 2));
  } catch (err: any) {
    console.log(`FAILED: ${err.response?.status || err.message}`);
  }
}

test();
