import * as React from 'react';

import {useCopyToClipboard} from 'usehooks-ts'

export default function Component() {
    const [value, copy] = useCopyToClipboard()

    let paste = navigator.clipboard.readText()
        .then(text => {
            console.log('Скопированный контент:', text);
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });

    return (
        <>
            <h1>Click to copy:</h1>
            <p>{paste}</p>
        </>
    )
}