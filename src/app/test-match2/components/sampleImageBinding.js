import { useRive, useViewModel, useViewModelInstance, useViewModelInstanceImage } from '@rive-app/react-webgl2';

const { rive, RiveComponent } = useRive({
    src: 'your_file.riv',
    artboard: 'MyArtboard',
    stateMachine: 'MyStateMachine',
    autoBind: false,
    // ... other options
});

const viewModel = useViewModel(rive, { name: 'MyViewModel' });
const viewModelInstance = useViewModelInstance(viewModel, { rive });

// Get the image property setter
const { setValue: setImage } = useViewModelInstanceImage(
    'profileImage', // Property path
    viewModelInstance
);

// Load and set a random image
const loadRandomImage = async () => {
    if (!setImage) return;

    try {
        const imageUrl = 'https://picsum.photos/300/500';
        const response = await fetch(imageUrl);
        const imageBuffer = await response.arrayBuffer();

        // Decode the image from the response
        const decodedImage = await decodeImage(new Uint8Array(imageBuffer));
        setImage(decodedImage);

        // Clean up the decoded image
        decodedImage.unref();
    } catch (error) {
        console.error('Failed to load image:', error);
    }
};

// Clear the image
const clearImage = () => {
    if (setImage) {
        setImage(null);
    }
};