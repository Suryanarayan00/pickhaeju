import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  useMemo,
} from 'react';
import {View, Button, Dimensions, FlatList, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import MarqueeItem from './MarqueeItem';
import colors from '#common/colors';
import DefaultButton from '#components/Button/DefaultButton';
import useInterval from '../../hooks/useInterval';
import { useFocusEffect } from '@react-navigation/native';

const NO_PER_SCREEN = 3;
const itemWidth = Dimensions.get('window').width / NO_PER_SCREEN;
let newCurrent = 0;
const StockMarquee=(props) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [scrollingVal, setScrolling] = useState(false);
  const [momentumScrolling, setMomentumScrolling] = useState(false);
  const scrollViewRef = useRef();
  const [isRunning, setIsRunning] = useState(true);
  const funRef = useRef(null);


  const _renderItem = (item, index) => {
    let itemName = item.name;
    if(itemName == 'Dow Jones Industrial Average')
    itemName = 'Dow Industrial​';
    if(itemName == 'NASDAQ Composite Index')
    itemName = 'NASDAQ​';
    return (
      <MarqueeItem
        title={itemName}
        price={item.currentVal}
        change={item.perChange}
        isGain={item.isUp}
        itemWidth={itemWidth}
        style={{
          marginStart: index === 0 ? 16 : 0,
        }}
      />
    );
  };
  
  const startScroll = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const clearScrolling = () => {
    if (isRunning && funRef.current !== null) {
      setIsRunning(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (isRunning && props?.data?.length > 0) {
        funRef.current = setInterval(() => { // Save reference to interval.
        scrolling();
      }, 32);
    } else {
      clearInterval(funRef.current); // Stop the interval.
    }
     return () => {
        clearInterval(funRef.current);
        console.log('i have done');
      }
    }, [isRunning,props?.data])
  )
    
    const onTouchEnd = () => {
      if (!scrollingVal) {
        startScroll();
      }
    }
    const onTouchBegin = () => {
    clearScrolling();
    };
    const onScrollBegin = () => {
     setScrolling(true);
    clearScrolling();
    };
    
    const onScrollEnd = (event) => {
      setScrolling(false);
      setCurrentPosition(event.nativeEvent.contentOffset.x);
      startScroll();
    };
    
    const onMomentumScrollBegin = () => {
      setMomentumScrolling(true);
      clearScrolling();
    };
    const onMomentumScrollEnd = (event) => {
      if (momentumScrolling) {
        setMomentumScrolling(false);
        setCurrentPosition(event.nativeEvent.contentOffset.x);
        startScroll();
      }
    };
    
    const getWrappedData = () => {
      const {data} = props;
      const overlappingNo = getOverlappingNo();
      return {
        data: [...data, ...data.slice(0, overlappingNo)],
      };
    };
    
    const getOverlappingNo = () => {
      const {data} = props;
      const length = data.length;
      let overlappingNo = 2;
      if (length < 2) {
        overlappingNo = length;
      }
      return overlappingNo;
    };
    newCurrent = currentPosition ;

    const scrolling = () => {

      // Start scrolling if there's more than one stock to display
      const {data} = props;

      if (newCurrent < 0) {
        newCurrent = 0;
      }
      if (data.length > 1) {
        // Increment position with each new interval
       const position = newCurrent + 1;
    
       if(scrollViewRef.current)
        {
          scrollViewRef.current.scrollToOffset({offset: position, animated: false});
        }
        // After position passes this value, snaps back to beginning
         const maxOffset = data.length * itemWidth;
        // Set animation to repeat at end of scroll
        if (newCurrent > maxOffset) {
          const offset = newCurrent - maxOffset;
          if(scrollViewRef.current)
          {
            scrollViewRef.current.scrollToOffset({
              offset,
              animated: false,
            });
          }
        
          setCurrentPosition(offset);
        } else {
          setCurrentPosition(position);
        }
      }
    };
    const {data} = props;
    return (
      <>
       <View style={styles.marqueeContainer}>
          <FlatList
        initialNumToRender={2} 
        ref={scrollViewRef}
        decelerationRate="fast"
        onTouchStart={onTouchBegin}
        onTouchEnd={onTouchEnd}
        onScrollBeginDrag={onScrollBegin}
        onScrollEndDrag={onScrollEnd}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: data.length,
          offset: itemWidth * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => _renderItem(item, index)}
        horizontal
        keyExtractor={(item, index) => item.symbol + index}
      />
       </View>
      </>
    
    );  
}

const styles = StyleSheet.create({

    // Marquee section Css
    marqueeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
     // paddingHorizontal: 10,
      height: 40,
    },
});

export default StockMarquee;
