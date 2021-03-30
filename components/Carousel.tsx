import React, { FC, useState, useCallback, useRef, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView, FlatList, Image, Animated, Dimensions, ImageSourcePropType } from "react-native"
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler'

import OverflowItems from './OverflowItems'

export interface Data {
    title: string
    location: string
    price: string
    image: ImageSourcePropType
}
  
interface Props {
    data: Data[]
}

  const { width, height } = Dimensions.get('screen')
const HEIGHT = height * 0.75
const ITEM_WIDTH = width * 0.7
const ITEM_HEIGHT = ITEM_WIDTH * 1.7
const VISIBLE_ITEMS = 3

const Carousel: FC<Props> = ({ data }: Props) => {

    const scrollXIndex = useRef(new Animated.Value(0)).current
    const scrollXAnimated = useRef(new Animated.Value(0)).current

    const [index, setIndex] = useState(0)

    const setActiveIndex = useCallback((activeIndex: number): void => {
      setIndex(activeIndex)
      scrollXIndex.setValue(activeIndex)
    }, [])

    useEffect(() => {
      Animated.spring(scrollXAnimated, {
        toValue: scrollXIndex,
        useNativeDriver: true
      }).start()
    })

    return (
        <FlingGestureHandler
        key='left'
        direction={Directions.LEFT}
        onHandlerStateChange={e => 
          (e.nativeEvent.state === State.END && index !== data.length - 1) && setActiveIndex(index + 1)
        }
      >
        <FlingGestureHandler
          key='right'
          direction={Directions.RIGHT}
          onHandlerStateChange={e =>
            (e.nativeEvent.state === State.END && index !== 0) && setActiveIndex(index - 1) 
          }
        >
          <SafeAreaView style={styles.carouselContainer}>
            <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
            <FlatList
              data={data}
              keyExtractor={(_, index) => String(index)}
              horizontal
              inverted
              scrollEnabled={false}
              removeClippedSubviews={false}
              contentContainerStyle={styles.flatList}
              CellRendererComponent={({ index, children, style, ...props}) => {
                const newStyle = [
                  style,
                  { zIndex: data.length - index}
                ]
                return(
                  <View style={newStyle} index={index} {...props}>
                    {children}
                  </View>
                )
              }}
              renderItem={({item, index}) => {
                const inputRange = [index - 1, index, index + 1 ]
                const translateX = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [50, 0, -100]
                })
                const scale = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [.8, 1, 1.3]
                })
                const opacity = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [1 - 1/VISIBLE_ITEMS, 1, 0]
                })
                return(
                  <Animated.View style={{position: 'absolute', left: -ITEM_WIDTH / 2, opacity, transform: [{
                    translateX
                  }, {scale}]}}>
                    <Image source={item.image} style={styles.image} />
                  </Animated.View>
                )
              }}
            />
          </SafeAreaView>
        </FlingGestureHandler>
      </FlingGestureHandler>
    )
}

const styles = StyleSheet.create({
    carouselContainer: {
      height: HEIGHT,
    },
    flatList: {
      flex: 1,
      justifyContent: 'center',
    },
    image: {
      width: ITEM_WIDTH,
      height: ITEM_HEIGHT,
      borderRadius: 10
    }
  })

export default Carousel