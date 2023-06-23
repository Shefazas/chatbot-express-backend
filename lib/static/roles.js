const ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  MANAGER: 'manager'
};

exports.ALLROLES = Object.freeze(Object.keys(ROLES).map((roleName) => ROLES[roleName]))
exports.ROLES = ROLES;
