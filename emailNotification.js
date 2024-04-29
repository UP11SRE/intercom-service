const nodemailer = require('nodemailer');

// Create a transporter using the specified configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '', // Your Gmail email address
    pass: '' // Your Gmail password
  }
});

// Define a function to send an email
async function sendMail(message) {
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail(message);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error(error);
    throw new Error('Email sending failed');
  }
}

// Export the sendMail function
module.exports = {sendMail};
