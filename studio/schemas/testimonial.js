export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role / Industry',
      type: 'string',
      description: 'e.g., CEO at TechCorp, Cosmetics Industry',
    },
    {
      name: 'marqueeRow',
      title: 'Marquee Row',
      type: 'string',
      description: 'Which moving row should this appear in?',
      options: {
        list: [
          { title: 'Top Row (Left)', value: 'row1' },
          { title: 'Bottom Row (Right)', value: 'row2' },
        ],
        layout: 'radio',
      },
      initialValue: 'row1',
    },
  ],
}
