import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Modal as Wrapper,
} from 'react-native';
import Modal from '#components/Modal';
import PortfolioPopUpTab from '#widgets/popup_portfolio';
import WatchlistPopUpTab from '#widgets/popup_watchlist';
import TabProvider from '#components/TabScene';
import TabBar from '#components/TabScene/TabBar';
import TabScreens from '#components/TabScene/TabScreens';
import colors from '#common/colors';
import assets from '../../assets';
import {useSelector} from 'react-redux';
const styles = StyleSheet.create({});

const AddStockPopUp = ({ isVisible = false, onCancel, general, portfolioList=[] }) => {

  const [index, setIndex] = useState(0);
  return (
    <TabProvider index={index} onChangeIndex={setIndex}>
      <Modal isVisible={isVisible} onCancel={onCancel}>
        <View style={{ flexDirection: 'row' }}>
          <TabBar type={'popup'} onPress={onCancel} />
        </View>
        <TabScreens>
          <View title={'포트폴리오'}>
            <PortfolioPopUpTab
              watchForAdd={general?.ticker}
              onCancel={onCancel}
              portfolioList={portfolioList}
            />
          </View>
          <View title={'관심목록'}>
            <WatchlistPopUpTab general={general} onCancel={onCancel} portfolioList={portfolioList} />
          </View>
        </TabScreens>
      </Modal>
    </TabProvider>
  );
};

export default AddStockPopUp;
