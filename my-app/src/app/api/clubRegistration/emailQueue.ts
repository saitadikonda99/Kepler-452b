// emailQueue.js
import Bull from 'bull';
import nodemailer from 'nodemailer';


const emailQueue = new Bull('emailQueue', {
    redis: {
        host: 'localhost',
        port: 6379,
        password: process.env.REDIS_PASSWORD
    },
});

emailQueue.process(async (job) => {
  const { email, subject, text } = job.data;
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
  }
});

// Start the queue processing
emailQueue.on('ready', () => {
  console.log('Email queue is ready and processing jobs');
  emailQueue.resume();
});

emailQueue.on('error', (error) => {
  console.error('Error in email queue:', error);
});

export { emailQueue };
