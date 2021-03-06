import React from 'react';
import { EXPERTISE_LEVELS } from 'shared';
import Expertise from 'atoms/expertise';
import { radios } from '@storybook/addon-knobs';
import mdx from './docs.mdx';

export default {
  title: 'Atoms|Expertise',
  component: Expertise,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'expertise',
    ],
  },
};

export const component = () => {
  const level = radios('level', EXPERTISE_LEVELS, 'intermediate');

  return (
    <Expertise level={ level } />
  );
};
