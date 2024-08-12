import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import * as ImagePicker from 'react-native-image-picker';

const Camera = () => {
  const [hinhAnh, setHinhAnh] = useState(null);
  //viet ham chup anh
  const chupAnh =useCallback(()=>{
    //dinh nghia optin dinh nghia camera
    let option={
      savetToPhoto:true,
      mediaTpe:'photo',
      includeBase64:false,//neu lay chuoi base 64 true
      includeExtra:true
    }
    //khoi dong Came ra chup anh
    ImagePicker.launchCamera(option,setHinhAnh);
  },[]);
  useEffect(()=>{
    console.log(hinhAnh);
    
  },[hinhAnh])
  //chon anh
  const chonAnh=useCallback(()=>{
    let option={
      mediaType:'photo',
      selelectionLimit: 0

    }
  
  
    ImagePicker.launchImageLibrary (option, setHinhAnh);
  },[]);

  return (
    <View>
   
 
        <Pressable style={{width:200,height:50,backgroundColor:'#0eb9ef',alignItems:'center',borderRadius:10,margin:10,padding:9,alignSelf:'center'}} onPress={chupAnh}>
          <Text style={{color:'white',fontSize:22}}>Chụp ảnh</Text>
        </Pressable >
        <Pressable style={{width:200,height:50,backgroundColor:'green',alignItems:'center',alignSelf:'center',borderRadius:10,margin:10,padding:9}} onPress={chonAnh}>
          <Text style={{color:'white',fontSize:22}}>Chọn ảnh</Text>
        </Pressable>
      
      
      

      <View style={{margin:10}}>
        {
      (typeof(hinhAnh?.assets) != 'undefined')?
      hinhAnh?.assets.map( (objImage, index) =>{
        return (
          <View key={index} style={{margin:10}}>
            <Image key={index}
            source={{uri: objImage.uri}}
            style={{width: 200, height:200}} />
      </View>
  )

})
:
<Text style={{alignSelf:'center',fontSize:20,fontWeight:'500',color:'green'}}>Chọn ảnh đi bạn ơi !!!</Text>
        }
      </View>
    </View>
  )
}

export default Camera

const styles = StyleSheet.create({})