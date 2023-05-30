import { Button, View, IScrollViewProps } from 'native-base';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import YoutubePlayer, { PLAYER_STATES } from 'react-native-youtube-iframe';
import LoadingIndicator from 'src/components/_shared_/LoadingIndicator';

const VideoPlayer: React.FC<IScrollViewProps> = () => {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  const onStateChange = (state: string) => {
    if (state === PLAYER_STATES.ENDED) {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  };

  const onReady = () => {
    setReady(true);
  };

  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };

  return (
    <View>
      {!ready && (
        <View alignItems="center" justifyContent="center">
          <LoadingIndicator />
        </View>
      )}
      <YoutubePlayer
        height={200}
        play={playing}
        videoId={'0GOUF8vNqzE'}
        onChangeState={onStateChange}
        onReady={onReady}
      />
      <Button onPress={togglePlaying}>{playing ? 'pause' : 'play'}</Button>
    </View>
  );
};

export default VideoPlayer;
