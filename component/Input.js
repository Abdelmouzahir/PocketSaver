import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";


export default function Input({label,style,invalid, textInputConfig}){
    const inputStyle = [styles.input];
    if(textInputConfig.multiline){
        inputStyle.push(styles.inputMultiline);
    }
    if(invalid){
        inputStyle.push(styles.invalidInput);
    }
    return (
            <View  style={[styles.inputContainer, style]}>
                <Text style={[styles.label, invalid && styles.invalidLabel]} >{label}</Text>
                <TextInput style={inputStyle} {...textInputConfig} />
            </View>
        )
   
}
const styles = StyleSheet.create({
    inputContainer:{
      marginHorizontal: 4,
      marginVertical: 8,
      
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary50,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary50,
        padding: 6,
        borderRadius: 6,
        fontSize: 18
    },
    inputMultiline:{
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel : {
        color: 'red'
    },
    invalidInput: {
        backgroundColor: '#D04848'
    }
})
