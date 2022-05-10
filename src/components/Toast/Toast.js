import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toastHide } from '#data/toast/ToastAction';

export default function Toast({}) {
  const dispatch = useDispatch();

  const { open, message, timeout } = useSelector((s) => s.toast);

  useEffect(() => {
    if (open) {
      let tm = setTimeout(() => {
        dispatch(toastHide());
      }, timeout || 3000);
      return () => {
        clearTimeout(tm);
      };
    }
  }, [open, timeout, dispatch]);

  if (!open) {
    return null;
  }

  return (
    <View style={styles.root}>
      <Text style={styles.label}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 15,
    minWidth: '50%',
    paddingVertical: 14,
    backgroundColor: '#000',
    opacity: 0.7,

  },
  label: {
    color: '#fff',
    marginHorizontal: 20,
    fontSize: 15,
    lineHeight: 18,
  },
});
