import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import TopicListComp from '@/components/Content';

export default function KalmasHomeScreen() {
    return (
            <View style={styles.container}>
                <TopicListComp />
            </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 20,
    },
    background: {
        flex: 1,
        
      },
});
