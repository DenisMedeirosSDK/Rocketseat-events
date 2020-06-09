import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail() {
    const route = useRoute();
    const navigation = useNavigation();

    const incident = route.params.incident;
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)} `;

    function navigateBack() {
        navigation.goBack();
    }

    function sendEmail() {
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhastapp() {
        Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`);
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e82041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incidents}>
                <Text style={[styles.incidentsProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.incidentsValue}> {incident.name} de {incident.city}/{incident.uf} </Text>

                <Text style={styles.incidentsProperty}>CASO:</Text>
                <Text style={styles.incidentsValue}>{incident.title}</Text>

                <Text style={styles.incidentsProperty}>VALOR:</Text>
                <Text style={styles.incidentsValue}>{
                    Intl.NumberFormat(
                        'pt-br',
                        { style: 'currency', currency: 'BRL' })
                        .format(incident.value)}
                </Text>

            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia</Text>
                <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={sendWhastapp} style={styles.action}>
                    <Text style={styles.actionText}>WhatsApp</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={sendEmail} style={styles.action}>
                    <Text style={styles.actionText}>Email</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}