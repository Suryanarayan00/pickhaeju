import { ScrollView, Text, View } from 'react-native';
import PortfolioCard from '#components/PortfolioCard';
import colors from '#common/colors';
import PickListItem from '#components/PickListItem';
import React from 'react';

const PortfolioPick = () => {
  return (
    /*<ScrollView style={{ flex: 1, zIndex: 25, overflow: 'visible' }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}
      >
        <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
          <View style={{ marginHorizontal: 5, flex: 1 }}>
            <PortfolioCard title="일간평가손익">
              12<Text style={{ fontWeight: '400' }}>억달러</Text>
            </PortfolioCard>
          </View>
          <View style={{ marginHorizontal: 5, flex: 1 }}>
            <PortfolioCard title="일간평가손익률">0.42%</PortfolioCard>
          </View>
        </View>
      </ScrollView>
      <View style={{ backgroundColor: colors.white }}>
        <PickListItem />
        <PickListItem />
        <PickListItem />
        <PickListItem />
        <PickListItem />
        <PickListItem />
      </View>
    </ScrollView>*/
    <View>
      <Text>안쓰는 페이지..?</Text>
    </View>
  );
};
export default PortfolioPick;
