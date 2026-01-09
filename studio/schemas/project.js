export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to manually order projects. Lower numbers appear first. If left blank, sorted by year.',
    },
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
      title: 'Project Thumbnail (Main)',
      type: 'image',
      description: 'Used for the "Recent Projects" grid. Also acts as the default Hero image for the project detail page if no specific one is provided.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'hoverVideo',
      title: 'Hover Video (Thumbnail)',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm',
      },
      description: 'Optional. A short, muted video loop to play when hovering over the thumbnail. For performance, keep file size under 5MB.',
    },
    {
      name: 'detailHeroImage',
      title: 'Project Detail Hero Image',
      type: 'image',
      description: 'Optional. The large banner image at the top of the project detail page. If left blank, the Project Thumbnail will be used.',
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
      title: 'Case Study Content (Deprecated - Move to Testimonial)',
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
    {
      name: 'testimonial',
      title: 'Project Testimonial',
      type: 'object',
      description: 'Optional testimonial specific to this project.',
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'text',
          rows: 4,
        },
        {
          name: 'author',
          title: 'Author',
          type: 'string',
        },
        {
          name: 'role',
          title: 'Role / Title',
          type: 'string',
        },
        {
          name: 'avatar',
          title: 'Author Photo',
          type: 'image',
          options: { hotspot: true },
        }
      ]
    },
  ],
}
