import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore } from 'redux';
import rootReducer from 'state';
import SnippetPage from 'templates/snippetPage';
import { object } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

const createStore = () => reduxCreateStore(rootReducer);

export default {
  title: 'Templates|SnippetPage',
  component: SnippetPage,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'snippetPage',
    ],
  },
};

export const component = () => {
  const snippetHTMLs = {
    descriotion: '<p>Performs right-to-left function composition.</p>',
    fullDescription: '<p> Use <code class="language-text"> Array.prototype.reduce()</code> to perform right-to-left function composition.\nThe last(rightmost) function can accept one or more arguments; the remaining functions must be unary.</p>',
    code: '<span class="token keyword">const</span> <span class="token function-variable function">compose</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>fns</span><span class="token punctuation">)</span> <span class="token operator">=></span> fns<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">((</span><span class="token parameter">f<span class="token punctuation">,</span> g</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token function">g</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)));</span>',
    example: '<span class="token keyword">const</span> <span class="token function-variable function">add5</span> <span class="token operator">=</span> <span class="token parameter">x</span> <span class="token operator">=></span> x <span class="token operator">+</span> <span class="token number">5</span><span class="token punctuation">;</span>\n<span class= "token keyword" >const</span> <span class="token function-variable function">multiply</span> <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token parameter">x<span class="token punctuation">,</span> y</span> <span class="token punctuation">)</span> <span class="token operator">=></span> x <span class="token operator">*</span> y <span class="token punctuation" >;</span >\n<span class="token keyword">const</span> multiplyAndAdd5 <span class="token operator" >=</span > <span class="token function">compose</span> <span class="token punctuation">(</span>add5 <span class="token punctuation" >,</span >multiply<span class="token punctuation" >);</span >\n<span class="token function">multiplyAndAdd5</span> <span class="token punctuation">(</span> <span class="token number">5</span> <span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">);</span> <span class="token comment">// 15</span>',
  };
  const snippet = object('snippet', {
    title: 'compose',
    description: 'Performs right-to-left function composition',
    language: {short: 'js', long: 'JavaScript'},
    tags: {
      primary: 'function',
      all: ['function', 'recursion'],
    },
    expertise: 'intermediate',
    code: {
      src: 'const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));',
      example: '',
    },
  });

  return (
    <Provider store={ createStore() }>
      <SnippetPage
        pageContext={ {
          snippet: { ...snippet, html: snippetHTMLs },
          logoSrc: '/30s-icon.png',
        } }
      />
    </Provider>
  );
};
