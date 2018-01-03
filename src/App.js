import React, { Component } from 'react';
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    screen: 'list',
    contacts: []
  }

  componentDidMount(){
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  addContact = () => {
    this.setState({ screen: 'contact' })
  }
  removeContact = (contact) => {
      this.setState((state) => ({
        contacts: state.contacts.filter(c => c.id !== contact.id)
      }))

      ContactsAPI.remove(contact)
  }

  render() {
    return (
      <div>
        {this.state.screen === 'list' && (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
            onNavigate={this.addContact}/>
        )}
        {this.state.screen === 'contact' && (
          <CreateContact />
        )}
      </div>
    )
  }
}

export default App;
