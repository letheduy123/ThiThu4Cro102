import { useDispatch, useSelector } from "react-redux";
import {Alert, Modal,StyleSheet,TextInput,Pressable,TouchableOpacity,Image,  Text, View, ScrollView } from "react-native";

import { useEffect, useState } from "react";
import { fetchTodos,deleteTodoApi,addTodoAPI,updateTodoApi} from '../redux/actions/todoAction';
import Banner from "../../Banner";
import Camera from "../../Camera";


const TodoScreen  =()=>{
        // Khai báo state để thực hiện thêm
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [old, setOld] = useState('');
        const [mota, setMoTa] = useState('');
        const [image, setImage] = useState('');
        
        // State cho thông báo lỗi
   const [errorMessage, setErrorMessage] = useState('');
   
         // State dành cho sửa
         const [editName, setEditName] = useState('');
         const [editEmail, setEditEmail] = useState('');
         const [editOld, setEditOld] = useState('');
         const [editMoTa, setEditMoTa] = useState('');
         const [editImage, setEditImage] = useState('');
         const [editId, setEditId] = useState(null);
        // State điều khiển Modal
       const [addModalVisible, setAddModalVisible] = useState(false);
       const [modalVisible, setModalVisible] = useState(false);
 
  // State cho tìm kiếm
//   const [searchKeyword, setSearchKeyword] = useState('');

   //lấy  danh sách dữ liệu từ store của redux
   const  listTodo =  useSelector(state=>state.listTodoStore.listTodo);
   // lấy đối tượng để điều khiển các action
   const dispatch = useDispatch();// của redux
   // khi vào ứng dụng sẽ gọi action fetchTodos để kéo dữ liệu từ API về store của redux
   useEffect(() => {
       dispatch(fetchTodos());
     }, []);
         // hàm xử lý xóa
         const handleDeleteTodo =async (id)=>{
            Alert.alert(
                "Xác nhận",
                "Bạn có chắc chắn muốn xóa không?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Hủy xóa"),
                        style: "cancel"
                    },
                    {
                        text: "Yes", 
                        onPress: () => {

            dispatch(deleteTodoApi(id))
                .then((result) => {
                    console.log('Todo deleted successfully!');
                })
                .catch((error) => {
                    console.error('Error deleting todo:', error);
                });
        }
    }
]
);
};
  
