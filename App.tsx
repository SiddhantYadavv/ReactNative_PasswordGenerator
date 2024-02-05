import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const App = () => {
  const passwordSchema = Yup.object().shape({
    length: Yup.number()
      .min(8, 'Minimum password length is 8')
      .max(25, 'Max password length is 25')
      .required('Length is required'),
  });
  const [result, setResult] = useState('');
  const [symbols, setsymbols] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [passwordAvailable, setPasswordAvailable] = useState(false);

  const reset = () => {
    setNumber(false);
    setsymbols(false);
    setUppercase(false);
    setPasswordAvailable(false);
    setResult("")
  
  };

  const passwordGenerator = (length: number) => {
    let password = '';
    let primary = 'abcdefghijklmnopqrstuvwxyz';
    const symbolsSTR = '!@#$%^&*()_+{}?><';
    const numberSTR = '0123456789';
    const uppercaseSTR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (symbols) {
      primary += symbolsSTR;
    }

    if (number) {
      primary += numberSTR;
    }
    if (uppercase) {
      primary += uppercaseSTR;
    }
    for (let i = 0; i < length; i++) {
      const characterIndex = Math.floor(Math.random() * primary.length);
      password += primary.charAt(characterIndex);
    }
    setResult(password);
    setPasswordAvailable(true);
    console.log(password);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <Formik
          initialValues={{length: ''}}
          validationSchema={passwordSchema}
          onSubmit={values => {
            passwordGenerator(+values.length);
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            /* and other goodies */
          }) => (
            
            <>
         {/* ==========================================================================================      */}

            <View style={styles.passwordHeading}>
            <Text style={{ fontSize:30, paddingRight:10, fontWeight: 'bold'}}>
                Password length
              </Text>
             
              <TextInput
                style={{  width: 100 ,fontSize:20,borderBottomWidth:1}}
                value={values.length}
                onChangeText={handleChange('length')}
                placeholder="Ex. 8"
                keyboardType="numeric"
              />

            </View>
            <View style={styles.error}>
            {touched.length && errors.length && (
              <Text style={{color:"red"}} >
                {errors.length}
              </Text>
            )}
            </View>
            
         {/* ==========================================================================================      */}
              <View>
                <View style={styles.checkboxDiv}>
                <Text style={{ fontSize:20}} >Use Symbols</Text>
                  <BouncyCheckbox
                    style={{padding: 20}}
                    disableBuiltInState
                    isChecked={symbols}
                    fillColor="brown"
                    onPress={() => setsymbols(!symbols)}
                  />
                </View>
                <View style={styles.checkboxDiv} >
                <Text style={{ fontSize:20}} >Use Uppercase</Text>
                  <BouncyCheckbox
                    style={{padding: 20}}
                    fillColor="green"
                    disableBuiltInState
                    onPress={() => setUppercase(!uppercase)}
                    isChecked={uppercase}
                  />
                </View>
                <View style={styles.checkboxDiv} >
                  <Text style={{ fontSize:20}} >Use Numbers</Text>
                  <BouncyCheckbox
                    style={{padding: 20}}
                    disableBuiltInState
                    fillColor="red"
                    onPress={() => setNumber(!number)}
                    isChecked={number}
                  />
                </View>
              </View>
         {/* ==========================================================================================      */}

              <View style={styles.buttonsDiv} >
                <TouchableOpacity 
                    style={styles.generatePassword}
                    onPress={() => handleSubmit()}
                >
                  <Text style={{padding: 10, fontSize: 20}}>
                    Generate
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.resetPassword}
                onPress={() => reset()}
                >
                  <Text style={{padding: 10, fontSize: 20}}>
                    Reset
                  </Text>
                </TouchableOpacity>
              </View>
         {/* ==========================================================================================      */}

              
                {passwordAvailable ? (
                  <View style={styles.resultdiv}>
                  <View style={{flex:1,justifyContent:"center",alignItems:"center"}} >
                    <Text style={{padding: 10, fontSize: 20}}>The password is</Text>
                    <Text selectable={true} style={{padding: 10, fontSize: 25, fontWeight:"bold"}}>{result}</Text>
                    <Text style={{padding: 10, fontSize: 20}}>Hold to copy</Text>
                   </View>
                  </View>
                  
                ) : null}
            </>
          )}
        </Formik>
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  passwordHeading:{
    flex:1,
    flexDirection:"row",
    backgroundColor:"#EA7773",
    alignItems:"center",
    padding:20,
    justifyContent:"center",
    margin:5,
    borderRadius:10
  },
  checkboxDiv:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginHorizontal:20
  },
  error:{
    flex:1,
    alignItems:"center",
    color:"red",

  },
  buttonsDiv:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-evenly",
    padding:10,
  },
  generatePassword:{
    height:50,
    width:150,
    backgroundColor:"lightgreen",
    borderRadius:10,
    alignItems:"center"
  },
  resetPassword:{
    width:150,
    height:50,
    backgroundColor:"lightpink",
    alignItems:"center",
    borderRadius:10,
  },
  resultdiv:{
    height:200,
    backgroundColor:"#F3CC79",
    margin:20,
    borderRadius:10,
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
});
