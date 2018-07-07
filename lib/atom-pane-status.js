'use babel';

import AtomPaneStatusView from './atom-pane-status-view';
import { CompositeDisposable } from 'atom';

export default {

  atomPaneStatusView: null,
  subscriptions: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Add status bar to all current, and all future panes
    this.subscriptions.add(atom.workspace.observePanes(pane => {
      statusBar = new AtomPaneStatusView(state);
      pane.statusBar = statusBar;
      atom.views.getView(pane).appendChild(statusBar.getElement());
      pane.onDidDestroy(pane => {
        pane.statusBar.destroy();
        pane.statusBar = null;
        this.updateStatusBars()
      })
    }));

    // Update when the active pane item changes
    this.subscriptions.add(atom.workspace.observeActivePaneItem(activeItem =>
    {
      this.updateStatusBars()
    }));

    // Update when text editor objects change their modified statusBar
    this.subscriptions.add(atom.workspace.observeTextEditors(editor =>
    {
      editor.onDidChangeModified(disposable => {
        this.updateStatusBars();
      })
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.atomPaneStatusView.destroy();
  },

  serialize() {
    return {
      atomPaneStatusViewState: this.atomPaneStatusView.serialize()
    };
  },

  updateStatusBars() {
    panes = atom.workspace.getPanes();
    atom.workspace.getPanes().forEach(pane =>
      pane.statusBar.update(pane)
    );
  }

};
