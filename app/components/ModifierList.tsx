import * as React from 'react'
import NoteMatrix from '../dataTypes/NoteMatrix'
import { Modifier } from '../dataTypes/Modifier'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RemoveIcon from 'material-ui/svg-icons/content/remove';
import IconButton from 'material-ui/IconButton';

interface ModifierListProps {
  modifierList: string[];
  onAdd: (modifier: string) => void;
  onRemove: (modifier: string) => void;
};


export default class ModifierList extends React.Component<ModifierListProps, {}> {
  renderModifiers() {
    return this.props.modifierList.map((modifierType: string, i: number) => {
      return (
        <div key={modifierType} className='listed-modifier'>
          <span>{modifierType}</span>
         {(i == this.props.modifierList.length-1) 
           && <IconButton onTouchTap={() => this.props.onRemove(modifierType)} tooltip="Remove"><RemoveIcon/></IconButton>}
        </div>
      )
    })
  }

  render() {
    const modifiers = this.renderModifiers();

    return (
      <div>
        <h3>Modifiers</h3>
        <SelectField
          floatingLabelText="Modifier"
          hintText="Select a modifier..."
          onChange={(event: any, index: number, value: string) => this.props.onAdd(value)}
        >
          <MenuItem value={'diatonicize'} primaryText="Diatonicize" />
          <MenuItem value={'legato'} primaryText="Legato" />
        </SelectField>
        {modifiers}
      </div>
    );
  }
}
