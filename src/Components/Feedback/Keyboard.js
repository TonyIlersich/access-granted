import React from 'react';
import KeyRow from "./KeyRow";
import Key from "./Key";

export default () => (
  <>
    <KeyRow>
      {'`1234567890-='.split('').map(label => <Key key={label} label={label} />)}
      <Key width={2.2} />
    </KeyRow>
    <KeyRow>
      <Key width={1.6} />
      {'QWERTYUIOP[]'.split('').map(label => <Key key={label} label={label} />)}
      <Key label='\' width={1.6} />
    </KeyRow>
    <KeyRow>
      <Key width={2} />
      {'ASDFGHJKL;\''.split('').map(label => <Key key={label} label={label} />)}
      <Key label='Enter' width={2.5} />
    </KeyRow>
    <KeyRow>
      <Key width={3} />
      {'ZXCVBNM,./'.split('').map(label => <Key key={label} label={label} />)}
      <Key width={3} />
    </KeyRow>
    <KeyRow>
      {new Array(3).fill('').map((_, idx) => <Key key={idx} />)}
      <Key label=' ' width={6} />
      {new Array(3).fill('').map((_, idx) => <Key key={idx} />)}
    </KeyRow>
  </>
);