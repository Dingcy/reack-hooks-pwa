import React ,{Component,PureComponent,memo}from 'react';


const Foo = memo(function Foo(props) {
    console.log('foo render');
    return <div>
         {props.person.age}
    </div>
})

export default class Memo extends Component {
    state = {
        count:0,
        person:{
            age:1
        }
    }
    render(){
        const person = this.state.person;
        return <div>
            <button type="button" onClick={ () => {
                person.age++;
                this.setState({count:this.state.count+1
                })}}>加一</button>
            <Foo person={this.state.person}></Foo>
        </div>
    }
}