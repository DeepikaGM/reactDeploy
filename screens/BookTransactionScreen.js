/*import React from 'react';
import { StyleSheet, Text,TouchableOpacity, View,Image,TextInput,KeyboardAvoidingView } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import firebase from 'firebase';
import db from '../config';

export default class BookTransactionScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      scannedBookId : '',
      scannedStudentId : '',
      buttonState: 'normal'
    }
  }
  getCameraPermissions = async () =>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    
    this.setState({
      /*status === "granted" is true when user has granted permission
        status === "granted" is false when user has not granted the permission
      */
      /*hasCameraPermissions: status === "granted",
      buttonState: 'clicked',
      scanned: false
    });
  }

  handleBarCodeScanned = async({type, data})=>{
    const { buttonState} = this.state

    if(buttonState === "BookId"){
      this.setState({
        scanned : true,
        scannedBookId : data,
        buttonState : 'normal'
      });
    }
    else if(buttonState === "StudentId"){
      this.setState({
        scanned : true,
        scannedStudentId : data,
        buttonState : 'normal'
      })
    }
  }
  initiateBookIssue = async ()=>{
    //add a transaction
    db.collection("transactions").add({
      'studentId' : this.state.scannedStudentId,
      'bookId' : this.state.scannedBookId,
      'data' : firebase.firestore.Timestamp.now().toDate(),
      'transactionType' : "Issue"
    })

    //change book status
    db.collection("books").doc(this.state.scannedBookId).update({
      'bookAvailability' : false
    })
    //change number of issued books for student
    db.collection("students").doc(this.state.scannedStudentId).update({
      'numberOfBooksIssued' : firebase.firestore.FieldValue.increment(1)
    })

    this.setState({
      scannedStudentId : '',
      scannedBookId: ''
    })
  }

  initiateBookReturn = async ()=>{
    //add a transaction
    db.collection("transactions").add({
      'studentId' : this.state.scannedStudentId,
      'bookId' : this.state.scannedBookId,
      'date'   : firebase.firestore.Timestamp.now().toDate(),
      'transactionType' : "Return"
    })

    //change book status
    db.collection("books").doc(this.state.scannedBookId).update({
      'bookAvailability' : true
    })

    //change book status
    db.collection("students").doc(this.state.scannedStudentId).update({
      'numberOfBooksIssued' : firebase.firestore.FieldValue.increment(-1)
    })

    this.setState({
      scannedStudentId : '',
      scannedBookId : ''
    })
  }
  handleTransaction = async()=>{
    var transactionMessage = null;
    db.collection("books").doc(this.state.scannedBookId).get()
    .then((doc)=>{
      var book = doc.data()
      if(book.bookAvailability){
        this.initiateBookIssue();
        transactionMessage = "Book Issued"
          Alert.alert(transactionMessage)
      }
      else{
        this.initiateBookReturn();
        transactionMessage = "Book Returned"
          Alert.alert(transactionMessage)
      }
    })

    this.setState({
      transactionMessage : transactionMessage
    })
  }
  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === "clicked" && hasCameraPermissions){
      return(
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    else if (buttonState === "normal"){
      return(
        <KeyboardAvoidingView style={styles.container} behaviour="padding" enabled>
        <View style={styles.container}>
        <View>
          <Image
            source={require("../assets/booklogo.jpg")}
            style={{width:200, height: 200}}/>
          <Text style={{textAlign: 'center', fontSize: 30}}>Wily</Text>
        </View>
        <View style={styles.inputView}>
        <TextInput 
          style={styles.inputBox}
          placeholder="Book Id"
          onChangeText={text =>this.setState({scannedBookId:text})}
          value={this.state.scannedBookId}/>
        <TouchableOpacity 
          style={styles.scanButton}
          onPress={()=>{
            this.getCameraPermissions("BookId")
          }}>
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.inputView}>
        <TextInput 
          style={styles.inputBox}
          placeholder="Student Id"
          onChangeText ={text => this.setState({scannedStudentId:text})}
          value={this.state.scannedStudentId}/>
        <TouchableOpacity 
          style={styles.scanButton}
          onPress={()=>{
            this.getCameraPermissions("StudentId")
          }}>
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.transactionAlert}>{this.state.transactionMessage}</Text>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={async()=>{
            var transactionMessage = await this.handleTransaction();
          }}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayText:{
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  scanButton:{
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10
  },
  buttonText:{
    fontSize: 20,
  },
  inputView:{
    flexDirection: 'row',
    margin: 20
  },
  inputBox:{
    width: 200,
    height: 40,
    borderWidth: 1.5,
    borderRightWidth: 0,
    fontSize: 20
  },
  scanButton:{
    backgroundColor: '#66BB6A',
    width: 50,
    borderWidth: 1.5,
    borderLeftWidth: 0
  },
  submitButton:{
    backgroundColor: '#FBC02D',
    width: 100,
    height:50
  },
  submitButtonText:{
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight:"bold",
    color: 'white'
  }
});*/

