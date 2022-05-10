import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Image
  } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '#common/colors';
import assets from '../../assets';


const IndustrialPage = ({finaceInfo,generalData}) => {
	const {
		operatingmargin,
		roe,
		roa,
		debttoequity,
	  } = finaceInfo;

	let opermarginVal = generalData?.operatingmargin || 0;
	let roeVal = generalData?.roe || 0; 
	let roaVal = generalData?.roa || 0; 
	let debttoequityVal = generalData?.debttoequity || 0; 

	console.log('finaceInfo');
	console.log(finaceInfo);
	console.log('generalData');
	console.log(generalData);

	console.log('roeVal');
	console.log(roeVal);
	const getExpIcon = (type) =>{
	
	let avgVal = 0;
	let opVal = 0;	
	if(type == 'operatingmargin')
	{
		opVal =	opermarginVal;
		avgVal = operatingmargin;
	}	
	else if(type == 'ROE')
	{
		opVal =	roeVal;
		avgVal = roe;
	}
	else if(type == 'ROA')
	{
		opVal =	roaVal;
		avgVal = roa;
	}
	else
	{
		opVal =	debttoequityVal;
		avgVal = debttoequity;	
	}
	if(type != 'debttoequity')
	{
		if(opVal > 1.3 * avgVal)	
		{
			return assets.industry_high;	
		}	
		if(opVal > 0.7 * avgVal &&  opVal < 1.3 * avgVal)
		{
			return assets.industry_same;	
		}
		if(opVal < 0.7 * avgVal)	
		{
			return assets.industry_low;	
		}	
	}
	else
	{
		if(opVal < 0.7 * avgVal)	
		{
			return assets.industry_high;	
		}	
		if(opVal > 0.7 * avgVal &&  opVal < 1.3 * avgVal)
		{
			return assets.industry_same;	
		}
		if(opVal > 1.3 * avgVal)	
		{
			return assets.industry_low;	
		}	
	}
}  


	return (
    <View style={styles.mainWrapper}>
			<View style={styles.imgSecCover}>
				<View style={styles.imgSecItem}>
					<Image
					source={getExpIcon('operatingmargin')}
					style={styles.imgIcon}
					/>
				</View>
				<View style={styles.imgSecItem}>
					<Image
					source={getExpIcon('ROE')}
					style={styles.imgIcon}
					/>
				</View>
				<View style={styles.imgSecItem}>
					<Image
					source={getExpIcon('ROA')}
					style={styles.imgIcon}
					/>
				</View>
				<View style={styles.imgSecItem}>
					<Image
					source={getExpIcon('debttoequity')}
					style={styles.imgIcon}
					/>
				</View>
			</View>
			<View style={styles.titleSecCover}>
				<View style={styles.titleSecItem}>
					<Text style={styles.itemTitle}>영업이익률</Text>
				</View>
				<View style={styles.titleSecItem}>
					<Text style={styles.itemTitle}>ROE</Text>
				</View>
				<View style={styles.titleSecItem}>
					<Text style={styles.itemTitle}>ROA</Text>
				</View>
				<View style={styles.titleSecItem}>
					<Text style={styles.itemTitle}>부채비율</Text>
				</View>
			</View>
    </View>
	);
};

export default IndustrialPage;

const styles = StyleSheet.create({
	mainWrapper: {
		paddingHorizontal:20, 
		marginVertical: 30
	},
	imgSecCover: {
		flexDirection:'row', 
		borderBottomColor: '#e3e6ec', 
		borderBottomWidth: 1, 
		marginBottom: 10, 
		paddingBottom: 10,
		paddingHorizontal: 10
	},
	imgSecItem: {
		width:'25%',
		flexDirection:'row',
		justifyContent: 'center',
	},
	imgIcon: {
		height: 40, 
		width: 40, 
		resizeMode: 'contain',
		marginHorizontal: 2,
	},
	titleSecCover: {
		flexDirection:'row',
		paddingHorizontal: 10,
	},
	titleSecItem: {
		width:'25%',
		flexDirection:'row',
		justifyContent: 'center',
	},
	itemTitle: {
		fontSize: 13,
		color: colors.blueGrey,
	}
});