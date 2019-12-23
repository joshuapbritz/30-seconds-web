/** Gets the short description for a blog post */
const getShortDescription = str => {
  return `<p>${str}</p>`;
};

/** Get the textual content for a blog post */
const getTextualContent = (str, blogType) => {
  let _str = str;
  const transformers = [
    // Inject paragraphs into blog lists' <li> elements
    {
      blogType: 'blog.list',
      matcher: /<li>(.+?)\n(.+?)<\/li>/g,
      replacer: '<li class="blog-list-item"><p>$1</p><p>$2</p></li>',
    },
    // Add 'rel' and 'target' to external links
    {
      blogType: 'any',
      matcher: /(href="https?:\/\/)/g,
      replacer: 'target="_blank" rel="nofollow noopener noreferrer" $1',
    },
    // Convert blog post code to the appropriate elements
    {
      blogType: 'any',
      matcher: /<pre class="language-[^"]+"><code class="language-([^"]+)">([\s\S]*?)<\/code><\/pre>/g,
      replacer: '<pre class="blog-code language-$1">$2</pre>',
    },
    // Convert blog blockquotes to the appropriate elements
    {
      blogType: 'any',
      matcher: /<blockquote>\s*\n*\s*<p>([\s\S]*?)<\/p>\s*\n*\s<\/blockquote>/g,
      replacer: '<blockquote class="blog-quote">$1</blockquote>',
    },
  ];

  transformers.forEach(t => {
    if (t.blogType === 'any' || t.blogType === blogType)
      _str = _str.replace(t.matcher, t.replacer);

  });
  return _str;
};

export default (str, source) => {
  const description = getShortDescription(source.text.short);
  const fullDescription = getTextualContent(str, source.blogType);
  return {
    description,
    fullDescription,
    code: '',
    example: '',
  };
};
