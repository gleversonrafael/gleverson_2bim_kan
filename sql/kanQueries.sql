SELECT userid, username, email, rolename
FROM KAN_USER KU INNER JOIN USER_ROLE UR 
ON (KU.user_role_roleId = UR.roleId);