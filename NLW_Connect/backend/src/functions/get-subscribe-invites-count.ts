import { redis } from '../redis/client'

interface GetSubscribeInvitesCountParams {
  subscriberId: string
}

export async function getSubscribeInvitesCount({
  subscriberId,
}: GetSubscribeInvitesCountParams) {
  const count = await redis.zscore('referral:ranking', subscriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
