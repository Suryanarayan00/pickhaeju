import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import PickListItem from '#components/PickListItem';
import colors from '#common/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import Carousel, { Pagination } from '#components/Carousel';
import TabBar from '#components/TabScene/TabBar';
import { restApi } from '../common/api';
import { getCarousel } from '../common/threadApi';
import assets from '../../assets';

const styles = StyleSheet.create({
  pickWrapper: {
    borderBottomColor: colors.paleGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 18,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 'auto',
    marginTop: 205,
  },
  dotStyle: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: colors.lightIndigo,
  },
  upButtonWrapper: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upIcon: { width: 50, height: 50 },
});

// const data = [
//   {
//     id: 3,
//     title: 'dfd',
//   },
// ];
const dataHeader = [
  {
    uri: 'https://pgnqdrjultom1827145.cdn.ntruss.com/img/02/aa/02aa082830c02f5b1326651eaaf4401785e1e7c8ecfc65eda5510bc8328b8fb9_v1.jpg',
  },
  {
    uri: 'https://www.google.com/search?q=image&sxsrf=ALeKk020-ZqQ6wgMny2eGldrt2uNVKVK8g:1615896734168&tbm=isch&source=iu&ictx=1&fir=gxFxsvFBmxeZ9M%252C0JWe7yDOKrVFAM%252C_&vet=1&usg=AI4_-kReDzFRmzDAOj_DsRSOvMu2NwesqQ&sa=X&ved=2ahUKEwjfv9W25LTvAhXEad4KHTNMDdIQ9QF6BAgUEAE#imgrc=gxFxsvFBmxeZ9M',
  },
  {
    uri: 'https://pgnqdrjultom1827145.cdn.ntruss.com/img/02/aa/02aa082830c02f5b1326651eaaf4401785e1e7c8ecfc65eda5510bc8328b8fb9_v1.jpg',
  },
  {
    uri: 'https://pgnqdrjultom1827145.cdn.ntruss.com/img/02/aa/02aa082830c02f5b1326651eaaf4401785e1e7c8ecfc65eda5510bc8328b8fb9_v1.jpg',
  },
  {
    uri: 'https://pgnqdrjultom1827145.cdn.ntruss.com/img/02/aa/02aa082830c02f5b1326651eaaf4401785e1e7c8ecfc65eda5510bc8328b8fb9_v1.jpg',
  },
];

const pickerItems = [
  { text: '최신순', value: 'updatedAt' },
  { text: '조회순', value: 'view' },
  { text: '댓글순', value: 'comments_count' },
  { text: '좋아요순', value: 'likes_count' },
];

const Header = ({ setOrderBy, orderBy, onPickerChange }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const { width: fullWidth } = Dimensions.get('window');
  const [images, setImages] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getCarousel().then((images) => {
      console.log('getCarousel', images);
      setImages(images);
    });
  }, []);

  return (
    <>
      {/* <View style={{ height: 230 + 28, width: '100%' }}>
        <Carousel
          loop
          autoplayInterval={3000}
          autoplay
          data={images?.map((data) => ({ uri: data.imageUrl, ...data }))}
          containerCustomStyle={{ flex: 1 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PickDetails', { threadId: item.id });
              }}
            >
              <ImageBackground
                source={item}
                resizeMode={'cover'}
                style={{ height: 210 }}
              >
                <View
                  style={{
                    position: 'absolute',
                    bottom: '5%',
                    left: '17%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 30,
                    }}
                  >
                    <Text
                      style={{
                        color: 'rgb(148,129,255)',
                        fontSize: 18,
                      }}
                    >
                      {item.ticker}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: 'rgb(148,129,255)',
                      marginLeft: 30,
                      fontSize: 18,
                      width: 160,
                    }}
                    ellipsizeMode="tail"
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
          sliderWidth={fullWidth}
          itemWidth={fullWidth}
          onSnapToItem={(index) => {
            setSlideIndex(index);
          }}
        />
        <Pagination
          dotsLength={images?.length}
          inactiveSlideScale={1}
          activeDotIndex={slideIndex}
          containerStyle={styles.pagination}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={{
            // Define styles for inactive dots here

            backgroundColor: colors.lightPeriwinkle,
          }}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />
      </View> */}
      <TabBar
        type={'pick'}
        onPickerChange={(data) => onPickerChange(data)}
        pickerItems={pickerItems}
        selectedPickerItem={orderBy}
      />
    </>
  );
};

const PickPickTab = (props) => {
  const navigation = useNavigation();
  // const { slideIndex, setSlideIndex } = props;
  // console.log('render', slideIndex);
  const route = useRoute();
  const currentPage = useRef(0);
  const isLoading = useRef();
  const [data, setData] = useState({ threads: [] });
  const [orderBy, setOrderBy] = useState('updatedAt');

  const onPickerChange = (value) => {
    currentPage.current = 0;
    setOrderBy(value);
    loadData(value);
  };

 
  const loadData = async (order) => {
    if (isLoading.current) return;
    isLoading.current = true;
    currentPage.current++;
    try {
      const { data } = await restApi.get(`api/v3/thread/list`, {
        params: {
            limit: 10,
            page: currentPage.current,
            sort:'-createdAt',
            verified:true
        }
      });
      console.log('pickPickTab!', data,{ 
      limit: 10,
      page: currentPage.current,
      sort:'-createdAt',
      verified:true
  });
      if (currentPage.current === 1) {
        setData(data);
      } else {
        setData((s) => {
          const newThreads = [...s.docs, ...data.docs].map?.((v) => ({
            ...v,
            isFavorite: false,
          }));
          return { ...data, docs: newThreads };
        });
      }
      isLoading.current = false;
    } catch (e) {
      isLoading.current = false;
      console.log('ERROR', e.response);
    }
  };

  const loadNewThreads = () => {
    loadData(orderBy).catch(console.warn);
  };

  useEffect(() => {
    loadData(orderBy).catch(console.warn);
  }, []);

  useEffect(() => {
    if (route.params?.refresh) {
      loadData(orderBy).catch(console.warn);
      navigation.setParams({ refresh: false });
    }
  }, [route.params?.refresh]);

  console.log('data', data);
  return (
    <View style={{ marginTop: 10, flex: 1 }}>
      <FlatList
       ref={props.scrollRef}
        ListHeaderComponent={
          <Header
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            onPickerChange={onPickerChange}
          />
        }
        data={data.docs}
        onEndReached={loadNewThreads}
        onEndReachedThreshold={0.4}
        renderItem={({ item, index }) => (
          <View style={styles.pickWrapper}>
            <PickListItem
              item={item}
              onPress={() => {
                navigation.navigate('PickDetails', { threadId: item._id });
              }}
            />
          </View>
        )}
      />
       <View style={styles.upButtonWrapper}>
        <TouchableOpacity  onPress={()=>{
           props.scrollRef.current.scrollToOffset({ animated: true, offset: 0 })
        }}>
          <Image
            source={assets.topButton}
            style={styles.upIcon}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PickPickTab;
