require('dotenv').config();

let secrets = {
    db_Link: process.env.db_Link,
    JWT_KEY: process.env.JWT_KEY,
    Mail_Pass: process.env.Mail_Pass,
    Mail_id: process.env.Mail_id,
    razorSecret: process.env.razorSecret,
    razorId: process.env.razorId,
    rz_verify: process.env.rz_verify,
    myEmail: process.env.myEmail
}
module.exports = secrets