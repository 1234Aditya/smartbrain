import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/SignIn/Signin";
import Register from "./components/Register/Register";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particle from "./components/Background/Background";

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id:'',
    name:'',
    email:'',
    password :"",
    entries:0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) =>{
    this.setState({user :{
      id: data.id,
      name: data.name,
      email:data.email,
      password :data.password,
      entries: data.entries,
      joined: data.joined
  }})
  }

  calculateFaceLocation = (data1)=>{
    const clarifaiFace =data1.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow :clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  };

  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState(initialState)
    }
    else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    const PAT = 'e5f33a777b184b18b406387533ae5a04';
    const USER_ID = 'clarifai';       
    const APP_ID = 'main';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = this.state.input;
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });
  
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
  
  fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result){
        fetch('http://localhost:3000/image',{
          method: 'put',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
          id : this.state.user.id
            })
        })
        .then(response => response.json())
        .then(count =>{
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(result))
    })
    .catch(error => console.log('error', error));
  };

  render() {
    return (
      <div className="App">
        <Particle />
        <Navigation isSignedIn ={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home'
        ? <div>    
        <Logo />
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl ={this.state.imageUrl} box ={this.state.box}/>
        </div>
        :(
        this.state.route === 'signin'
        ? <Signin loadUser={this.loadUser} onRouteChange ={this.onRouteChange}/>
        : <Register loadUser ={this.loadUser} onRouteChange ={this.onRouteChange} /> 
        )  
    }
      </div>
    );
  }
}
export default App;
