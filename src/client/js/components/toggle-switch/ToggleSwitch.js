import { h, Component } from 'preact'
import WebComponent from '../../webComponent'
import './ToggleSwitch.scss'

@WebComponent('toggle-switch')
export default class ToggleSwitch extends Component {
  
  constructor(props){
    super(props);
    this.state={
      checked:props.checked
    }
  }
  
  dispatchEvent(elem,checked){
    const event = new CustomEvent('toggle-switch.click', {
      bubbles: true,
      detail: { checked:checked}
    });

    elem.dispatchEvent(event);
  }

  toggle=(e)=>{
    this.setState({
      checked:!this.state.checked
    })
    this.dispatchEvent(e.target,this.state.checked)
  }
  
  render() {
    return (<label styleName="switch" >
        <input styleName={this.state.checked?'checked':""} checked={this.state.checked}  type="checkbox" />
        <span styleName="slider" onClick={this.toggle}></span>
      </label>
    )
  } 
}
 