const draggables = document.querySelectorAll('.draggable'); // Get all elements with the class 'draggable'
const containers1 = document.querySelectorAll('.container1'); // Get all elements with the class 'container1'
const containers = document.querySelectorAll('.container2'); // Get all elements with the class 'container2'
const reset = document.querySelector("#reset"); // Get the element with the id 'reset'

// Add event listeners to each draggable element
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging'); // Add the class 'dragging' when drag starts
  });

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging'); // Remove the class 'dragging' when drag ends
  });
});

// Add event listeners to each container2 element
containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault(); // Prevent the default dragover behavior
    const afterElement = getDragAfterElement(container, e.clientY); // Get the element after which the draggable element will be dropped
    const draggable = document.querySelector('.dragging'); // Get the currently dragging element
    if (afterElement == null) {
      container.appendChild(draggable); // If there is no element after which to drop, append the draggable to the container
    } else {
      container.insertBefore(draggable, afterElement); // Otherwise, insert the draggable before the afterElement
    }
  });
});

// Function to get the element after which the draggable element will be dropped
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Add event listener to the reset button
reset.addEventListener('click', resettt);

// Function to reset the containers
function resettt() {
  // Remove elements from container2 and append them to container1
  containers.forEach(container => {
    const elements = Array.from(container.querySelectorAll('.draggable'));
    elements.forEach(element => {
      container.removeChild(element);
      containers1[0].appendChild(element);
    });
    alert('resetted successfully');
  });
}
