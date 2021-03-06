import React from 'react';
import PropTypes from 'prop-types';
import Paginator from 'molecules/paginator';
import PageTitle from 'atoms/pageTitle';
import PageSubtitle from 'atoms/pageSubtitle';
import PreviewCard from 'molecules/previewCard';
import ListingAnchors from 'molecules/listingAnchors';
import {
  Snippet as SnippetPropType,
  Paginator as PaginatorPropType
} from 'typedefs';
import _ from 'lang';
const _l = _('en');

// eslint-disable-next-line complexity
const SnippetList = ({
  snippetList,
  paginator,
  listingName,
  listingSublinks = [],
}) => {
  return snippetList.length ? (
    <>
      <PageTitle isLight>
        { listingName }
      </PageTitle>
      {
        listingSublinks.length
          ? <ListingAnchors isCompact items={ listingSublinks } />
          : null
      }
      <PageSubtitle isLight className='list-top-subtitle'>
        { listingSublinks.length
          ? _l('Click on a snippet card to view the snippet or choose a keyword from the above list to only see matching snippets.')
          : _l('Click on a snippet card to view the snippet.')
        }
      </PageSubtitle>
      { snippetList.map(snippet => (
        <PreviewCard
          key={ `snippet_${snippet.url}` }
          snippet={ snippet }
        />
      )) }
      <Paginator paginator={ paginator } />
    </>
  ) : null;
};

SnippetList.propTypes = {
  /** List of snippets to be displayed */
  snippetList: PropTypes.arrayOf(SnippetPropType),
  /** Paginator component data */
  paginator: PaginatorPropType,
  /** Name of this snippet list */
  listingName: PropTypes.string,
  /** Links to sublists */
  listingSublinks: PropTypes.arrayOf(PropTypes.shape({})),
};

export default SnippetList;
