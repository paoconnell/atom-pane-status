'use babel';

export default class AtomPaneStatusView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('atom-pane-status');
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  update(pane) {
    activeItem = pane.getActiveItem()
    if (activeItem instanceof require('atom').TextEditor) {
      path = activeItem.getPath();
      relativized = atom.project.relativizePath(path)[1]
      this.element.textContent = relativized;
      if (activeItem.isModified()) {
        this.element.textContent += " *";
      }
      if (pane.isActive()) {
        this.element.classList.add('high');
      }
      else {
        this.element.classList.remove('high');
      }
      this.element.hidden = false;
    }
    else {
      this.element.hidden = true;
    }
  }

}
