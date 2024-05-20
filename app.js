document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    const taskImageInput = document.getElementById('task-image');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', function() {
        const taskText = newTaskInput.value.trim();
        const taskImageFile = taskImageInput.files[0];
        
        if (taskText !== '') {
            const reader = new FileReader();
            reader.onload = function(e) {
                addTask(taskText, e.target.result);
            };
            if (taskImageFile) {
                reader.readAsDataURL(taskImageFile);
            } else {
                addTask(taskText, null);
            }
            newTaskInput.value = '';
            taskImageInput.value = '';
            newTaskInput.focus();
        }
    });

    newTaskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = newTaskInput.value.trim();
            const taskImageFile = taskImageInput.files[0];
            
            if (taskText !== '') {
                const reader = new FileReader();
                reader.onload = function(e) {
                    addTask(taskText, e.target.result);
                };
                if (taskImageFile) {
                    reader.readAsDataURL(taskImageFile);
                } else {
                    addTask(taskText, null);
                }
                newTaskInput.value = '';
                taskImageInput.value = '';
                newTaskInput.focus();
            }
        }
    });

    function addTask(taskText, imageSrc) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        if (imageSrc) {
            const img = document.createElement('img');
            img.src = imageSrc;
            listItem.appendChild(img);
        }

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', function() {
            listItem.classList.toggle('completed');
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
        });

        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    }
});
