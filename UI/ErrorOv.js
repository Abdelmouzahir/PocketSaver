
import { Text, View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import Button from './Button';

export default function ErrorgOv({message, onCofirm}) {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occured!</Text>
            <Text style={styles.text} >{message}</Text>
            <Button onPress={onCofirm}>Okay</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    text:{
        color: GlobalStyles.colors.error50,
        textAlign: 'center',
        marginBottom: 8
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
    
    }
});
