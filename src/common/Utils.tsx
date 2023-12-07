import UserService from "../services/UserServices"

export const getUserNameById = (id) => {
    let user_name = ''

    UserService.get(id).then( (response) => {

        user_name = response.data.userFirstName
    })
    return user_name;
}

export const formatDepartment = (input) => {

    let pattern = input.match(/(\d){5}/)
    let department = pattern?.[0].substr(0,2)
    
    return department

}

export const formatGMapLink = (input) => {
    const gLinkFirst = 'https://www.google.com/maps/place/'        
    return gLinkFirst + encodeURIComponent(input); 
}