// Hàm kiểm tra định dạng email
// const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
// }



           // Hàm xử lý việc thêm
     const handleAddTodo = () => {

        // Kiểm tra dữ liệu
        if (!name || !email || !old ||!mota|| !image) {
         setErrorMessage('Vui lòng điền đầy đủ thông tin!');
         return;
     }
    //  if (!validateEmail(email)) {
    //     setErrorMessage('Email không đúng định dạng!');
    //     return;
    // }

     if (isNaN(old)) {
         setErrorMessage('Tuổi phải là một số!');
         return;
     }


     let duLieuThem = { name_ph38444: name, email_ph38444: email, old_ph38444: old,mota_ph38444:mota, image_ph38444: image };
     dispatch(addTodoAPI(duLieuThem))
         .then(() => {
             console.log('Todo added successfully!');
             // Reset form
             setName('');
             setEmail('');
             setOld('');
             setMoTa('');
             setImage('');
             setAddModalVisible(false); // Đóng modal sau khi thêm thành công
         })
         .catch((error) => {
             console.error('Error adding todo:', error);
         });
 };

  //update
  const handleEdit = (id, name, email, old,mota, image) => {
    setEditName(name);
    setEditId(id);
    setEditEmail(email);
    setEditOld(old);
    setEditMoTa(mota);
   
    setEditImage(image);
    setModalVisible(true);
};
   // Hàm lưu kết quả sửa
   const handleUpdate = () => {
         // Kiểm tra dữ liệu
  if (!editName || !editEmail || !editOld || !editMoTa|| !editImage) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin!');
      return;
  }

  if (isNaN(editOld)) {
      setErrorMessage('Tuổi phải là một số!');
      return;
  }
    let duLieuUpdate = { name_ph38444: editName, email_ph38444: editEmail, old_ph38444: editOld,mota_ph38444:editMoTa,image_ph38444: editImage };
    dispatch(updateTodoApi({ id: editId, data: duLieuUpdate }))
        .then(() => {
            console.log('Todo updated successfully!');
            setModalVisible(false);
            setEditName('');
            setEditEmail('');
            setEditOld('');
            setEditMoTa('');
         
            setEditImage('');
            setEditId(null);
            setErrorMessage(''); // Xóa thông báo lỗi sau khi cập nhật thành công
       
        })
        .catch((error) => {
            console.error('Error updating todo:', error);
        });
};

    // Lọc danh sách todo dựa trên từ khóa tìm kiếm
    // const filteredTodos = listTodo.filter(todo =>
    //     todo.name_ph38444.toLowerCase().includes(searchKeyword.toLowerCase())
    // );

   return (
       <ScrollView>
      
 <Banner/>
<Camera/>
            <View style={{ padding: 10 }}>
  {/* Input tìm kiếm */}
  {/* <TextInput
                    placeholder="Tìm kiếm theo tên"
                    value={searchKeyword}
                    onChangeText={setSearchKeyword}
                    style={styles.searchInput}
                /> */}

                <Pressable style={{width:200,height:40,backgroundColor:'green',alignSelf:'center',borderRadius:10,padding:7}} onPress={() => setAddModalVisible(true)}>
<Text style={{fontSize:17,color:'white',paddingLeft:60}}>Thêm xe</Text>
                </Pressable>
                </View>
           {/* in danh sách todo: */}
           
             {/* {filteredTodos.map(row => ( */}
            {    listTodo.map(row =>(
                 <View key={row.id}
                 style={{
                    margin: 10,
                    padding: 10,
                    borderColor: 'gray',
                    backgroundColor: 'orange',
                    borderWidth: 3,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    borderRadius: 20
                }}>
                      <Image
                    source={{ uri: row.image_ph38444 }}
                    style={{ width: 100, height: 100, borderRadius: 20 }}
                />
                  <View>
                    <Text style={{ fontSize: 19, color: 'red' }}>Name: {row.name_ph38444}</Text>
                    <Text style={{ fontSize: 17 }}>Email: {row.email_ph38444}</Text>
                    <Text style={{ fontSize: 17 }}>Old: {row.old_ph38444}</Text>
                    <Text style={{ fontSize: 17 }}>Mô tả: {row.mota_ph38444}</Text>
                    
                </View>
                <TouchableOpacity style={{ marginTop: 45 }} onPress={() => handleDeleteTodo(row.id)}>
                        <Image source={require('../images/delete2.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleEdit(row.id, row.name_ph38444, row.email_ph38444, row.old_ph38444,row.mota_ph38444, row.image_ph38444)}>
                        <Image style={{marginTop:40}} source={require('../images/updated.png')} />
                    </TouchableOpacity>
                
                    
                 </View> 
               ))
           }
              {/* Modal thêm */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={addModalVisible}
                onRequestClose={() => {
                    setAddModalVisible(!addModalVisible);
                }}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TextInput
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Old"
                            value={old}
                            keyboardType="numeric"
                            onChangeText={setOld}
                            style={styles.input}
                        />
                           <TextInput
                            placeholder="Mô tả"
                            value={mota}
                            keyboardType="numeric"
                            onChangeText={setMoTa}
                            style={styles.input}
                        />
                     
                        <TextInput
                            placeholder="Link ảnh"
                            value={image}
                            onChangeText={setImage}
                            style={styles.input}
                        />
                          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                        <View style={styles.buttonContainer}>
                            <Pressable style={{width:70,height:40,backgroundColor:'red',borderRadius:10,padding:8}} onPress={() => setAddModalVisible(false)}>
                                <Text style={{ fontSize:17,fontWeight:'500'}}>Cancel</Text>
                            </Pressable>
                            <Pressable style={{width:70,height:40,backgroundColor:'blue',borderRadius:10,padding:8}} onPress={handleAddTodo}>
                                <Text style={{ fontSize:17,fontWeight:'500',marginLeft:14}}>Add</Text>
                            </Pressable>
                          
                        </View>
                    </View>
                </View>
            </Modal>

             {/* Modal sửa */}
             <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TextInput
                            placeholder="Name"
                            value={editName}
                            onChangeText={setEditName}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Email"
                            value={editEmail}
                            onChangeText={setEditEmail}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Old"
                            value={editOld}
                            keyboardType="numeric"
                            onChangeText={setEditOld}
                            style={styles.input}
                        />
                         <TextInput
                            placeholder="Mô tả"
                            value={editMoTa}
                            keyboardType="numeric"
                            onChangeText={setEditMoTa}
                            style={styles.input}
                        />
                      
                        <TextInput
                            placeholder="Link ảnh"
                            value={editImage}
                            onChangeText={setEditImage}
                            style={styles.input}
                        />
                        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                      
                        <View style={styles.buttonContainer}>
                            <Pressable  style={{width:70,height:40,backgroundColor:'red',borderRadius:10,padding:8}} onPress={() => setModalVisible(false)}>
                                <Text style={{ fontSize:17,fontWeight:'500'}}>Cancel</Text>
                            </Pressable >
                            <Pressable style={{width:70,height:40,backgroundColor:'blue',borderRadius:10,padding:8}}  onPress={handleUpdate}>
                                <Text style={{ fontSize:17,fontWeight:'500'}}>Update</Text>
                            </Pressable>
                            
                        </View>
                    </View>
                </View>
            </Modal>
       </ScrollView>
   );
}
export default TodoScreen;
const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        padding: 5,
        backgroundColor: 'white'
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
      alignSelf:'center',fontSize:15
  },
})