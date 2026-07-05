import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invite/:subscriberId',
    {
      schema: {
        summary: 'Access Invite link and redircts user',
        tags: ['Referral'],
        params: z.object({
          subscriberId: z.string().uuid(),
        }),
        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await accessInviteLink({ subscriberId })

      const redirctsUrl = new URL(env.WEB_URL)

      redirctsUrl.searchParams.set('referrer', subscriberId)

      return reply.redirect(redirctsUrl.toString(), 302)
    }
  )
}
