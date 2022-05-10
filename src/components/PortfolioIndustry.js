import React,{useRef, useState} from 'react';
import { Text, View, StyleSheet,   Dimensions,
} from 'react-native';
import colors from '#common/colors';
import PieChart from '#components/Chart/PieChart';
import { commaFormat } from '../utils/utils';
import { VictoryPie, VictoryLegend } from "victory-native";

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 0,
  },
  wrapper: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '45%',
  },
  bottomLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightPeriwinkleThree,
    width: 222.5,
    paddingTop: 12,
  },
  whiteLine: {
    height: 5,
    backgroundColor: colors.whiteTwo,
    width: '100%',
    marginVertical: 30,
  },
  pointCircle: { width: 9, height: 9, borderRadius: 4.5 },
  percentageNum: {
    color: colors.blueGrey,
    fontSize: 12,
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
  graph: {
    backgroundColor: colors.blueGrey,
    width: 164,
    height: 164,
  },
  titleWrapper: { flexDirection: 'row', alignItems: 'center' },
  titleText: { color: colors.black, fontSize: 12, paddingLeft: 6 },
  percentText: { color: colors.blueGrey, fontSize: 12 },
  priceText: { color: colors.dark, fontSize: 12, fontWeight: 'bold' },
  wonText: { fontWeight: 'normal' },


});

const ListItem = ({
  item: { y, labelVal, color, x },
  isLast,
}) => {
  return (
    <View style={{ width:48+'%'}}>
      <View style={[styles.wrapper,{alignSelf:'flex-start',paddingLeft:'5%'}]}>
        <View style={styles.titleWrapper}>
          <View
            style={[
              styles.pointCircle,
              {
                backgroundColor: color,
              },
            ]}
          />
          <Text style={styles.titleText}>
            {labelVal}{' '}
            <Text style={styles.percentageNum}>{x}</Text>
              </Text>
        </View>
      </View>
      {isLast && <View style={[styles.bottomLine, {width:100+'%'}]} />}
    </View>
  );
};

const pieColors = [
  colors.whiteGray,
  colors.aquaMarineTwo,
  colors.apricot,
  colors.lightishPurple,
];

const graphColors = [
  colors.lightishPurple,
  colors.apricot,
  colors.aquaMarineTwo,
  colors.whiteGray,
];
const PortfolioIndustry = ({
  byCategories,
  currencyCalc,
  currencySymbolBefore,
  currencySymbolAfter,
  sectorData
}) => {


  const categoriesArray = Object.entries(byCategories)
    .map?.(([label, value]) => ({ label, value }))
    .sort(({ value: v1 }, { value: v2 }) => v2 - v1);
    
    const valueSum = categoriesArray?.reduce?.((p, { value }) => p + value, 0);
  const [...Data] = categoriesArray
  .map?.((d, i) => ({ ...d, color: graphColors[i],perVal:Math.round((d.value / valueSum) * 100).toFixed(0) }));

  var pieArray=[];
  var otherSum=0;
  var otherPer=0;
  Data.map?.((val,i)=>{
    if(i<=2)
    {
     let getnameKo = sectorData?.find((item)=>item?.name == val.label);
      pieArray.push({x:parseInt(val.perVal)+'%',y:val.value,labelVal:getnameKo?.nameKo || val.label,color:val.color});
    }
    else {
      otherSum=otherSum+val.value;
      otherPer=otherPer+parseInt(val.perVal);
    }
  })

pieArray.push({x:otherPer+'%',y:otherSum,labelVal:'기타',color:colors.whiteGray})

pieArray.sort((firstItem, secondItem) => firstItem.y - secondItem.y);

const legendArray = JSON.parse(JSON.stringify(pieArray));
legendArray.sort((firstItem, secondItem) => secondItem.y - firstItem.y);

  return (
     <View style={styles.container}>
      <View style={{ height:205, marginTop:-50,}}>
       <VictoryPie
          //colorScale={pieColors}
            startAngle={90}
            endAngle={-90}
           padAngle={({ data }) => 1}
           innerRadius={68} labelRadius={88}
           style={{labels: { fontSize: 14, fill: "white" },data: {
            fill: ({datum}) => datum.color
              } }}
            width={350} height={400}
            data={pieArray}

           />
       </View>
      
      <View style={{flexDirection:'row', flexWrap:'wrap', marginHorizontal:20,}}>
      {legendArray.map?.((item, i, a) => {
        return (
          <ListItem
            key={i}
            currencyCalc={currencyCalc}
            currencySymbolBefore={currencySymbolBefore}
            currencySymbolAfter={currencySymbolAfter}
            index={i}
            item={item}
            valueSum={valueSum}
            isLast={a?.length >=2 && i<2}
          />
        );
      })}
      </View>
    </View>
  );
};

export default PortfolioIndustry;
