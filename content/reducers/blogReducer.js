import {
  rankingEngine as rankSnippet,
  searchIndexingEngine as tokenizeSnippet
} from 'engines';
import { convertToSeoSlug, uniqueElements } from 'functions/utils';
import { determineExpertiseFromTags } from 'functions/transformers';
// TODO: Consider parsing this via a new parser or similar
// The argument against is that it's a single case and might not extend to other repos in the future
import authors from '../sources/30blog/blog_data/blog_authors';

export default (id, snippetNode, markdownNode) => {
  const shortSliceIndex = snippetNode.attributes.text.indexOf('\n\n') <= 180 ? snippetNode.attributes.text.indexOf('\n\n') : snippetNode.attributes.text.indexOf(' ', 160);
  return {
    id,
    tags: {
      all: snippetNode.attributes.tags,
      primary: snippetNode.attributes.tags[0],
    },
    blogType: snippetNode.type,
    cover: snippetNode.attributes.cover,
    authors: snippetNode.attributes.authors.map(a => authors[a]),
    blog: true,
    expertise: determineExpertiseFromTags(snippetNode.attributes.tags),
    title: snippetNode.title,
    code: { },
    slug: `/${snippetNode.slugPrefix}${convertToSeoSlug(markdownNode.fields.slug)}`,
    url: `${snippetNode.repoUrlPrefix}${markdownNode.fields.slug.slice(0, -1)}.md`,
    path: markdownNode.fileAbsolutePath,
    text: {
      full: snippetNode.attributes.text,
      short: snippetNode.attributes.excerpt && snippetNode.attributes.excerpt.trim().length !== 0
        ? snippetNode.attributes.excerpt
        : `${ snippetNode.attributes.text.slice(0, shortSliceIndex)}...`,
    },
    archived: snippetNode.archived,
    language: {},
    ranking: rankSnippet(snippetNode),
    recommendationRanking: snippetNode.recommendationRanking,
    firstSeen: new Date(+`${snippetNode.meta.firstSeen}000`),
    lastUpdated: new Date(+`${snippetNode.meta.lastUpdated}000`),
    searchTokens: uniqueElements([
      snippetNode.title,
      ...snippetNode.attributes.tags.filter(tag => tag !== 'beginner' && tag !== 'intermediate' && tag !== 'advanced'),
      ...tokenizeSnippet(
        snippetNode.attributes.text.slice(0, snippetNode.attributes.text.indexOf('\n\n'))
      ),
    ]).join(' ').toLowerCase(),
  };
};
