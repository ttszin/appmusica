import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { LogBox, ScrollView,StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native';
import Body from './Componentes/Body.js';
import Header from './Componentes/Header.js';
import Footer from './Componentes/Footer.js';
import styleExterno from './src/styles.js';
import {Audio} from 'expo-av';
import {AntDesign} from '@expo/vector-icons';
import Player from './Player.js'




export default function App() {
  


	LogBox.ignoreAllLogs(true);


	const [audioIndex,setarAudioIndex] = useState(0);

	const [playing,setPlaying] = useState(false);


	const [audio,setarAudio] = useState(null); //Criando o array audio
	// Criando o array musicas
	const[musicas,setarMusicas] = useState([

		{
			nome: 'Sweet child of mine',
			artista:'Guns N Roses',
			playing:false,
			file:require('./Músicas/arquivo2.mp3'),
			imagem:{uri:'http://4.bp.blogspot.com/-zxaNwo2XSbk/UgaopH_V83I/AAAAAAAADu4/enMAYg5MznY/s1600/guns.jpg'},
		},
		
		{
			nome: 'Vampiro',
			artista:'Matuê',
			playing:false,
			file:require('./Músicas/Vampiro.mp3'),
			imagem:{uri:'https://rapforte.com/wp-content/uploads/2022/04/WhatsApp-Image-2022-04-01-at-21.18.02.jpeg'},
		},
		
		{
			nome: 'Fim de semana no Rio ',
			artista:'Teto',
			playing:false,
			file:require('./Músicas/arquivo3.mp3'),
			imagem:{uri:'https://i.scdn.co/image/ab67616d0000b273acb087ed5213035b71ef7a80'},
		},

		{
			nome: 'Eu Já Tava Bem',
			artista:'Wesley Safadão',
			playing:false,
			file:require('./Músicas/arquivo5.mp3'),
			imagem:{uri:'https://oregionalonline.com.br/wp-content/uploads/2021/12/CAPA-SINGLE-EU-JA-TAVA-BEM-scaled-1.jpg'},
		},

		{
			nome: 'Nem Namorado e Nem Ficante',
			artista:'Israel e Rodolffo',
			playing:false,
			file:require('./Músicas/arquivo4.mp3'),
			imagem:{uri:'https://i.scdn.co/image/ab67616d0000b2731a8ca8ce08d8b8a683b83633'}
		}
		



		
		

		
		
	]);

	const changeMusic = async (id) => {
		let curFile = null;
		let newMusics = musicas.filter((val,k)=>{
			if(id==k){
				musicas[k].playing = true;
				curFile = musicas[k].file;
				setPlaying(true);
			}
			else{
				musicas[k].playing = false;
			}
			return musicas[k];
		})

		if(audio != null){
			audio.unloadAsync();
		}

		let curAudio = new Audio.Sound();

		try{
			await curAudio.loadAsync(curFile);
			await curAudio.playAsync();
		}catch(error){}

		setarAudio(curAudio);
		setarMusicas(newMusics);
	}

	return (
		<View style={{flex:1}}>
    	<ScrollView style={styleExterno.container}>
			<StatusBar hidden/>
			<View style = {styleExterno.header}>
				<Text style={{textAlign:'center',color:'white',fontSize:25}}>STORM</Text>     
			</View>
			
			<View style={styleExterno.table}>
				<Text style = {styleExterno.texto1}>Música</Text>
				<Text style = {styleExterno.texto2}>Artista</Text>
			</View>
      		 		
			{
				musicas.map ((val,k)=>{
					if(val.playing){
						//Renderiza algo aqui
						return(
							<>
								<Image style={{width:170,height:170,marginTop:10,alignSelf:'center',}} source={val.imagem}></Image>	
								<View style  ={styleExterno.table}>
									<TouchableOpacity onPress={()=>changeMusic(k)} style = {{width:'100%',flexDirection:'row'}}>
										<Text style= {styleExterno.tableTextSelected}><AntDesign name = "play" size={15} color = '#1DB954'/>{val.nome}</Text>
										<Text style= {styleExterno.tableTextSelected}>{val.artista}</Text>
									</TouchableOpacity>
								</View>
							</>
						);
					}else{
							//Renderiza outra coisa aqui
							return(
								<>
									<Image style={{width:170,height:170,flexDirection:'column',alignSelf:'center',marginTop:10}} source={val.imagem}></Image>	
									<View style  ={styleExterno.table}>
										<TouchableOpacity onPress={()=>changeMusic(k)} style = {{width:'100%',flexDirection:'row'}}>
											<Text style= {styleExterno.tableText}><AntDesign name = "play" size={15} color = 'white'/>{val.nome}</Text>
											<Text style= {styleExterno.tableText}>{val.artista}</Text>
										</TouchableOpacity>	
																									
									</View>
									
								</>
							);
						
					}
				})
			}
			<View style={{paddingBottom:200 }}></View>
    	</ScrollView>
		<Player playing = {playing} setPlaying={setPlaying} audioIndex={audioIndex} musicas = {musicas} 
		setarMusicas={setarMusicas} audio={audio} setarAudio={setarAudio} setarAudioIndex={setarAudioIndex}></Player>
		
		</View>
  	);
}



