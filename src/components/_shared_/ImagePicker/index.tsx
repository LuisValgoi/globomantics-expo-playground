import { FontAwesome } from '@expo/vector-icons';
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { HStack, IInputProps, Image, Input, Text, VStack } from 'native-base';
import React, { useState } from 'react';

type ImagePickerProps = {
  imageName?: string;
  onPickImage: (imgURI: string | undefined) => Promise<void>;
} & IInputProps;

const ImagePicker: React.FC<ImagePickerProps> = ({
  imageName,
  defaultValue,
  onPickImage,
  ...props
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string | undefined>(imageName);
  const [uri, setUri] = useState<string | undefined>(defaultValue);

  const handlePickImage = async () => {
    setLoading(true);

    await requestMediaLibraryPermissionsAsync();
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });

    if (result.canceled) {
      onPickImage(undefined);
    } else {
      const image = result.assets[0];
      const name = image.fileName || 'Temporary';
      const uri = image.uri;
      setName(name);
      setUri(uri);
      onPickImage(image.uri);
    }

    setLoading(false);
  };

  return (
    <VStack justifyItems="flex-start" width="full" space="2">
      <Input
        isReadOnly
        focusable
        variant="outline"
        size="sm"
        colorScheme="gray"
        onPressIn={handlePickImage}
        backgroundColor={loading ? 'gray.100' : 'white'}
        leftElement={
          <FontAwesome style={{ paddingLeft: 20 }} color="gray" name="upload" />
        }
        _focus={{
          bgColor: 'gray.100',
          borderWidth: 1,
          borderColor: 'gray.400',
        }}
        _invalid={{
          bgColor: 'red.100',
          borderWidth: 2,
          borderColor: 'red.500',
        }}
        {...props}
      />

      {loading && <Text colorScheme="gray">Uploading...</Text>}

      {uri && (
        <HStack space="2" alignItems="center">
          <Image
            borderRadius="md"
            width="8"
            height="8"
            source={{ uri }}
            alt={name}
          />
          <Text colorScheme="gray">{name}</Text>
        </HStack>
      )}
    </VStack>
  );
};

export default ImagePicker;
