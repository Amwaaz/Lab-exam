import React from 'react';
import { Stack } from 'expo-router';

export default function StoriesLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Product List', 
          headerStyle: { backgroundColor: '#333333' }, 
          headerTintColor: '#fff',
          headerTitleAlign:'center',
        }} 
      />
    </Stack>
  );
}
