import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Banner = () => {
  return (
    <View>
      <Image style={{width:'100%',height:200}} source={require('./src/images/banner.jpg')} />
    </View>
  )
}

export default Banner

const styles = StyleSheet.create({})