import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image,KeyboardAvoidingView, Alert} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import { TextInput } from 'react-native-gesture-handler';
import  firebase from 'firebase';
import db from '../config';

export default class BookTransactionScreen extends React.Component {
  constructor(){
    super();
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      scannedData:'',
      buttonState:'normal',
      scannedBookId:'',
      scannedStudentId:''
    }
  }
  getCameraPermissions = async () =>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions:status==="granted",
      buttonState:'clicked',
      scanned:false
    })
  }d
  handleBarCodeScanned = async({type, data})=>{
    const {buttonState} = this.state;
    if(buttonState === "BookId"){
      this.setState({
        scanned:true,
        scannedBookId:data,
        buttonState:'normal'
      })
    }
    else if(buttonState === "StudentId"){
    this.setState({
      scanned:true,
      scannedStudentId:data,
      buttonState:'normal'
    })
  }
}
handleTransaction = async()=>{
  var transactionType = await this.checkBookEligibility();
  console.log("transaction="+transactionType);
    if (!transactionType) {
      Alert.alert("The book doesn't exist in the library database!");
      this.setState({
        scannedStudentId: "",
        scannedBookId: ""
      });
    } else if (transactionType === "Issue") {
      var isStudentEligible = await this.checkStudentEligibilityForBookIssue();
      if (isStudentEligible) {
        this.initiateBookIssue();
        Alert.alert("Book issued to the student!");
      }
    } else {
      var isStudentEligible = await this.checkStudentEligibilityForReturn();
      if (isStudentEligible) {
        this.initiateBookReturn();
        Alert.alert("Book returned to the library!");
      }
    }
  }
  checkBookEligibility = async () => {
    const bookRef = await db
      .collection("books")
      .where("bookId", "==", this.state.scannedBookId)
      .get();
    var transactionType = "";
    if (bookRef.docs.length == 0) {
      transactionType = false;
      console.log("transactiontype"+transactionType);
    } else {
      bookRef.docs.map(doc => {
        var book = doc.data();
        if (book.bookAvailability) {
          transactionType = "Issue";
        } else {
          transactionType = "Return";
        }
      });
    }

    return transactionType;
  };
  checkStudentEligibilityForBookIssue = async () => {
    const studentRef = await db
      .collection("students")
      .where("studentId", "==", this.state.scannedStudentId)
      .get();
    var isStudentEligible = "";
    if (studentRef.docs.length == 0) {
      this.setState({
        scannedStudentId: "",
        scannedBookId: ""
      });
      isStudentEligible = false;
      console.log("student id doenot exist");
      Alert.alert("The student id doesn't exist in the database!");
    } else {
      studentRef.docs.map(doc => {
        var student = doc.data();
        if (student.numberOfBooksIssued < 2) {
          isStudentEligible = true;
        } else {
          isStudentEligible = false;
          Alert.alert("The student has already issued 2 books!");
          this.setState({
            scannedStudentId: "",
            scannedBookId: ""
          });
        }
      });
    }

    return isStudentEligible;
  };

  checkStudentEligibilityForReturn = async () => {
    const transactionRef = await db
      .collection("transactions")
      .where("bookId", "==", this.state.scannedBookId)
      .limit(1)
      .get();
    var isStudentEligible = "";
    transactionRef.docs.map(doc => {
      var lastBookTransaction = doc.data();
      if (lastBookTransaction.studentId === this.state.scannedStudentId) {
        isStudentEligible = true;
      } else {
        isStudentEligible = false;
        Alert.alert("The book wasn't issued by this student!");
        this.setState({
          scannedStudentId: "",
          scannedBookId: ""
        });
      }
    });
    return isStudentEligible;
  };

  initiateBookIssue=async()=>{
    console.log("in function issue");
    db.collection("transactions").add({
      'studentId':this.state.scannedStudentId,
      'bookId':this.state.scannedBookId,
      'data':firebase.firestore.Timestamp.now().toDate(),
      'transactionType':"Issue"
    })
    db.collection("books").doc(this.state.scannedBookId).update({
      'bookAvailability':false
    })
    db.collection("students").doc(this.state.scannedStudentId).update({
      'numberOfBooksIssued':firebase.firestore.FieldValue.increment(-1)
    })
    this.setState({
      scannedStudentId:'',
      scannedBookId:''
    })
  }
  initiateBookReturn=async()=>{
    db.collection("transactions").add({
      'studentId':this.state.scannedStudentId,
      'bookId':this.state.scannedBookId,
      'data':firebase.firestore.Timestamp.now().toDate(),
      'transactionType':"Return"
    })
    db.collection("books").doc(this.state.scannedBookId).update({
      'bookAvailabitity':true
    })
    db.collection("students").doc(this.state.scannedStudentId).update({
      'numberOfBooksIssued':firebase.firestore.FieldValue.increment(-1)
    })
    this.setState({
      scannedStudentId:'',
      scannedBookId:''
    })
  }
    render(){
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;
      if(buttonState === "clicked" && hasCameraPermissions){

  return (
    <BarCodeScanner onBarCodeScanned = {scanned?undefined:this.handleBarcodeScanned} style={StyleSheet.absoluteFillObject}/>
  );
      }
      else if(buttonState === "normal")
      {
        return(
          <KeyboardAvoidingView style={styles.container} behaviour="padding" enabled>
          <View style={styles.container}>
            <View>
              <Image source={require("../assets/booklogo.jpg")} style={{width:200,height:200}}/>
              <Text style={{textAlign:"center",fontSize:30}}>Wily</Text>
            </View>

            <View style={styles.inputView}>
              <TextInput style={styles.inputBox} placeholder="Book ID" onChangeText={text =>this.setState({scannedBookId:text})} value={this.state.scannedBookId}/>
              <TouchableOpacity style={styles.ScanButton} onPress={()=>{this.getCameraPermissions("bookId")}}>
                <Text style={styles.buttonText}>Scan</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputView}>
              <TextInput style={styles.inputBox} placeholder="Student ID" onChangeText={text =>this.setState({scannedStudentId:text})} value={this.state.scannedStudentId}/>
              <TouchableOpacity style={styles.ScanButton} onPress={()=>{this.getCameraPermissions("studentId")}}>
                <Text style={styles.buttonText}>Scan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton}  onPress={async()=>{
            var transactionmessage = await this.handleTransaction();
          }}><Text style={styles.submitButtonText}>Submit</Text></TouchableOpacity>
            </View>

          <Text style={styles.displayText}>{hasCameraPermissions===true?this.state.scannedData:'Request Camera Permission'}</Text>
          <TouchableOpacity style={styles.ScanButton} onPress={this.getCameraPermissions}><Text>Scan QR Code</Text></TouchableOpacity>

          </View>
          </KeyboardAvoidingView>
        );
      }
    }
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  displayText:{
    fontSize:20,
    textDecorationLine:'underline'
  },
  ScanButton:{
    backgroundColor:'#2196F3',
    padding:10,
    margin:10
  },
  inputView:{
    flexDirection:'row',
    margin:20,
  },
  inputBox:{
    width:200,
    height:40,
    borderWidth:1.5,
    borderRightWidth:0,
    fontSize:20
  },
  ScanButton:{
    backgroundColor:'#66BB6A',
    width:50,
    borderWidth:1.5,
    borderLeftWidth:0
  },
  submitButton:{
    backgroundColor:"pink",
    width:100,
    height:50
  },
  submitButtonText:{
    padding:10,
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold',
    color:'black'
  }
  
})