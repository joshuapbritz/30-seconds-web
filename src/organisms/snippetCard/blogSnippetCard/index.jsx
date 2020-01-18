import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Card from 'atoms/card';
import TagList from 'molecules/tagList';
import CodeBlock from 'atoms/codeBlock';
import { CopyButton, CodepenButton } from 'atoms/button';
import Toast from 'atoms/toast';
import { Snippet as SnippetPropType } from 'typedefs';
import { trimWhiteSpace } from 'functions/utils';
import { Anchor } from 'atoms/anchor';
import { JSX_SNIPPET_PRESETS } from 'shared';
import _ from 'lang';
const _l = _('en');

const SnippetCard = ({
  snippet,
  className,
  toastContainer,
  ...rest
}) => (
  <Card className={ trimWhiteSpace`snippet-card ${className}` } { ...rest } >
    <h4 className='card-title'>{ snippet.title }</h4>
    { /* TODO: Handle this properly, with classes etc. - Also handle the authors field in the PropType */ }
    <p className="card-meta-info">
      { snippet.authors.map((a, i, arr) => (
        <>
          <Anchor link={ {
            internal: false,
            url: a.profile,
            rel: 'noopener noreferrer nofollow',
            target: '_blank',
          } }>
            { a.name }
          </Anchor>
          { i !== arr.length - 1 ? ', ' : '' }
        </>
      )) }
      { ' · ' }
      {
        new Date(snippet.firstSeen).toLocaleDateString('en-US', {
          day: 'numeric', month: 'short', year: 'numeric',
        })
      }
    </p>
    <TagList tags={ [ ...snippet.tags.all] } />
    { /* TODO: Extract an atom from this */ }
    { /* { snippet.coverSrc ?
      <div
        className='card-cover-image'
        style={ { backgroundImage: `url("${encodeURI(snippet.coverSrc)}")` } }
      />
      : null } */ }
    { snippet.cover && snippet.cover.src ?
      <img
        className='card-cover-image'
        src={ snippet.cover.src }
      />
      : null }
    <div
      className='card-description'
      dangerouslySetInnerHTML={ { __html: `${snippet.html.fullDescription}` } }
    />
  </Card>
);

SnippetCard.propTypes = {
  /** Snippet data for the card */
  snippet: SnippetPropType,
  /** Additional classes for the card */
  className: PropTypes.string,
  /** The id of a DOM node used to render the toast when copying the snippet */
  toastContainer: PropTypes.node,
  /** Any other arguments to be passed to the card */
  rest: PropTypes.any,
};

export default SnippetCard;
