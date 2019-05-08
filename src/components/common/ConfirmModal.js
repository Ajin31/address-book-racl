import React from 'react';
import { Text, View, Modal, Dimensions } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

let { width, height } = Dimensions.get('window');
const ConfirmModal = ({ children, visible, onAccept, onDecline }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => {}}       
        >
            <View style={styles.container}>
            <Text style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: '500'
            }}>Delete</Text>
                <CardSection style={styles.cardSectionStyle}>
                    <Text style={styles.textStyle}>
                    {children}
                    </Text>
                </CardSection>
                <CardSection style={{
                    alignItems: 'center', width: width / 1.2, backgroundColor: '#e74c3c' }}>
                    <Button btnid="Yes" onPress={onAccept}
                        style={{ backgroundColor: 'e74c3c', elevation: 1, borderColor: '#fff',
                        borderWidth: 2,
                        borderRadius: 0 }}
                        textStyle={{
                            color: '#ddd'
                        }} />
                    <Button btnid="No" 
                        style={{
                            backgroundColor: 'e74c3c', elevation: 1, borderColor: '#fff',
                            borderWidth: 2,
                            borderRadius: 0
                        }}
                    textStyle={{ color: '#fff'}} onPress={onDecline}

                    />
                </CardSection>
            </View>
        </Modal>
    );

};

const styles = {
    cardSectionStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e74c3c',
        width: width / 1.2,
        height: height / 4
    },
    textStyle: {
        fontSize: 16,
        color: '#fff',
        marginRight: 8,
        textAlign: 'center'
    },
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
         width

    }
};


export { ConfirmModal };
