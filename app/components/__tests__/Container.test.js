import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';
import { Container, styles } from '../Container';

it('renders succesfully', () => {
    const rendered = renderer.create(<Container />).toJSON();
    expect(rendered).toBeTruthy();
});

it('styles is an object', () => {
    expect(typeof styles).toBe('object');
});

it('renders the child prop', () => {
    const rendered = renderer.create(<Container><View /></Container>).toJSON();
    expect(rendered).toMatchSnapshot()
});

it('uses the specified backgroundCOlor, if provided', ()=> {
    const rendered = renderer.create(<Container backgroundColor="red"/>).toJSON();
    expect(rendered).toMatchSnapshot()
});