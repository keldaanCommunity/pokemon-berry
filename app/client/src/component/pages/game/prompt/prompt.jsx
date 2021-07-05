import React from 'react';

 export default class Prompt extends React.Component{

    render() {
        //console.log(this.props);
        const promptStyle = {
            top:'40%',
            right:'40%',
            maxWidth: '400px',
            width: '400px',
            maxHeight: '200px',
            height: '200px',
            backgroundColor: 'rgba(255, 255, 255, .6)',
            padding: '0px',
            position: 'absolute'
        };

        if(this.props.prompt.title !== undefined){
            return <div className= "nes-container is-rounded" style={promptStyle}><p>{this.props.prompt.title}</p> <p>{this.props.prompt.info}</p></div>
        }
        else{
            return <div></div>;
        }
       
    }
 }