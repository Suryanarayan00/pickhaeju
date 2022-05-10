import React, { useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { Animated, Keyboard, Platform, View } from 'react-native';
import { useSafeArea, useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';

const KeyboardSpace = ({ onKeyboardShow, onKeyboardHide, paddingBottom, style }) => {
	const animated = useRef();
	const inset = useSafeAreaInsets();
	const keyboardHeight = useRef(new Animated.Value(0));
	const [show, setShow] = useState();
	const { height: wHeight } = Dimensions.get('window');
	const { height: sHeight } = Dimensions.get('screen');
	const frame = useSafeAreaFrame();
	const navigationArea = sHeight - frame.height;

	const keyboardWillShow = event => {
		onKeyboardShow && onKeyboardShow(false);
		console.log(event);
		setShow(true);
		if (animated.current) {
			animated.current.stop();
			animated.current = null;
		}

		console.log({ wHeight }, { sHeight }, inset.bottom);

		animated.current = Animated.parallel([
			Animated.timing(keyboardHeight.current, {
				duration: event.duration,
				toValue: event.endCoordinates.height,
				useNativeDriver: false,
			}),
		]);
		animated.current.start();
	};

	const keyboardWillHide = event => {
		onKeyboardHide && onKeyboardHide(false);

		if (animated.current) {
			animated.current.stop();
			animated.current = null;
		}

		animated.current = Animated.parallel([
			Animated.timing(keyboardHeight.current, {
				duration: event.duration,
				toValue: paddingBottom ? paddingBottom : 0,
				useNativeDriver: false,
			}),
		]);
		animated.current.start();
	};

	const keyboardDidShow = event => {
		Platform.OS === 'android' && keyboardWillShow(event);
		setShow(true);
	};

	const keyboardDidHide = event => {
		Platform.OS === 'android' && keyboardWillHide(event);
		setShow(false);
	};

	useEffect(() => {
		const keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', keyboardWillShow);
		const keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', keyboardWillHide);
		const keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
		const keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

		return () => {
			keyboardWillShowSub.remove();
			keyboardWillHideSub.remove();
			keyboardDidShowSub.remove();
			keyboardDidHideSub.remove();
		};
	}, []);

	if (Platform.OS === 'android') {
		return null;
	}
	return (
		<Animated.View style={[{ minHeight: keyboardHeight.current }, style]}>
			<View style={{ height: inset.bottom }} />
		</Animated.View>
	);
};

export default KeyboardSpace;
