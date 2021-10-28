import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../config/firebase';

class Cadastro extends Component {
  
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  constructor() {
    
    super();
    this.bdREF = firebase.firestore().collection('usuarios');
    this.state = {
      Email: '',
      Nome: '',
      CPF: '',
      Senha: '',
      CEP:'',
      logradouro:'',
      complemento:'',
      bairro:'',
      localidade:'',
      uf:'',
      ibge:'',
      gia:'',
      ddd:'',
      siafi:'',
      isLoading: false
    };
  }  

  API= async() => {
    var URL = 'https://viaCEP.com.br/ws/';
    var id = this.state.CEP;
    var ChaveAPI = '/json/';
    await fetch(URL + id + ChaveAPI)
    .then(response => response.json())
    .then(result => {
      this.setState({Apicep: result})       
    })
    .catch((error) => console.error(error))    
    this.setDados();
    
  }    
  setDados(){
    const { Apicep } = this.state;  
    this.inputValueUpdate(Apicep.cep, 'CEP');
    this.inputValueUpdate(Apicep.logradouro, 'logradouro');
    this.inputValueUpdate(Apicep.complemento, 'complemento');
    this.inputValueUpdate(Apicep.bairro, 'bairro');
    this.inputValueUpdate(Apicep.localidade, 'localidade');
    this.inputValueUpdate(Apicep.uf, 'uf');
    this.inputValueUpdate(Apicep.ibge, 'ibge');
    this.inputValueUpdate(Apicep.gia, 'gia');
    this.inputValueUpdate(Apicep.ddd, 'ddd');
    this.inputValueUpdate(Apicep.siafi, 'siafi');  
    this.setState({isLoading: true}); 
  }
  Cadastrar = async() => { 
    await this.API()
    await this.setDados() 
    this.setState({isLoading: true});      
      this.bdREF.doc(this.state.Email).set({
        Email: this.state.Email,
        Nome: this.state.Nome,
        CPF: this.state.CPF,
        Senha: this.state.Senha,
        CEP: this.state.CEP,
        Logradouro: this.state.logradouro,
        Complemento: this.state.complemento,
        Bairro: this.state.bairro,
        Localidade: this.state.localidade,
        UF: this.state.uf,
        IBGE: this.state.ibge,
        Gia: this.state.gia,
        DDD: this.state.ddd,
        Siafi: this.state.siafi,
      }).then((res) => {
        this.setState({
          Email: '',
          Nome: '',
          CPF: '',
          Senha: '',
          CEP:'',
          logradouro:'',
          complemento:'',
          bairro:'',
          localidade:'',
          uf:'',
          ibge:'',
          gia:'',
          ddd:'',
          siafi:'',
          isLoading: false,
        });
      });    
  }

  Atualizar = async()=> {
    await this.API()
    await this.setDados() 
    this.setState({isLoading: true});      
      this.bdREF.doc(this.state.Email).set({
        Email: this.state.Email,
        Nome: this.state.Nome,
        CPF: this.state.CPF,
        Senha: this.state.Senha,
        CEP: this.state.CEP,
        Logradouro: this.state.logradouro,
        Complemento: this.state.complemento,
        Bairro: this.state.bairro,
        Localidade: this.state.localidade,
        UF: this.state.uf,
        IBGE: this.state.ibge,
        Gia: this.state.gia,
        DDD: this.state.ddd,
        Siafi: this.state.siafi,
      }).then((res) => {
        this.setState({
          Email: '',
          Nome: '',
          CPF: '',
          Senha: '',
          CEP:'',
          logradouro:'',
          complemento:'',
          bairro:'',
          localidade:'',
          uf:'',
          ibge:'',
          gia:'',
          ddd:'',
          siafi:'',
          isLoading: false,
        });
      });
  }
  
  Deletar() {
    const bdREF = firebase.firestore().collection('usuarios').doc(this.state.Email)
      bdREF.delete()
  }
  
  
  async Pesquisar() {
    const doc = await firebase.firestore().collection('usuarios').doc(this.state.Email).get()
    this.setState({
      Email: doc.data().Email,
      Nome: doc.data().Nome,
      CPF: doc.data().CPF,
      Senha: doc.data().Senha,
      CEP: doc.data().CEP,
    })
  }

  render() {    
    if(this.state.isLoading)
    {
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large"/>
        </View>
      )
    }
    return (
      <ScrollView>
        <View style={stylesCad.viewStyle}>
          <TextInput
              style={stylesCad.textInput}
              placeholder={'Email'}
              value={this.state.Email}
              onChangeText={(val) => this.inputValueUpdate(val, 'Email')}
          />
        </View>
        <View style={stylesCad.viewStyle}>
          <TextInput
              style={stylesCad.textInput}
              placeholder={'Nome'}
              value={this.state.Nome}
              onChangeText={(val) => this.inputValueUpdate(val, 'Nome')}
          />
        </View>
        <View style={stylesCad.viewStyle}>
          <TextInput
              style={stylesCad.textInput}
              placeholder={'CPF'}
              value={this.state.CPF}
              onChangeText={(val) => this.inputValueUpdate(val, 'CPF')}
          />
        </View>
        <View style={stylesCad.viewStyle}>
          <TextInput
              style={stylesCad.textInput}
              placeholder={'Senha'}
              value={this.state.Senha}
              onChangeText={(val) => this.inputValueUpdate(val, 'Senha')}
          />
          
        </View>
        <View style={stylesCad.viewStyle}>
        <TextInput
              style={stylesCad.textInput}
              placeholder={'CEP'}
              value={this.state.CEP}
              onChangeText={(val) => this.inputValueUpdate(val, 'CEP')}
          />
        </View>
        <View style={{padding: 10}}>
            <View style={stylesCad.buttonStyle}>
              <Button            
                title='Cadastrar'
                onPress={() => this.Cadastrar()} 
              />
            </View>
            <View style={stylesCad.buttonStyle}>
              <Button
                title='Deletar'
                onPress={() => this.Deletar()} 
              />
            </View>            
            <View style={stylesCad.buttonStyle}>
              <Button
                title='Atualizar'
                onPress={() => this.Atualizar()} 
              />
            </View>            
            <View style={stylesCad.buttonStyle}>
              <Button
                title='Pesquisar'
                onPress={() => this.Pesquisar()} 
              />
            </View>  
        </View>
      </ScrollView>
    );
  }
}

const stylesCad = StyleSheet.create({
  textInput:{
    borderColor:'black',
    borderWidth:1,
  },
  viewStyle:{
    padding:10, 
    paddingHorizontal:10,
  },
  buttonStyle:{
    padding: 10
  }
});

export default Cadastro;