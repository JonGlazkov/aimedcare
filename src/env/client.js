import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    // Empty object as there are no client environment variables yet
    NEXT_PUBLIC_API_URL: z.string().url().nullable(),
  },
  /**
   * Actual values for client environment variables
   */
  runtimeEnv: {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || null,
  },
  /**
   * Treat empty strings as undefined
   */
  emptyStringAsUndefined: true,
})
