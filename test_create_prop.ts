import axios from 'axios';

const API_TARGET = "https://prop-mgmt-api-1064799326078.us-central1.run.app";

async function test() {
  console.log('Testing POST /properties...');
  try {
    const res = await axios.post(`${API_TARGET}/properties`, {
      name: "Test Property",
      address: "123 Test St",
      city: "Test City",
      state: "TS",
      postal_code: "12345",
      property_type: "Single Family",
      tenant_name: "Test Tenant",
      monthly_rent: 1000
    }, {
      headers: { 'Content-Type': 'application/json', 'accept': 'application/json' }
    });
    console.log(`SUCCESS: ${res.status}`);
    console.log('Data:', JSON.stringify(res.data, null, 2));
  } catch (err: any) {
    console.log(`FAILED: ${err.response?.status || err.message}`);
    if (err.response?.data) {
      console.log('Response:', JSON.stringify(err.response.data));
    }
  }
}

test();
