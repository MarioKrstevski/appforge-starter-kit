import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

export const fileRouter = {
  imageUploader: f({
    image: { maxFileSize: '4MB', maxFileCount: 1 },
  })
    .middleware(async () => {
      // TODO: verify auth here
      // const session = await auth.api.getSession(...)
      // if (!session) throw new UploadThingError('Unauthorized')
      return {}
    })
    .onUploadComplete(async ({ file }) => {
      console.log('[uploadthing] upload complete', file.url)
      return { url: file.url }
    }),
} satisfies FileRouter

export type AppFileRouter = typeof fileRouter
