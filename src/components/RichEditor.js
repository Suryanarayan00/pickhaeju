import React from 'react';
import {
  actions as actionsWrap,
  RichEditor as RichEditorWrap,
  RichToolbar as RichToolbarWrap,
} from 'react-native-pell-rich-editor';

export const RichEditor = React.forwardRef((props, fRef) => {
  return <RichEditorWrap ref={fRef} {...props} />;
});

export const RichToolbar = (props) => {
  return <RichToolbarWrap {...props} />;
};

export const actions = actionsWrap;
