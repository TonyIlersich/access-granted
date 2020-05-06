import React from 'react';
import KeyRow from "./KeyRow";
import Key from "./Key";

// TODO: hook up colors

export default () => (
    <>
        <KeyRow>
            {'~1234567890_+'.split('').map(label => <Key key={label} label={label}/>)}
            <Key label='Bksp' width={2.2}/>
        </KeyRow>
        <KeyRow>
            <Key label='Tab' width={1.6}/>
            {'QWERTYUIOP[]'.split('').map(label => <Key key={label} label={label}/>)}
            <Key label='\' width={1.6}/>
        </KeyRow>
        <KeyRow>
            <Key label='Caps' width={2}/>
            {'ASDFGHJKL;\''.split('').map(label => <Key key={label} label={label}/>)}
            <Key label='Enter' width={2.5}/>
        </KeyRow>
        <KeyRow>
            <Key label='Shift' width={3}/>
            {'ZXCVBNM<>?'.split('').map(label => <Key key={label} label={label}/>)}
            <Key label='Shift' width={3}/>
        </KeyRow>
        <KeyRow>
            {'Ctrl Alt'.split(' ').map(label => <Key key={label} label={label}/>)}
            <Key width={7}/>
            {'Alt Ctrl'.split(' ').map(label => <Key key={label} label={label}/>)}
        </KeyRow>
    </>
);