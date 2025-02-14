export interface WebhookUrlProps {
  url: string
  baseUrl: string
  apiKey: string
  onUpdate: (url: string) => void
}