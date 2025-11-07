import React from 'react';
import {Text, View} from 'react-native';

const JobSummary = props => {
  return (
    <View>
      <Text>Hello, I am {props.name}!</Text>
    </View>
  );
};

export default JobSummary;