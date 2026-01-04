export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      // Title is required for Sanity Studio reference, even if not shown on frontend
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'showInWorkList',
      title: 'Show in "Recent Projects" List',
      type: 'boolean',
      description: 'If disabled, this project will ONLY appear in the Hero slider (thumbnail only).',
      initialValue: true,
    },
    {
      name: 'sliderHoverStatus',
      title: 'Slider Hover Status',
      type: 'string',
      description: 'Controls the text displayed on hover in the Hero Slider. Only applies if the project is in the slider.',
      options: {
        list: [
          { title: 'View Case Study', value: 'case-study' },
          { title: 'Concept Work', value: 'concept' },
          { title: 'Case Study Coming Soon', value: 'coming-soon' },
        ],
        layout: 'radio',
      },
      initialValue: 'case-study',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g., Fintech, SaaS, E-commerce',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Project Image (Main List)',
      type: 'image',
      description: 'The image displayed in the "Recent Projects" grid. Recommended: 1200x1000px (1.2:1).',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'heroImage',
      title: 'Hero Slider Thumbnail',
      type: 'image',
      description: 'Optional. A specific image for the vertical slider in the Hero section. If left blank, the main Project Image will be used. Recommended: 1000x1200px (5:6 Portrait Ratio).',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'link',
      title: 'Project Link',
      type: 'url',
    },
    {
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'The name of the client (if different from the project title).',
    },
    {
      name: 'services',
      title: 'Services Provided',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      rows: 4,
    },
    {
      name: 'challengeImage',
      title: 'Challenge Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'solution',
      title: 'What We Did',
      type: 'text',
      rows: 4,
    },
    {
      name: 'solutionImage',
      title: 'Solution Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'result',
      title: 'The Result',
      type: 'text',
      rows: 4,
    },
    // {
    //   name: 'resultImage',
    //   title: 'Result Image',
    //   type: 'image',
    //   options: { hotspot: true },
    // },
    {
      name: 'content',
      title: 'Case Study Content (Optional Extra)',
      type: 'array',
      of: [
        { type: 'block' },
        { 
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }
          ]
        }
      ],
    },
  ],
}
