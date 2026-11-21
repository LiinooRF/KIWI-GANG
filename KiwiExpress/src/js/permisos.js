//Roles de usuario a considerar para la vista permitida.
export const ROLES = {
    ADMIN: 'administrador',
    VENDEDOR: 'vendedor',
    CLIENTE: 'cliente'
};

//const que devuelve true si el usuario corresponde a un admin.
export const esAdmin = (rol) => rol?.toLowerCase() === ROLES.ADMIN;