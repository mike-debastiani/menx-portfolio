import Container from '@/components/layout/Container'
import Grid from '@/components/layout/Grid'
import ScrollReveal from '@/components/atoms/ScrollReveal'
import { stegaClean } from '@sanity/client/stega'
import { getGridPlacementProps, type GridPlacement } from './gridPlacement'
import { getBlockPaddingClasses, type BlockPadding } from './padding'

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
  padding?: BlockPadding
  gridPlacement?: GridPlacement | string
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
  padding,
  gridPlacement,
}: VideoBlockProps) {
  const cleanVideoType = stegaClean(videoType) || 'youtube'
  const cleanAutoplay = stegaClean(autoplay) || false
  const cleanLoop = stegaClean(loop) || false
  const cleanMuted = stegaClean(muted) || false
  const placementProps = getGridPlacementProps(gridPlacement)
  const paddingClasses = getBlockPaddingClasses(padding)

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
    <section className={paddingClasses}>
      <Container>
        <Grid>
          <ScrollReveal
            as="figure"
            className={`${placementProps.className} w-full`}
            style={placementProps.style}
          >
            {videoElement}
            {caption && <figcaption className="mt-4 text-sm text-primary-600">{caption}</figcaption>}
          </ScrollReveal>
        </Grid>
      </Container>
    </section>
  )
}
