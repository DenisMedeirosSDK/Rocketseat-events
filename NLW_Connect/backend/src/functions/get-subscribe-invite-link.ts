import { redis } from '../redis/client'

interface GetSubscribeInviteLinkParams {
  subscriberId: string
}

export async function getSubscribeInviteLink({
  subscriberId,
}: GetSubscribeInviteLinkParams) {
  const count = await redis.hget('referral:access-count', subscriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
