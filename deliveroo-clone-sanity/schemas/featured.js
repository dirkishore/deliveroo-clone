import {defineType} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'Featured Menu Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Featured Category name',
      validation: (rule) => rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short Description',
      validation: (rule) => rule.required().max(200),
    },
    {
      name: 'restaurant',
      type: 'array',
      title: 'Restaurants',
      of: [{type: 'reference', to: [{type: 'restaurant'}]}],
    },
  ],
})
