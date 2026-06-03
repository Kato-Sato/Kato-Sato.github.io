const fs = require('node:fs');
const path = require('node:path');
const jsonPath = path.join(__dirname, 'data.json');
function updateJSON(){
    try{
        const rawData = fs.readFileSync(jsonPath, 'utf8');
        const data = JSON.parse(rawData);
        // data edit
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`successfully updated`);
    }catch(error){
        console.error('error', error.message);
    }
}

updateJSON();
