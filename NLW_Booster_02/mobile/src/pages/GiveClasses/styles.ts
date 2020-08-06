import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1
    ,backgroundColor: '#8257e5',
    justifyContent: 'center',
    padding: 40
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 32,
    lineHeight: 37,
    maxWidth: 180,
  },
  description: {
    fontFamily:'Poppins_400Regular',
    fontSize: 16,
    color: '#d4c2ff',
    maxWidth: 240,
    marginTop: 24,
    lineHeight: 26
  },
  okButton: {
    marginVertical: 40,
    backgroundColor: '#04d361',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  okButtonText: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 16
  }
})

export default styles