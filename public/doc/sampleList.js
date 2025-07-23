import { useRive, useViewModel, useViewModelInstance, useViewModelInstanceList } from '@rive-app/react-webgl2';

const { rive, RiveComponent } = useRive({
    src: 'your_file.riv',
    artboard: 'MyArtboard',
    stateMachine: 'MyStateMachine',
    autoBind: false,
    // ... other options
});

const viewModel = useViewModel(rive, { name: 'MyViewModel' });
const viewModelInstance = useViewModelInstance(viewModel, { rive });

// Get the list property with manipulation functions
const {
    length,
    addInstance,
    addInstanceAt,
    removeInstance,
    removeInstanceAt,
    getInstanceAt,
    swap
} = useViewModelInstanceList('todos', viewModelInstance);

// Add a new todo item
const handleAddItem = () => {
    const todoItemViewModel = rive?.viewModelByName?.('TodoItem');
    if (todoItemViewModel) {
        const newTodoItem = todoItemViewModel.instance?.();
        if (newTodoItem) {
            // Set some initial values
            newTodoItem.string('description').value = 'Buy groceries';
            addInstance(newTodoItem);
        }
    }
};

// Insert item at specific index
const handleInsertItem = () => {
    const todoItemViewModel = rive?.viewModelByName?.('TodoItem');
    if (todoItemViewModel) {
        const newTodoItem = todoItemViewModel.instance?.();
        if (newTodoItem) {
            addInstanceAt(newTodoItem, 0); // Insert at beginning
        }
    }
};

// Remove first item by instance
const handleRemoveFirst = () => {
    const firstInstance = getInstanceAt(0);
    if (firstInstance) {
        removeInstance(firstInstance);
    }
};

// Remove item by index
const handleRemoveAt = () => {
    if (length > 0) {
        removeInstanceAt(0);
    }
};

// Swap two items
const handleSwap = () => {
    if (length >= 2) {
        swap(0, 1);
    }
};

console.log(`List has ${length} items`);