import React from 'react';
import { render } from 'react-dom';

let element = document.getElementById('content');
if (element) {
    render(
        <h1>Hello world!</h1>,
        document.getElementById('content')
    );
}