import React from 'react';
import renderer from 'react-test-renderer';
import { ClearButton, styles } from '../Button';
import buildStyles from '../../config/styles';

beforeAll(()=> {
    buildStyles();
});

it('renders succesfully', () => {
    const rendered = renderer.create(<ClearButton />).toJSON();
    expect(rendered).toBeTruthy();
});

it('styles is an object', () => {
    expect(typeof styles).toBe('object');
});

it('renders custom text passed via props', () => {
    const rendered = renderer.create(<ClearButton text="hey this is a test"/>).toJSON();
    expect(rendered).toMatchSnapshot();
});