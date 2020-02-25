import React, { Component } from 'react';
import { Alert ,StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';

export default class Login extends Component {

  constructor(props) {
    super(props)
  }

  onPressRegister = () => {
    Alert.alert('Registrar!!!')
  }

  onPressLogin = () => {
    Alert.alert('Login!!!')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Image style={styles.logo} source={require('./src/assets/alien.png')} />
          <Text style={styles.headerText}>AlienSpace - Login</Text>
          <View style={styles.field}>
            <Text style={styles.fieldText}>Email</Text>
            <TextInput style={styles.input} placeholder='fulano@email.com' 
              placeholderTextColor={'#3337'} />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldText}>Senha</Text>
            <TextInput secureTextEntry={true} style={styles.input} placeholder='********'
               placeholderTextColor={'#3337'} />
          </View>
          <View style={styles.rowBtn}>
            <TouchableOpacity style={styles.registerBtn} onPress={this.onPressRegister}>
              <Text style={styles.btnText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={this.onPressLogin}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const { width: WIDTH } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9D50BB',
    color:'#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },

  box: {
    width: '90%',
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  colorWhite: {
    color: '#ecf0f1'
  },

  logo: {
    width: 50,
    height: 60,
  },  

  headerText: {
    fontSize: 30,
    fontStyle: 'italic',
    marginBottom: 10,
    color: '#333',
    opacity: .4
  },

  fieldText: {
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold'
  },

  field: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 20,
    height: 50,
    width: WIDTH - 110,
    marginHorizontal: 10,
    paddingLeft: 20,
    shadowColor: '#333',
    shadowOffset: {
      width: 0, height: 2
    },
    shadowOpacity: .25,
    shadowRadius: 3.84,
    elevation: 3
  }, 
  
  rowBtn: {
    width:'100%',
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

  registerBtn: {
    width: WIDTH - 280,
    height: 40,
    backgroundColor: '#3498db',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#333',
    shadowOffset: {
      width: 0, height: 2
    },
    shadowOpacity: .25,
    shadowRadius: 3.84,
    elevation: 3
  },

  loginBtn: {
    width: WIDTH - 280,
    height: 40,
    backgroundColor: '#9D50BB',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#333',
    shadowOffset: {
      width: 0, height: 2
    },
    shadowOpacity: .25,
    shadowRadius: 3.84,
    elevation: 3
  },

  btnText: {
    color: '#fff',
    fontSize: 18
  }
})