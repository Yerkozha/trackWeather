import { StyleSheet } from "react-native";


export const style = (theme) => StyleSheet.create({

    container: {
        backgroundColor: theme.mainBackground,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 10
    },
    
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.mainBackground,
    },

    listContainer: {
        flex: 1,
        backgroundColor: theme.mainBackground,
    },

    topDisplay: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    title: {
        fontWeight: 700,
        fontSize: 24,
        color: theme.textColor,
        lineHeight: 42
    },
    temp: {
        fontWeight: 'bold',
        fontSize: 32,
        color: theme.textColor,
    },

    list: {
        
    },
    listItem: {
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'flex-end'
    },
    
    input: { 
        backgroundColor: theme.backgroundInput,
        borderTopColor: 'transparent',
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderWidth: 0,
        paddingHorizontal: 10, 
        paddingVertical: 12,
        fontSize: 16, 
        flexGrow: 1,
        color: theme.textColor,
       

        height: 45,
        marginBottom: 12,
        borderRadius: 4,
    }, 
    button: { 
        backgroundColor: 'rgba(228,243,240, 1)',
        paddingHorizontal: 40, // Equivalent to px-10
         // Equivalent to py-2
        alignItems: 'center', // Equivalent to items-center
        borderRadius: 16, // Equivalent to rounded-full
    }, 
    btnText: {
        fontSize: 18,
        color: theme.textColor,
        fontFamily: 'Roboto-Bold'
    },
    errText: {
        color: theme.textColor,
        fontSize: 14
    },
    errTextCircle: {
        borderRadius: 100,
        backgroundColor: '#f28b82',
        width: 20,
        height: 20,
        lineHeight: 20,
        fontSize: 12,
        fontWeight: 600,
        color: theme.textColor,
        textAlign: 'center'
    },
    errTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "50%",
        height: 30,
        backgroundColor: theme.backgroundInput,
        alignSelf: 'center'
    },

    searchContainer: {
        marginTop: 10
    },

    flatListContainer: {
        backgroundColor: theme.backgroundInput,
        borderColor: theme.textColor,
        borderWidth: 0.1,
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 6,
        padding: 12,

        alignContent: "center",
        justifyContent: "center",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    img: {
        width:100,
        height:100,
        resizeMode:'cover',
        borderRadius: 6,
        marginRight: 10
    },

    textWrapper: {
        
        flexShrink: 1
    },
    cityName: {
        fontWeight: 'bold',
        textAlign:'center',
        color: theme.textColor,
    },

    listHeader: {
        
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#ffffff'
    },
    headerTitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },

   
    imageStyle: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    
});