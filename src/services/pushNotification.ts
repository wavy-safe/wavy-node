const PushAPI = require('@pushprotocol/restapi')
const { ENV } = require('@pushprotocol/restapi/src/lib/constants')
const { ethers } = require('ethers')

exports.sendChannelNotification = async (title: string, message: string) => {
  try {
    const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_PUSH_CHANNEL_PRIVATE_KEY!)
    
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 1, // broadcast
      identityType: 2, // direct payload
      notification: {
        title,
        body: message
      },
      payload: {
        title,
        body: message,
        cta: '',
        img: ''
      },
      channel: process.env.NEXT_PUBLIC_PUSH_CHANNEL_ADDRESS!,
      env: ENV.STAGING
    })

    console.log('Notification sent:', apiResponse)
    return apiResponse
  } catch (err) {
    console.error('Error sending notification:', err)
    throw err
  }
} 