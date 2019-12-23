export default {
  name: '30 seconds Blog',
  dirName: '30blog',
  repoUrl: 'https://github.com/30-seconds/30-seconds-blog',
  snippetPath: 'blog_posts',
  requirables: [
    'blog_data/snippets.json',
    // 'blog_data/blog_authors.json',
  ],
  slug: 'blog',
  reducer: 'blogReducer',
  resolver: 'blogResolver',
  isBlog: true,
  theme: {
    backColor: '#1f253d',
    foreColor: '#edf0fc',
  },
  biasPenaltyMultiplier: 0.94,
  images: {
    name: 'blog_images',
    path: 'blog_images',
  },
};
