require('dotenv').config()
const { sendChannelNotification } = require('../services/pushNotification')

async function main() {
  const args = process.argv.slice(2)
  
  if (args.length !== 2) {
    console.log('Usage: npm run notify "Notification Title" "Notification Message"')
    process.exit(1)
  }

  const [title, message] = args

  try {
    console.log('Sending notification...')
    console.log('Using channel address:', process.env.NEXT_PUBLIC_PUSH_CHANNEL_ADDRESS)
    await sendChannelNotification(title, message)
    console.log('Notification sent successfully!')
  } catch (error) {
    console.error('Failed to send notification:', error)
    process.exit(1)
  }
}

main() 