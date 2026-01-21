import { defineType, defineField } from 'sanity'
import { VideoIcon } from '@sanity/icons'
import { paddingField } from './padding'

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  icon: VideoIcon,
  fields: [
    defineField({
      name: 'videoType',
      title: 'Video-Typ',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'Sanity Video Asset', value: 'sanity' },
          { title: 'Externe URL', value: 'url' },
        ],
        layout: 'radio',
      },
      initialValue: 'youtube',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'Die Video-ID aus der YouTube URL (z.B. "dQw4w9WgXcQ" aus https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
      hidden: ({ parent }) => parent?.videoType !== 'youtube',
      validation: (Rule) => Rule.custom((value, context) => {
        if (context.parent?.videoType === 'youtube' && !value) {
          return 'YouTube Video ID ist erforderlich'
        }
        return true
      }),
    }),
    defineField({
      name: 'vimeoId',
      title: 'Vimeo Video ID',
      type: 'string',
      description: 'Die Video-ID aus der Vimeo URL',
      hidden: ({ parent }) => parent?.videoType !== 'vimeo',
      validation: (Rule) => Rule.custom((value, context) => {
        if (context.parent?.videoType === 'vimeo' && !value) {
          return 'Vimeo Video ID ist erforderlich'
        }
        return true
      }),
    }),
    defineField({
      name: 'sanityVideo',
      title: 'Sanity Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }) => parent?.videoType !== 'sanity',
      validation: (Rule) => Rule.custom((value, context) => {
        if (context.parent?.videoType === 'sanity' && !value) {
          return 'Video-Datei ist erforderlich'
        }
        return true
      }),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Direkte URL zum Video (z.B. MP4, WebM)',
      hidden: ({ parent }) => parent?.videoType !== 'url',
      validation: (Rule) => Rule.custom((value, context) => {
        if (context.parent?.videoType === 'url' && !value) {
          return 'Video URL ist erforderlich'
        }
        return true
      }),
    }),
    defineField({
      name: 'caption',
      title: 'Beschreibung',
      type: 'string',
      description: 'Optionale Beschreibung oder Bildunterschrift für das Video',
    }),
    defineField({
      name: 'autoplay',
      title: 'Automatisch abspielen',
      type: 'boolean',
      description: 'Video automatisch abspielen (nur bei eingebetteten Videos)',
      initialValue: false,
    }),
    defineField({
      name: 'loop',
      title: 'Wiederholen',
      type: 'boolean',
      description: 'Video in Endlosschleife abspielen',
      initialValue: false,
    }),
    defineField({
      name: 'muted',
      title: 'Stumm',
      type: 'boolean',
      description: 'Video stumm abspielen (oft für Autoplay erforderlich)',
      initialValue: false,
    }),
    paddingField,
    defineField({
      name: 'gridPlacement',
      title: 'Layout im Grid',
      type: 'gridPlacement',
      description: 'Steuert die Platzierung im Layout-Grid pro Breakpoint.',
    }),
  ],
  preview: {
    select: {
      videoType: 'videoType',
      youtubeId: 'youtubeId',
      vimeoId: 'vimeoId',
      caption: 'caption',
    },
    prepare({ videoType, youtubeId, vimeoId, caption }) {
      let title = 'Video'
      if (videoType === 'youtube' && youtubeId) {
        title = `YouTube: ${youtubeId}`
      } else if (videoType === 'vimeo' && vimeoId) {
        title = `Vimeo: ${vimeoId}`
      } else if (videoType === 'sanity') {
        title = 'Sanity Video'
      } else if (videoType === 'url') {
        title = 'Video URL'
      }
      return {
        title: caption || title,
        subtitle: 'Video Block',
        media: VideoIcon,
      }
    },
  },
})
