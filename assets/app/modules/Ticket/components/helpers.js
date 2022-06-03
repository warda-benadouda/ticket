export const getState=( state) => {

    switch(state) {
        case "0" :
            return "En attente"
             
        case "1" :

            return "En cours"
        case "2" : 
            return "Terminé"
        default :
             return "/"
    }
}