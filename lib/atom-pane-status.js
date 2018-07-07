'use babel';

import AtomPaneStatusView from './atom-pane-status-view';
import { CompositeDisposable } from 'atom';

export default {

  atomPaneStatusView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomPaneStatusView = new AtomPaneStatusView(state.atomPaneStatusViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomPaneStatusView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-pane-status:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomPaneStatusView.destroy();
  },

  serialize() {
    return {
      atomPaneStatusViewState: this.atomPaneStatusView.serialize()
    };
  },

  toggle() {
    console.log('AtomPaneStatus was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
