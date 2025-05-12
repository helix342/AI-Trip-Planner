const mongoose = require('mongoose');
mongoose.set('debug', true);
const PASSWORD = "VwkiE1VSouPPOFxE";
const DATABASE_NAME = 'trip-api';
const CONNECTION_URI = `mongodb+srv://cluster0.swdkomf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



async function main() {
    await mongoose.connect(CONNECTION_URI, {
        dbName: DATABASE_NAME,
        user: 'syedsami4751',
        pass: PASSWORD,
    });
}

main().then(()=>{
    console.log("mongodb connected");
}).catch(console.log);

