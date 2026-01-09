

import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';
import { Text, View } from 'react-native';
const HomeScreen = () => {

  const primary = useThemeColor({}, 'primary');

  return (
    <View style={{paddingTop: 100, paddingHorizontal:20}}>
      <Text style={{
        color: primary,
        fontFamily: 'Kanit-Bold',
      }}>HomeScreen</Text>
       <Text style={{
        fontFamily: 'Kanit-Regular',
      }}>HomeScreen</Text>
       <Text style={{
        fontFamily: 'Kanit-Thin',
      }}>HomeScreen</Text>
    </View>
  )
}
export default HomeScreen