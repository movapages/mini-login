import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from '../../../sanity-studio/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Sanity Auth',
  basePath: '/studio',
  projectId: 'kw2t8ku9',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-10-13',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
