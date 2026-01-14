import Container from '@/components/layout/Container'
import { stegaClean } from '@sanity/client/stega'

export interface VideoBlockProps {
  _key: string
  videoType?: string
  youtubeId?: string
  vimeoId?: string
  sanityVideo?: any
  videoUrl?: string
  caption?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
}

export default function VideoBlock({
  videoType,
  youtubeId,
  vimeoId,
  sanityVideo,
  videoUrl,
  caption,
  autoplay,
  loop,
  muted,
}: VideoBlockProps) {
  const cleanVideoType = stegaClean(videoType) || 'youtube'
  const cleanAutoplay = stegaClean(autoplay) || false
  const cleanLoop = stegaClean(loop) || false
  const cleanMuted = stegaClean(muted) || false

  const renderVideo = () => {
    if (cleanVideoType === 'youtube' && youtubeId) {
      const autoplayParam = cleanAutoplay ? '&autoplay=1' : ''
      const loopParam = cleanLoop ? `&loop=1&playlist=${youtubeId}` : ''
      const mutedParam = cleanMuted ? '&mute=1' : ''
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0${autoplayParam}${loopParam}${mutedParam}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute left-0 top-0 h-full w-full"
          />
        </div>
      )
    }

    if (cleanVideoType === 'vimeo' && vimeoId) {
      const autoplayParam = cleanAutoplay ? '&autoplay=1' : ''
      const loopParam = cleanLoop ? '&loop=1' : ''
      const mutedParam = cleanMuted ? '&muted=1' : ''
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?${autoplayParam}${loopParam}${mutedParam}`}
            title="Vimeo video player"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute left-0 top-0 h-full w-full"
          />
        </div>
      )
    }

    if (cleanVideoType === 'sanity' && sanityVideo?.asset?.url) {
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <video
            src={sanityVideo.asset.url}
            controls
            autoPlay={cleanAutoplay}
            loop={cleanLoop}
            muted={cleanMuted}
            className="h-full w-full object-cover"
          />
        </div>
      )
    }

    if (cleanVideoType === 'url' && videoUrl) {
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <video
            src={videoUrl}
            controls
            autoPlay={cleanAutoplay}
            loop={cleanLoop}
            muted={cleanMuted}
            className="h-full w-full object-cover"
          />
        </div>
      )
    }

    return null
  }

  const videoElement = renderVideo()
  if (!videoElement) {
    return null
  }

  return (
    <section className="py-8 md:py-12 xl:py-16">
      <Container>
        <figure className="w-full">
          {videoElement}
          {caption && <figcaption className="mt-4 text-sm text-primary-600">{caption}</figcaption>}
        </figure>
      </Container>
    </section>
  )
}
