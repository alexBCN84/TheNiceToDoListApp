var niceAimList = {
  aims: [],
  addAim: function(aimText) {
    this.aims.push({
      aimText: aimText,
      completed: false
    });
  },
  changeAim: function(position, aimText) {
    this.aims[position].aimText = aimText;
  },
  deleteAim: function(position) {
    this.aims.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var aim = this.aims[position];
    aim.completed = !aim.completed;
  },
  toggleAll: function() {
    var totalAims = this.aims.length;
    var completedAims = 0;

    // Get number of completed aims.
    this.aims.forEach(function(aim) {
      if(aim.completed === true) {
        completedAims++;
      }
    });

    this.aims.forEach(function(aim) {
      // Case 1: If everything’s true, make everything false.
      if(completedAims === totalAims) {
        aim.completed = false;
      // Case 2: Otherwise, make everything true.
      }else{
        aim.completed = true;
      }
    });
  }
};

var handlers = {
  addAim: function() {
    var addAimTextInput = document.getElementById('addAimTextInput');
    niceAimList.addAim(addAimTextInput.value);
    addAimTextInput.value = '';
    view.displayAims();
  },
  changeAim: function(position) {
    //var changeAimPositionInput = document.getElementById('changeAimPositionInput');
    //var changeAimTextInput = document.getElementById('changeAimTextInput');
    changeAimTextInput = prompt('Enter new text')
    niceAimList.changeAim(position, changeAimTextInput);
    //changeAimPositionInput.value = '';
    changeAimTextInput.value = '';
    view.displayAims();
  },
  deleteAim: function(position) {
    niceAimList.deleteAim(position);
    view.displayAims();
  },
  toggleCompleted: function(position) {
    //var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    niceAimList.toggleCompleted(position);
    //toggleCompletedPositionInput.value = '';
    view.displayAims();
  },
  toggleAll: function() {
    niceAimList.toggleAll();
    view.displayAims();
  }
};

var view = {
  displayAims: function() {
    var aimsUl = document.querySelector('ul');
    aimsUl.innerHTML = '';
    niceAimList.aims.forEach(function(aim, position) {
      var aimLi = document.createElement('li');
      aimLi.className = 'item';
      var aimTextWithCompletion = '';

      if (aim.completed === true) {
        elem = document.createElement('span')
        elem.innerHTML = "&#10004   ";
        var check = elem.innerHTML;
        aimTextWithCompletion = check + aim.aimText;
      } else {
        elem = document.createElement('span')
        elem.innerHTML = "&#10008;   ";
        var uncheck = elem.innerHTML;
        aimTextWithCompletion = uncheck + aim.aimText;
      }

      aimLi.id = position;
      aimLi.className = 'liText';
      aimLi.textContent = aimTextWithCompletion;
      aimLi.appendChild(this.createDeleteButton());
      aimLi.appendChild(this.createEditButton());
      aimLi.appendChild(this.createStatusButton());
      aimsUl.appendChild(aimLi);
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('a');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  createEditButton: function() {
    var editButton = document.createElement('a');
    editButton.textContent = 'Edit';
    editButton.className = 'editButton';
    return editButton;
  },
  createStatusButton: function() {
    var statusButton = document.createElement('a');
    statusButton.textContent = 'Toggle Completed';
    statusButton.className = 'statusButton';
    return statusButton;
  },
  setUpEventListeners: function() {
    var aimsUl = document.querySelector('ul');

    aimsUl.addEventListener('click', function(event) {
      // Get the element that was clicked on.
      var elementClicked = event.target;

      // Check if the element is a delete button.
      if(elementClicked.className === 'deleteButton') {
        // Run handlers.deleteAim(position)
        handlers.deleteAim(parseInt(elementClicked.parentNode.id));
      }

      // Check if the element is an edit button.
      if(elementClicked.className === 'editButton') {
        // Run handlers.changeAim
        handlers.changeAim(parseInt(elementClicked.parentNode.id));
      }

      // Check if the element is an Toggle Completed button.
      if(elementClicked.className === 'statusButton') {
        // Run handlers.toggleCompleted
        handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};


view.setUpEventListeners();
