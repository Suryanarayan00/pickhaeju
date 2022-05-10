import React from 'react';
import { Text, View } from 'react-native';
import { range } from 'lodash';
import Document from '#components/Document';
import PortfolioCard from '#components/PortfolioCard';
import StockList from '#components/StockList';
import StockCard from '#components/StockCard';
import PickUser from '#components/PickUser';
import PickListItem from '#components/PickListItem';
import NotificationList from '#components/NotificationList';
import StockNameCard from '#components/StockNameCard';
import UpdatePopUp from '#components/UpdatePopUp';

const HomeIndex = (props) => {
  return (
    <Document>
      <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
        <View style={{ marginHorizontal: 5, flex: 1 }}>
          <PortfolioCard title="일간평가손익">
            12<Text>억달러</Text>
          </PortfolioCard>
        </View>
        <View style={{ marginHorizontal: 5, flex: 1 }}>
          <PortfolioCard title="일간평가손익률">0.42%</PortfolioCard>
        </View>
      </View>
      <StockList
        KorName="스타벅스"
        EngName="STAB"
        stockPrice="24,600원"
        income="320원"
        incomeRate="10.40"
      />
      <StockCard>
        28,994<Text style={{ fontSize: 18 }}>원</Text>
      </StockCard>
      <PickUser />
      <PickListItem />
      <NotificationList />

      <StockNameCard KorName="스타벅스" EngName="STAB" />
      <UpdatePopUp />
      {range(0, 100).map?.((v) => (
        <Text>asdfasdf</Text>
      ))}
    </Document>
  );
};

export default HomeIndex;
